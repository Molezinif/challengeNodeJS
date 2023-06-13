import http from 'node:http'

import { transformToJson } from './middleWares/transformToJson'
import { routes } from './routes'
import { extractQueryParams } from './utils/extractQueryParams'
import { IRoutes } from './interfaces/route'

const server = http.createServer(async (req: any, res: any) => {
  const { method, url } = req

  await transformToJson(req, res)

  const route = routes.find((route: IRoutes) => {
    if (url) {
      return route.method === method && route.path.test(url)
    }
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams?.groups ?? {}

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
