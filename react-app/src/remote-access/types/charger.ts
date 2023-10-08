export interface Charger {
  chargerID: number
  location: [number, number]
  serialNumber?: string
  chargePointID: number
  status: number
}

export interface ICharger {
  addCharger: (fields: Omit<Charger, 'chargerID' | 'status'>) => Promise<[Charger | null, any | null]>
  getAllChargers: (chargePointID?: number) => Promise<[Charger[] | null, any | null]>
  getAllAvailableChargers: () => Promise<[Charger[] | null, any | null]>
  getChargerById: (chargerId: number) => Promise<[Charger | null, any | null]>
  updateChargerById: (chargerId: number, fields: Omit<Charger, 'chargerID'>) => Promise<[Charger | null, any | null]>
  deleteChargerById: (chargerId: number) => Promise<any>
}

export interface ChargerValidationError {
  latitude?: string
  longitude?: string
  serialNumber?: string
}