export const extractQueryParams = (query: string) => {
  return query
    .substring(1)
    .split('&')
    .reduce((acc, current) => {
      const [key, value] = current.split('=')

      return {
        ...acc,
        [key]: value,
      }
    }, {})
}
