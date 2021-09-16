export interface ChargerStation {
  id: string
  name: string
  address: string
  longitude: number
  latitude: number
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
}