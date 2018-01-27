jest.mock('axios')

import axios from 'axios'
import { getDisclosure, getDisclosures } from './catena'

console.info = () => {} // just for testing, we don't need their console output

describe('Catena Provider', () => {
  describe('getDisclosure()', () => {
    const okResponse = {
      data: {
        id: 'fakeId',
        amountFormatted: 0.99,
        fundingType: 'fakeContribution',
        recipient: 'Bob',
      },
    }
    it('makes one call to the Catena API', async () => {
      axios.mockImplementation(() => Promise.resolve(okResponse))
      await getDisclosure('fakeId')

      expect(axios).toHaveBeenCalledTimes(1)
      expect(axios.mock.calls[0][0].url).toContain('api.explorecatena.com')
    })

    it('throws error if id was not provided', async () => {
      expect.assertions(1)
      await expect(getDisclosure()).rejects.toEqual(
        new Error('Cannot fetch disclosure: id parameter not provided!')
      )
    })

    it('returns expected response for provided id', async () => {
      axios.mockImplementation(() => Promise.resolve(okResponse))
      const result = await getDisclosure('fakeId')

      expect(result).toBeTruthy()
      expect(result.id).toEqual('fakeId')
    })
  })

  describe('getDisclosures()', () => {
    const okResponse = ({ limit, page } = {}) => ({
      data: {
        limit,
        total: 12,
        page,
        pages: 2,
        results: [{ id: 'fakeId1' }, { id: 'fakeId2' }],
      },
    })

    it('makes one call to the Catena API', async () => {
      axios.mockImplementation(() => Promise.resolve({ data: {} }))

      await getDisclosures({})

      expect(axios).toHaveBeenCalledTimes(1)
      expect(axios.mock.calls[0][0].url).toContain('api.explorecatena.com')
    })

    it('passes params through to API call', async () => {
      axios.mockImplementation(() => Promise.resolve({ data: {} }))

      await getDisclosures({ limit: 99, page: 5 })

      expect(axios.mock.calls[0][0].params).toBeTruthy()
      expect(axios.mock.calls[0][0].params).toHaveProperty('limit', 99)
      expect(axios.mock.calls[0][0].params).toHaveProperty('page', 5)
    })

    it('applies default for limit, if not provided', async () => {
      axios.mockImplementation(() => Promise.resolve({ data: {} }))

      await getDisclosures({})

      expect(axios.mock.calls[0][0].params).toBeTruthy()
      expect(axios.mock.calls[0][0].params).toHaveProperty('limit', 20)
    })

    it('applies defaults for lng, if not provided', async () => {
      axios.mockImplementation(() => Promise.resolve({ data: {} }))

      await getDisclosures({})

      expect(axios.mock.calls[0][0].params).toBeTruthy()
      expect(axios.mock.calls[0][0].params).toHaveProperty('lng', 'en')
    })

    it('returns expected number of results', async () => {
      axios.mockImplementation(() => Promise.resolve(okResponse({ limit: 10, page: 1 })))

      const result = await getDisclosures({})

      expect(result).toBeTruthy()
      expect(result).toHaveLength(2)
    })

    it('returns the expected results', async () => {
      axios.mockImplementation(() => Promise.resolve(okResponse({ limit: 10, page: 1 })))

      const result = await getDisclosures({})

      expect(result[0].id).toEqual('fakeId1')
      expect(result[1].id).toEqual('fakeId2')
    })
  })
})
