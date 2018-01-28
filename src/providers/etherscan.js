import ES from 'etherscan-api'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const apiKey = process.env.ES_TOKEN
if (!apiKey) throw new Error('ES_TOKEN env var must be set!')

const api = ES.init(apiKey)

export async function getTransaction(txhash: string): Promise<any> {
  const { result } = await api.proxy.eth_getTransactionByHash(txhash)

  return result
}

export async function getTransactionList(address: string): Promise<Array<any>> {
  const { result } = await api.account.txlist(address, 1, 'latest', 'desc')

  return result
}

export async function getBalance(address: string): Promise<number> {
  const { result } = await api.account.balance(address)

  return Number(result)
}
