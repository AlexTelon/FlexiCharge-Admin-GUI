export interface ManageUser {
  username: string
  sub?: string
  emailVerified?: boolean
  name?: string
  familyName?: string
  email?: string
  created?: string
  lastModified?: string
  enabled?: boolean
  password?: string
  userStatus?: 'UNCONFIRMED' | 'CONFIRMED' | 'FORCE_CHANGE_PASSWORD'
}

export interface IManageUserCollection {
  getAllUsers: () => Promise<[ManageUser[] | null, any | null]>
  getUserById: (username: string) => Promise<ManageUser | null | any | null>
  addUser: (fields: Omit<ManageUser, 'id'>) => Promise<[ManageUser | null, any | null]>
  updateUser: (username: string, fields: Omit<ManageUser, 'username'>) => Promise<[ManageUser | null, any | null]>
}

export interface ManageAdmin {
  id: string
  name: string
  email: string
}

export interface IManageAdminCollection {
  getAllAdmins: () => Promise<ManageAdmin[]>
  getAdminById: (adminId: string) => Promise<ManageAdmin | null>
  addAdmin: (fields: Omit<ManageAdmin, 'id'>) => Promise<[string | null, any | null]>
  updateAdmin: (adminId: string, fields: Omit<ManageAdmin, 'id'>) => Promise<[ManageAdmin | null, any | null]>
}