export interface Charger {
  chargerID: number,
  location: string,
  cooidinates: string
  chargePointID: number
  status: number
}

export interface IChargerCollection {
  addCharger: (fields: Omit<Charger, 'chargerID'>) => Promise<[Charger | null, any | null]>
  getAllChargers: () => Promise<[Charger[] | null, any | null]>
  getAllAvailableChargers: () => Promise<[Charger[] | null, any | null]>
  getChargerById: (chargerId: number) => Promise<[Charger | null, any | null]>
  updateChargerById: (chargerId: number, fields: Omit<Charger, 'chargerID'>) => Promise<[Charger | null, any | null]>
  deleteChargerById: (chargerId: number) => Promise<any>
}