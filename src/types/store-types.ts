export type NewUser = {
  first_name: string
  second_name: string
  e_mail: string
  password: string
  order: number
}

export type User = NewUser & {
  id: number | string
}

export type MockUser = {
  [key: string]: User
}

export type SortableUsersListFields = 'first_name' | 'second_name' | 'e_mail'
