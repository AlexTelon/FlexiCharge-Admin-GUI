import { Charger } from '../remote-access/types';

export const mockChargers: Charger[] = [ 
  { chargerID: 0, chargePointID: 0, location: 'Torpa', coordinates: '57.720497118 12.03499986', status: 1 },
  { chargerID: 1, chargePointID: 1, location: 'Tranås', coordinates: '33.543234554 66.77665542', status: 0 },
  { chargerID: 2, chargePointID: 1, location: 'Råslätt', coordinates: '87.656536565 44.23454266', status: 1 },
  { chargerID: 3, chargePointID: 2, location: 'Öxnehaga', coordinates: '45.653465654 23.76547654', status: 0 }
];