import fs from 'node:fs/promises'
import path from 'node:path'

const dataBasePath = path.join(__dirname, '..', 'db.json')

export class Database {
  #database: { [key: string]: any[] }

  constructor() {
    this.#database = {}
    fs.readFile(dataBasePath, 'utf8')
      .then((data: string) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist(): void {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  select(table: string, search?: { [key: string]: string }) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table: string, data: any) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table: string, id: string, data: any) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    const oldRow = this.#database[table][rowIndex]

    data = { ...oldRow, ...data }

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
