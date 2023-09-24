import { Charger } from '../remote-access/types';

export const mockChargers: Charger[] = [ 
  { chargerID: 0, chargePointID: 0, location: ['Torpa', 'jönköping'], status: 1 },
  { chargerID: 1, chargePointID: 1, location: ['Tranås', 'jönköping'], status: 0 },
  { chargerID: 2, chargePointID: 1, location: ['Råslätt', 'jönköping'], status: 1 },
  { chargerID: 3, chargePointID: 2, location: ['Öxnehaga', 'jönköping'], status: 0 }
];