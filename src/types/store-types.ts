export interface User {
  first_name: string
  second_name: string
  id: number
}

export interface UserWithCredentials extends User {
  login: string
  password: string
}

export interface NewUser {
  first_name: string
  second_name: string
  login: string
  password: string
}
