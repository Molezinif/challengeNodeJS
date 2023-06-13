export async function transformToJson(req: any, res: any): Promise<void> {
  const buffers: Buffer[] = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
    // no body
  }

  res.setHeader('Content-type', 'application/json')
}
