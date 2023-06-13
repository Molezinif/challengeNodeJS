import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoutePath.js'

const dataBase = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/patients'),
    handler: (req, res) => {
      const patients = dataBase.select('patients')

      return res.end(JSON.stringify(patients))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/patients'),
    handler: (req, res) => {
      const { name, birthDate, email, medicalRecord } = req.body

      const patient = {
        id: randomUUID(),
        name,
        birthDate,
        email,
        medicalRecord,
      }

      if (!name || !medicalRecord) {
        return res.writeHead(400).end()
      }

      dataBase.insert('patients', patient)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/patients/:id'),
    handler: (req, res) => {
      const { id } = req.params

      if (!id) {
        return res.writeHead(400).end()
      }

      dataBase.delete('patients', id)
      return res.writeHead(204).end()
    },
  },
]
