import { FLEXICHARGE_API_URL } from '@/appConfig';
import { mockChargerStations } from '@/__mock-data__';
import axios from 'axios';
import { ChargerStation, IChargerStation } from '../types';

export default class ManageChargerStation implements IChargerStation {
  stations = mockChargerStations;

  async getAllChargerStations(): Promise<ChargerStation[]> {
    const response = await axios.get(`${FLEXICHARGE_API_URL}/chargePoints`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const chargerStations = response.data;
    return chargerStations;
  }

  async getChargerStationById(stationId: number): Promise<ChargerStation | null> {
    try {
      const reponse = await axios.get(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const chargerStation = reponse.data;
      return chargerStation;
    } catch (error: any) {
      if (error.response) {
        return null;
      }
      return null;
    }
  }

  async addChargerStation(fields: Omit<ChargerStation, 'chargePointID'>): Promise<[number | null, any | null]> {
    try {
      const errorObj = this.validateFields(fields);
      if (Object.keys(errorObj).length > 0) return [null, errorObj];

      const response = await axios.post(`${FLEXICHARGE_API_URL}/chargePoints`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
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

  async deleteChargerStation(stationId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 204) {
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.response) {
        return false;
      }
      return false;
    }
  }

  async updateChargerStation(stationId: number, fields: Omit<ChargerStation, 'chargePointID'>): Promise<[ChargerStation | null, any | null]> {
    try {
      const errorObj = this.validateFields(fields);
      if (Object.keys(errorObj).length > 0) return [null, errorObj];

      const response = await axios.put(`${FLEXICHARGE_API_URL}/chargePoints/${stationId}`, {
        ...fields
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
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