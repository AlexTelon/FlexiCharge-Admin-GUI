import appConfig from '@/appConfig';
import { chargerStations } from '@/__mock-data__';
import axios from 'axios';
import { authenticationProvider } from '..';
import { ChargerStation, IChargerStationCollection } from '../types';

export default class ChargerStationCollection implements IChargerStationCollection {
  stations = chargerStations;

  async getAllChargerStations(): Promise<ChargerStation[]> {
    const response = await axios.get(`${appConfig.FLEXICHARGE_API_URL}/chargePoints`, {
      headers: {
        Authorization: `Bearer ${authenticationProvider.getToken()}`
      }
    });

    const chargerStations = response.data;
    return chargerStations;
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

  async addChargerStation(fields: Omit<ChargerStation, 'chargePointID'>): Promise<[number | null, any | null]> {
    try {
      const errorObj = this.validateFields(fields);
      if (Object.keys(errorObj).length > 0) return [null, errorObj];

      const response = await axios.post(`${appConfig.FLEXICHARGE_API_URL}/chargePoints`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${authenticationProvider.getToken()}`
        }
      });

      if (response.status === 201) {
        return [response.data, null];
      }

      return [null, { error: 'An error occured' }];
    } catch (error: any) {
      if (error.response) {
        const errorObj: any = {};
        if (error.response.data.includes('dbUniqueConstraintError')) {
          errorObj.name = 'Name is taken';
        } else {
          errorObj.error = 'An error occured';
        }
        return [null, errorObj];
      } else if (error.request) {
        return [null, { error: 'Could not connect to server' }];
      } else {
        return [null, {}];
      }
    }
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
  
  private isValidLatitude(latitude: number) {
    return latitude >= -90 && latitude <= 90;
  }

  private isValidLongitude(longitude: number) {
    return longitude >= -180 && longitude <= 80;
  }

  private validateFields(fields: Omit<ChargerStation, 'chargePointID'>): any | null {
    const errorObj: any = {};
    if (fields.location[0] && ((isNaN(fields.location[0]) || !this.isValidLatitude(fields.location[1])))) {
      errorObj.latitude = 'Latitude must be a number and within range -90 to 90';
    }
    if (fields.location[1] && (isNaN(fields.location[1]) || !this.isValidLongitude(fields.location[0]))) {
      errorObj.longitude = 'Longitude must be a number and within range -180 to 80';
    }
    return errorObj;
  }
}