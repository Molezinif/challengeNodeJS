export interface IPatient {
  id: string
  name: string
  birthDate: string
  email: string
  medicalRecord: string
}

export interface IUpdatePatient {
  name?: string
  email?: string
}
