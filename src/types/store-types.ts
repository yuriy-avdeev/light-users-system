export interface User {
  first_name: string
  second_name: string
  id: number
}

export interface UserWithCredentials extends User {
  e_mail: string
  password: string
}

export interface NewUser {
  first_name: string
  second_name: string
  e_mail: string
  password: string
}
