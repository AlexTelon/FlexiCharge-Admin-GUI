export interface ManageUser {
  id: string
  name: string
  payment: string
  role: string
}

export interface IManageUserCollection {
  getAllUsers: () => Promise<ManageUser[]>
  getUserById: (userId: string) => Promise<ManageUser | null>
  addUser: (fields: Omit<ManageUser, 'id'>) => Promise<[string | null, any | null]>
  updateUser: (stationId: string, fields: Omit<ManageUser, 'id'>) => Promise<[ManageUser | null, any | null]>
}