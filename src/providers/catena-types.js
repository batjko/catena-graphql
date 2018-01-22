// enums, as supported by catena API
export type SortOrder = '1' | '-1' | 'desc' | 'asc' | 'ascending' | 'descending'
export type Language = 'en' | 'fr'

export type Disclosure = {
  id: string,
  date: string,
  amount: number,
  location: {
    countryCode: string,
    regionCode: string,
  },
  blockchain: {
    txId: string,
    networkId: string,
    blockNumber: number,
    blockTimestamp: number,
    rowNumber: number,
    contractAddress: string,
  },
  lng: Language,
  amountFormatted: string,
  organization: string,
  recipient: string,
  fundingType: string,
  purpose: string,
  address: {
    city: string,
    region: string,
    country: string,
  },
}

export type MultiQuery = {
  format: ?string,
  q: ?string,
  sortField: ?string,
  sortDir: ?SortOrder,
  limit: ?number,
  page: ?number,
  lng: ?Language,
}
