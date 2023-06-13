import { transformToJson } from '../../src/middleWares/transformToJson'

describe('Middleware: transformToJson', () => {
  test('should transform the request body into JSON', async () => {
    const buffers = [
      Buffer.from('{"id": "1"}'),
      Buffer.from('{"name": "Teste"}'),
      Buffer.from('{"birthDate": "01/01/2000"}'),
      Buffer.from('{"email": "example@gmail.com"}'),
      Buffer.from('{"medicalRecord": "1"}'),
    ]

    const asyncIterator = async function* () {
      for (const buffer of buffers) {
        yield buffer
      }
    }
    const req: any = {
      [Symbol.asyncIterator]: asyncIterator,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    }

    const res: any = {
      setHeader: jest.fn(),
    }

    await transformToJson(req, res)

    expect(req.body).toEqual(null)

    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-type',
      'application/json'
    )
  })
})
