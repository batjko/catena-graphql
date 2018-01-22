import { makeExecutableSchema } from 'graphql-tools'

import { getDisclosure, getDisclosures } from '../providers/catena'
import { MultiQuery, Disclosure } from '../providers/catena-types'

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

  type Disclosure {
    id: ID
    date: String
    timestamp: Float
    amount: Int
    location: Location
    blockchain: Blockchain
    lng: String,
    amountFormatted: String,
    organization: String,
    recipient: String,
    fundingType: String,
    purpose: String,
    address: Address
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
    ): [Disclosure]
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
    timestamp: ({ blockchain }) => blockchain.blockTimestamp,
  },
}

export default makeExecutableSchema({ typeDefs, resolvers })
