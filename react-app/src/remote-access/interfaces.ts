export interface ChargerStation {
  id: string
  name: string
  address: string
  longitude: number
  latitude: number
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

export interface IManageAdminCollection {
  getAllAdmins: () => Promise<ManageAdmin[]>
  getAdminById: (adminId: string) => Promise<ManageAdmin | null>
  addAdmin: (fields: Omit<ManageAdmin, 'id'>) => Promise<[string | null, any | null]>
  updateAdmin: (adminId: string, fields: Omit<ManageAdmin, 'id'>) => Promise<[ManageAdmin | null, any | null]>
}