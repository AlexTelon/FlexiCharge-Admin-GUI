import { mockChargerStations } from '@/__mock-data__';
import { ChargerStation, IChargerStation } from '../types';

export default class ManageChargerStation implements IChargerStation {
  stations = mockChargerStations;

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
        resolve(this.stations.filter((station) => station.chargePointID === stationId)[0] || null);
      }, 100);
    });
  }

  async deleteChargerStation(stationId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }

  async addChargerStation(fields: Omit<ChargerStation, 'chargePointID'>): Promise<[number | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const chargerStation: ChargerStation = {
          ...fields,
          chargePointID: this.stations.length + 1
        };
        this.stations.push(chargerStation);
        resolve([chargerStation.chargePointID, null]);
      }, 1000);
    });
  }

  async updateChargerStation(stationId: number, fields: Omit<ChargerStation, 'chargePointID'>): Promise<[ChargerStation | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stationIndex = this.stations.findIndex((station) => station.chargePointID === stationId);
        if (stationIndex === -1) return [null, { errorMessage: 'Could not find the requested Charger Station' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const chargerStation = {
          ...fields,
          chargePointID: this.stations[stationIndex].chargePointID
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

  private isValidLatitude(latitude: number) {
    return latitude >= -90 && latitude <= 90;
  }

  private isValidLongitude(longitude: number) {
    return longitude >= -180 && longitude <= 80;
  }

  private validateFields(fields: Omit<ChargerStation, 'chargePointID'>): any | null {
    const errorObj: any = {};
    if (fields.location[0] && ((isNaN(fields.location[0]) || !this.isValidLatitude(fields.location[1])))) {
      errorObj.latitude = 'Latitude must be a number within range -90 to 90';
    }
    if (fields.location[1] && (isNaN(fields.location[1]) || !this.isValidLongitude(fields.location[0]))) {
      errorObj.longitude = 'Longitude must be a number within range -180 to 80';
    }
    if (fields.name && this.isNametaken(fields.name)) errorObj.name = 'Name is taken';
    return errorObj;
  }
}