export async function transformToJson(req: any, res: any): Promise<void> {
  const buffers: Buffer[] = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const requestBody = Buffer.concat(buffers).toString()

  try {
    req.body = JSON.parse(requestBody)
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json')
}
