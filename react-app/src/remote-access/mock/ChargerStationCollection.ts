import { ChargerStation, IChargerStationCollection } from '../interfaces';

export default class ChargerStationCollection implements IChargerStationCollection {
  stations: ChargerStation[] = [
    { id: '1', name: 'Station One', address: 'Airport', longitude: 1, latitude: 1 },
    { id: '2', name: 'Station Two', address: 'University', longitude: 2, latitude: 2 },
    { id: '3', name: 'Station Three', address: 'Skynet HQ', longitude: 3, latitude: 3 }
  ];

  async getAllChargerStations(): Promise<ChargerStation[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.stations);
      }, 1000);
    });
  }
}