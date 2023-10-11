import { mockChargerPoints } from '@/__mock-data__';
import { ChargePoint, IChargerPoint } from '../types';

export default class ManageChargerPoint implements IChargerPoint {
  stations = mockChargerPoints;

  async getAllChargerPoints(): Promise<ChargePoint[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.stations);
      }, 1000);
    });
  }

  async getChargerPointById(chargerPointId: number): Promise<ChargePoint | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.stations.filter((station) => station.chargePointID === chargerPointId)[0] || null);
      }, 100);
    });
  }

  async deleteChargerPoint(chargerPointId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }

  async addChargerPoint(fields: Omit<ChargePoint, 'chargePointID'>): Promise<[number | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);
        
        const chargePoint: ChargePoint = {
          ...fields,
          chargePointID: this.stations.length + 1
        };
        this.stations.push(chargePoint);
        resolve([chargePoint.chargePointID, null]);
      }, 1000);
    });
  }

  async updateChargerPoint(chargerPointId: number, fields: Omit<ChargePoint, 'chargePointID'>): Promise<[ChargePoint | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stationIndex = this.stations.findIndex((station) => station.chargePointID === chargerPointId);
        if (stationIndex === -1) return [null, { errorMessage: 'Could not find the requested Charger Point' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const chargePoint = {
          ...fields,
          chargePointID: this.stations[stationIndex].chargePointID
        };

        this.stations[stationIndex] = chargePoint;
        resolve([chargePoint, null]);
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

  private validateFields(fields: Omit<ChargePoint, 'chargePointID'>): any | null {
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