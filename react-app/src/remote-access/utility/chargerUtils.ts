import { type Charger, type ChargerValidationError } from '../types';

export const ChargerValidator = {
  isValidLatitude(latitude: number): boolean {
    return latitude >= -90 && latitude <= 90;
  },

  isValidLongitude(longitude: number): boolean {
    return longitude >= -180 && longitude <= 180;
  },

  isSerialNumberTaken(serialNumber: string, chargers: Charger[]): boolean {
    for (const charger of chargers) {
      if (charger.serialNumber === serialNumber) {
        return true;
      }
    }
    return false;
  },

  validateFields(fields: Omit<Charger, 'chargerID'>, chargers: Charger[]): ChargerValidationError {
    const errorObj: ChargerValidationError = {};
    if (fields.location && !this.isValidLatitude(fields.location[0])) {
      errorObj.latitude = 'Latitude must be a number within range -90 to 90';
    }
    if (fields.location && !this.isValidLongitude(fields.location[1])) {
      errorObj.longitude = 'Longitude must be a number within range -180 to 180';
    }
    if (fields.serialNumber && this.isSerialNumberTaken(fields.serialNumber, chargers)) {
      errorObj.serialNumber = 'Serial number is taken';
    }
    return errorObj;
  }
};