import { extractQueryParams } from '../../src/utils/extractQueryParams'

describe('Utils: extractQueryParams', () => {
  test('should extract query params from a string', () => {
    const queryParams = '?search=Gabriel'
    const expected = {
      search: 'Gabriel',
    }

    const result = extractQueryParams(queryParams)

    expect(result).toEqual(expected)
  })
})
