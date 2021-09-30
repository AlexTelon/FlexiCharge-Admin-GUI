export interface ManageUser {
  id: string
  name: string
  email: string
  phoneNumber: string
}

export interface IManageUserCollection {

  getAllUsers: () => Promise<[ManageUser[], any | null]>
  getUserById: (userId: string) => Promise<ManageUser | null | any | null>
  addUser: (fields: Omit<ManageUser, 'id'>) => Promise<[string | null, any | null]>
  updateUser: (userId: string, fields: Omit<ManageUser, 'id'>) => Promise<[ManageUser | null, any | null]>
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