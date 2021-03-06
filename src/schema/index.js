import { makeExecutableSchema } from 'graphql-tools'
import moment from 'moment'

import { getDisclosure, getDisclosures } from '../providers/catena'
import { MultiQuery, Disclosure, Blockchain } from '../providers/catena-types'
import { getTransaction, getBalance, getTransactionList } from '../providers/etherscan'

const typeDefs = `
  enum DisclosuresFormat {
    DEFAULT
    DATATABLES
  }

  type Blockchain {
    # Example: "0x630df6ea52c81a81eddb7c994ee8da6038b6e433201827af9f95b9db91c12a3b",
    txId: String
    networkId: String,
    blockNumber: Float,
    blockTimestamp: Float,
    rowNumber: Int,
    # Example: "0xff77e51f2c6473f72392865e0a0000de19af774a"
    contractAddress: String
  }

  type Location {
    countryCode: String,
    regionCode: String
  }

  type Address {
    city: String,
    region: String,
    country: String
  }

  type Transaction {
    blockHash: String,
    blockNumber: String,
    from: String,
    gas: String,
    gasPrice: String,
    hash: String,
    input: String,
    nonce: String,
    to: String,
    transactionIndex: String,
    value: String,
    v: String,
    r: String,
    s: String
  }

  type Disclosures {
    limit: Int
    total: Int
    page: Int
    pages: Int
    results: [Disclosure]
  }

  type Disclosure {
    id: ID
    date: String
    timestamp: String
    amount: Int
    location: Location
    blockchain: Blockchain
    lng: String,
    amountFormatted: String,
    organization: String,
    recipient: String,
    fundingType: String,
    purpose: String,
    address: Address,

    # Transaction details from Etherscan
    transaction: Transaction
  }

  type Query {
    disclosures(
      format: DisclosuresFormat
      q: String
      sortField: String
      sortDir: String
      limit: Int
      page: Int
      lng: String
    ): Disclosures
    disclosure(id: ID!): Disclosure
  }
`

const resolvers = {
  Query: {
    disclosure: (_, { id }: { id: string }): Promise<Disclosure> => getDisclosure(id),
    disclosures: (_, args: MultiQuery): Promise<Array<Disclosure>> => getDisclosures(args),
  },
  Disclosure: {
    // alias resolver for a nested object, effectively lifting it up to the root object
    timestamp: ({ blockchain }: { blockchain: Blockchain }) =>
      moment.unix(blockchain.blockTimestamp).toISOString(),
    transaction: ({ blockchain }: { blockchain: Blockchain }) => getTransaction(blockchain.txId),
  },
}

export default makeExecutableSchema({ typeDefs, resolvers })
