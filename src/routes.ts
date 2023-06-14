import { Database } from './database'
import { randomUUID } from 'crypto'
import { buildRoutePath } from './utils/buildRoutePath'
import { IPatient, IUpdatePatient } from './interfaces/patient'
import { IRoutes } from './interfaces/route'

const dataBase = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/patients'),
    handler: (req, res) => {
      const { search } = req.query

      const patients = dataBase.select(
        'patients',
        search && {
          id: search as string,
          name: search as string,
          medicalRecord: search as string,
        }
      )

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
      } as IPatient

      if (!name || !medicalRecord) {
        return res.writeHead(400).end()
      }

      dataBase.insert('patients', patient)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/patients/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      const patient = {
        name,
        email,
      } as IUpdatePatient

      dataBase.update('patients', id, patient)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/patients/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const deletePatient = dataBase.delete('patients', id)

      if (!deletePatient) {
        return res.writeHead(404).end()
      }

      return res.writeHead(204).end()
    },
  },
] as IRoutes[]
