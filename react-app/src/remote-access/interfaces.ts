export interface ChargerStation {
  id: string
  name: string
  address: string
  longitude: number
  latitude: number
}

export interface ManageUser {
  id: string
  name: string
  email: string
  phoneNumber: string
}

export interface ManageAdmin {
  id: string
  name: string
  email: string
}

export interface IAuthenticationProvider {
  login: (username: string, password: string) => Promise<[boolean, any | null]>
  getToken: () => string | null
  isAuthenticated: boolean
}

export interface IChargerStationCollection {
  getAllChargerStations: () => Promise<ChargerStation[]>
  getChargerStationById: (stationId: string) => Promise<ChargerStation | null>
  addChargerStation: (fields: Omit<ChargerStation, 'id'>) => Promise<[string | null, any | null]>
  updateChargerStation: (stationId: string, fields: Omit<ChargerStation, 'id'>) => Promise<[ChargerStation | null, any | null]>
}

export interface IManageUserCollection {
  getAllUsers: () => Promise<ManageUser[]>
  getUserById: (userId: string) => Promise<ManageUser | null>
  addUser: (fields: Omit<ManageUser, 'id'>) => Promise<[string | null, any | null]>
  updateUser: (stationId: string, fields: Omit<ManageUser, 'id'>) => Promise<[ManageUser | null, any | null]>
}

export interface IManageAdminCollection {
  getAllAdmins: () => Promise<ManageAdmin[]>
  getAdminById: (adminId: string) => Promise<ManageAdmin | null>
  addAdmin: (fields: Omit<ManageAdmin, 'id'>) => Promise<[string | null, any | null]>
  updateAdmin: (adminId: string, fields: Omit<ManageAdmin, 'id'>) => Promise<[ManageAdmin | null, any | null]>
}