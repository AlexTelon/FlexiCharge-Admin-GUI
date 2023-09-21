export interface User {
  username: string
  sub?: string
  emailVerified?: boolean
  name?: string
  family_name?: string
  email: string
  created?: string
  lastModified?: string
  enabled?: boolean
  password?: string
  userStatus?: 'UNCONFIRMED' | 'CONFIRMED' | 'FORCE_CHANGE_PASSWORD'
}

export interface TestUser {
  username: string
  name?: string
}

export interface IUser {
  getAllUsers: () => Promise<[User[] | null, any | null]>
  getUserById: (username: string) => Promise<User | null | any | null>
  addUser: (fields: Omit<User, 'id'>) => Promise<[User | null, any | null]>
  updateUser: (username: string, fields: Omit<User, 'username'>) => Promise<[User | null, any | null]>
  deleteUser: (username: string) => Promise<boolean>
  resetUserPassword: (username: string) => Promise<[User | null, any | null]>
}

export interface Admin {
  username: string
  sub?: string
  emailVerified?: boolean
  name?: string
  family_name?: string
  email?: string
  created?: string
  lastModified?: string
  enabled?: boolean
  password?: string
  userStatus?: 'UNCONFIRMED' | 'CONFIRMED' | 'FORCE_CHANGE_PASSWORD'
}

export interface IAdmin {
  getAllAdmins: () => Promise<[Admin[] | null, any | null]>
  getAdminById: (username: string) => Promise<Admin | null>
  addAdmin: (fields: Omit<Admin, 'id'>) => Promise<[string | null, any | null]>
  updateAdmin: (username: string, fields: Omit<Admin, 'username'>) => Promise<[Admin | null, any | null]>
  deleteAdmin: (username: string) => Promise<boolean>
}