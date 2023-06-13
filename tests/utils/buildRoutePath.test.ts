import { buildRoutePath } from '../../src/utils/buildRoutePath'

describe('Utils: buildRoutePath', () => {
  test('should build a route path', () => {
    const path = '/patients/:id'
    const pathRegex = /^\/patients\/(?<id>[a-z0-9\-_]+)(?<query>\?(.*))?$/

    const result = buildRoutePath(path)

    expect(result).toEqual(pathRegex)
  })
})
