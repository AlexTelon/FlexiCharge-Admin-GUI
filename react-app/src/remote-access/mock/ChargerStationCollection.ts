import { chargerStations } from '@/__mock-data__';
import { ChargerStation, IChargerStationCollection } from '../types';

export default class ChargerStationCollection implements IChargerStationCollection {
  stations = chargerStations;

  async getAllChargerStations(): Promise<ChargerStation[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.stations);
      }, 1000);
    });
  }

  async getChargerStationById(stationId: number): Promise<ChargerStation | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.stations.filter((station) => station.chargePointId === stationId)[0] || null);
      }, 100);
    });
  }

  async addChargerStation(fields: Omit<ChargerStation, 'chargePointId'>): Promise<[number | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const chargerStation: ChargerStation = {
          ...fields,
          chargePointId: this.stations.length + 1
        };
        this.stations.push(chargerStation);
        resolve([chargerStation.chargePointId, null]);
      }, 1000);
    });
  }

  async updateChargerStation(stationId: number, fields: Omit<ChargerStation, 'chargePointId'>): Promise<[ChargerStation | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stationIndex = this.stations.findIndex((station) => station.chargePointId === stationId);
        if (stationIndex === -1) return [null, { errorMessage: 'Could not find the requested Charger Station' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const chargerStation = {
          ...fields,
          chargePointId: this.stations[stationIndex].chargePointId
        };

        this.stations[stationIndex] = chargerStation;
        resolve([chargerStation, null]);
      }, 1000);
    });
  }

  private isNametaken(name: string) {
    for (const station of this.stations) {
      if (station.name === name) return true;
    }
    return false;
  }

  private validateFields(fields: Omit<ChargerStation, 'chargePointId'>): any | null {
    const errorObj: any = {};
    if (fields.location[0] && isNaN(fields.location[0])) errorObj.latitude = 'Latitude must be a number';
    if (fields.location[1] && isNaN(fields.location[1])) errorObj.longitude = 'Longitude must be a number';
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }
}