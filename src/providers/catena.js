import axios from 'axios'

import { MultiQuery, Disclosure } from './catena-types'

export async function getDisclosures(args: MultiQuery): Promise<Array<Disclosure>> {
  console.info(`\nQuerying Catena API (page ${args.page || 1})... `)

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

  const { limit: size, total, page: pageNum, pages, results } = response.data
  console.info(`Retrieved ${size} / ${total} results (page ${pageNum} / ${pages}).`)

  return response.data
}

export async function getDisclosure(id: string): Promise<Disclosure> {
  if (!id) throw new Error('Cannot fetch disclosure: id parameter not provided!')
  console.info(`\nQuerying Catena API for id ${id}... `)

  const response = await axios({
    method: 'get',
    url: `https://api.explorecatena.com/api/v1/public/disclosures/${id}`,
    params: {
      lng: 'en',
    },
  })

  const { amountFormatted, fundingType, recipient } = response.data
  console.info(`Retrieved disclosure for ${amountFormatted} ${fundingType} to ${recipient}.`)

  return response.data
}
