export const buildRoutePath = (path) => {
  const routeParametersRegex = /:([a-zA-z]+)/g
  const pathWithParameters = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9\\-_]+)' //?<$1> is a group name
  )

  const pathRegex = new RegExp(`^${pathWithParameters}$`)

  return pathRegex
}
