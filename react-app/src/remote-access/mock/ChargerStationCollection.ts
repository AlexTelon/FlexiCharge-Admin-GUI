import { chargerStations } from '../../__mock-data__';
import { ChargerStation, IChargerStationCollection } from '../interfaces';

export default class ChargerStationCollection implements IChargerStationCollection {
  stations = chargerStations;

  async getAllChargerStations(): Promise<ChargerStation[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.stations);
      }, 1000);
    });
  }

  async getChargerStationById(stationId: string): Promise<ChargerStation | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.stations.filter((station) => station.id === stationId)[0] || null);
      }, 100);
    });
  }

  async addChargerStation(fields: Omit<ChargerStation, 'id'>): Promise<[string | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (const station of this.stations) {
          if (station.name === fields.name) resolve([null, { error: true, errorMessage: 'Charger Station name already taken' }]);
        }

        const chargerStation: ChargerStation = {
          ...fields,
          id: `${this.stations.length + 1}`
        };
        this.stations.push(chargerStation);
        resolve([chargerStation.id, null]);
      }, 1000);
    });
  }
}