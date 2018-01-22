import axios from 'axios'

type sortOrder = '1' | '-1' | 'desc' | 'asc' | 'ascending' | 'descending'
type language = 'en' | 'fr' // as supported by catena API

export type MultiQuery = {
  format: ?string,
  q: ?string,
  sortField: ?string,
  sortDir: ?sortOrder,
  limit: ?number,
  page: ?number,
  lng: ?language,
}

export async function getDisclosures(args: MultiQuery): Promise<Array<any>> {
  console.info(`\nQuerying Catena API... `)

  const {
    q,
    format,
    sortDir,
    limit = 20, // catena default = 10, max = 100
    sortField,
    page,
    lng = 'en', // response format is different if this value isn't set!
  } = args

  const response = await axios({
    method: 'get',
    url: 'https://api.explorecatena.com/api/v1/public/disclosures',
    params: {
      q,
      format,
      sortDir,
      limit,
      // timestamp is only available on the blockchain property
      sortField: sortField === 'timestamp' ? 'blockchain.blockTimestamp' : sortField,
      page,
      lng,
    },
  })

  console.info(
    `\nReceived ${response.data.limit} / ${response.data.total} results (page ${
      response.data.page
    } / ${response.data.pages}).`
  )

  return response.data.results
}

export async function getDisclosure(id: string): Promise<any> {
  console.info(`\nQuerying Catena API for id ${id}... `)

  const response = await axios({
    method: 'get',
    url: `https://api.explorecatena.com/api/v1/public/disclosures/${id}`,
    params: {
      lng: 'en',
    },
  })

  console.info(
    `\nReceived disclosure id '${response.data.id} (${response.data.amountFormatted} ${
      response.data.fundingType
    })'.`
  )

  return response.data
}
