export interface IRoutes {
  path: RegExp
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  handler: (req: any, res: any) => void
}
