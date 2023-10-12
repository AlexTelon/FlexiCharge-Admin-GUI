import { mockChargerPoints } from '@/__mock-data__';
import { ChargePoint, IChargerPoint } from '../types';

export default class ManageChargerPoint implements IChargerPoint {
  points = mockChargerPoints;

  async getAllChargerPoints(): Promise<ChargePoint[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.points);
      }, 1000);
    });
  }

  async getChargerPointById(chargePointId: number): Promise<ChargePoint | null> {
    return new Promise((resolve, reject) => {
      // Look up in local
      // If not found then try remote

      setTimeout(() => {
        resolve(this.points.filter((point) => point.chargePointID === chargePointId)[0] || null);
      }, 100);
    });
  }

  async deleteChargerPoint(chargePointId: number): Promise<boolean> {
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
          chargePointID: this.points.length + 1
        };
        this.points.push(chargePoint);
        resolve([chargePoint.chargePointID, null]);
      }, 1000);
    });
  }

  async updateChargerPoint(chargePointId: number, fields: Omit<ChargePoint, 'chargePointID'>): Promise<[ChargePoint | null, any | null]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pointIndex = this.points.findIndex((point) => point.chargePointID === chargePointId);
        if (pointIndex === -1) return [null, { errorMessage: 'Could not find the requested Charge-point' }];

        const errorObj = this.validateFields(fields);
        if (Object.keys(errorObj).length > 0) resolve([null, errorObj]);

        const chargePoint = {
          ...fields,
          chargePointID: this.points[pointIndex].chargePointID
        };

        this.points[pointIndex] = chargePoint;
        resolve([chargePoint, null]);
      }, 1000);
    });
  }

  private isNametaken(name: string) {
    for (const point of this.points) {
      if (point.name === name) return true;
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