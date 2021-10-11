export enum ChargerStatus {
  OCCUPIED = 0,
  AVAILABLE = 0,
  OUT_OF_ORDER = 1
}

export interface Charger {
  chargerID: number
  serialNumber?: string
  location: [number, number]
  chargePointID: number
  status: ChargerStatus
}

export interface IChargerCollection {
  addCharger: (fields: Omit<Charger, 'chargerID' | 'status'>) => Promise<[Charger | null, any | null]>
  getAllChargers: (chargePointID?: number) => Promise<[Charger[] | null, any | null]>
  getAllAvailableChargers: () => Promise<[Charger[] | null, any | null]>
  getChargerById: (chargerId: number) => Promise<[Charger | null, any | null]>
  updateChargerById: (chargerId: number, fields: Omit<Charger, 'chargerID'>) => Promise<[Charger | null, any | null]>
  deleteChargerById: (chargerId: number) => Promise<any>
}