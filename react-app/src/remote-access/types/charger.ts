export interface Charger {
  connectorID: number
  location: [number, number]
  serialNumber?: string
  chargePointID: number
  status: number
}

export interface ICharger {
  addCharger: (fields: Omit<Charger, 'connectorID' | 'status'>) => Promise<[Charger | null, any | null]>
  getAllChargers: (chargePointID?: number) => Promise<[Charger[] | null, any | null]>
  getAllAvailableChargers: () => Promise<[Charger[] | null, any | null]>
  getChargerById: (connectorID: number) => Promise<[Charger | null, any | null]>
  updateChargerById: (connectorID: number, fields: Omit<Charger, 'connectorID'>) => Promise<[Charger | null, any | null]>
  deleteChargerById: (connectorID: number) => Promise<any>
}

export interface ChargerValidationError {
  latitude?: string
  longitude?: string
  serialNumber?: string
}