import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const dataBase = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/patients',
    handler: (req, res) => {
      const patients = dataBase.select('patients')

      return res.end(JSON.stringify(patients))
    },
  },
  {
    method: 'POST',
    path: '/patients',
    handler: (req, res) => {
      const { name, birthDate, email, medicalRecord } = req.body

      const patient = {
        id: randomUUID(),
        name,
        birthDate,
        email,
        medicalRecord,
      }

      if (!name || !email) {
        return res.writeHead(400).end()
      }

      dataBase.insert('patient', patient)

      return res.writeHead(201).end()
    },
  },
]
