export interface INewUser {
  first_name: string
  second_name: string
  e_mail: string
  password: string
}

export interface IUser extends INewUser {
  id: number | string
}

export interface IMockUser {
  [key: string]: IUser
}
