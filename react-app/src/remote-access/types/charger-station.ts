export interface ChargerStation {
  chargePointId: number
  name: string
  location: [number, number]
  price: number
  klarnaReservationAmount: number | null
}

export interface IChargerStationCollection {
  getAllChargerStations: () => Promise<ChargerStation[]>
  getChargerStationById: (stationId: number) => Promise<ChargerStation | null>
  addChargerStation: (fields: Omit<ChargerStation, 'chargePointId'>) => Promise<[number | null, any | null]>
  updateChargerStation: (stationId: number, fields: Omit<ChargerStation, 'chargePointId'>) => Promise<[ChargerStation | null, any | null]>
}