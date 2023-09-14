/* eslint-disable */
/* eslint-disable react/jsx-no-undef */

import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
// change /mock/ to /remote/ to use api data

import ManageUserCollection from './remote-access/mock/ManageUserCollection';
import ManageAdminCollection from './remote-access/mock/ManageAdminCollection';
import ManageTransactionCollection from './remote-access/mock/ManageTransactionCollection';
import ManageInvoiceCollection from './remote-access/mock/ManageInvoiceCollection';
//
import AuthenticationProvider from './remote-access/mock/AuthenticationProvider';
import ChargerStationCollection from './remote-access/remote/ChargerStationCollection';
import UserCollection from './remote-access/remote/userCollection';
import ChargerCollection from './remote-access/remote/ChargerCollection';
import AdminCollection from './remote-access/remote/AdminCollection';
import TransactionCollection from './remote-access/remote/TransactionCollection';

//

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  manageUserCollection: asClass(ManageUserCollection, { lifetime: Lifetime.SINGLETON }),
  manageAdminCollection: asClass(ManageAdminCollection, { lifetime: Lifetime.SINGLETON }),
  manageTransactionCollection: asClass(ManageTransactionCollection, { lifetime: Lifetime.SINGLETON }),
  manageInvoiceCollection: asClass(ManageInvoiceCollection, { lifetime: Lifetime.SINGLETON }),
  userCollection: asClass(UserCollection, { lifetime: Lifetime.SINGLETON }),
  chargerCollection: asClass(ChargerCollection, { lifetime: Lifetime.SINGLETON }),
  chargerStationCollection: asClass(ChargerStationCollection, { lifetime: Lifetime.SINGLETON }),
  adminCollection: asClass(AdminCollection, { lifetime: Lifetime.SINGLETON }),
  transactionCollection: asClass(TransactionCollection, { lifetime: Lifetime.SINGLETON })
});


const swapElements = (_array:
   (typeof AuthenticationProvider | typeof ManageUserCollection | typeof ManageInvoiceCollection | typeof UserCollection | typeof ChargerCollection | typeof ChargerStationCollection |
     typeof AdminCollection | typeof TransactionCollection)[], index1: number, index2: number, index3: number, index4: number,
     index5: number, index6: number,index7: number, index8: number, index9: number, index10: number) => {
  [switchMockAndRemoteData[index1], switchMockAndRemoteData[index2], switchMockAndRemoteData[index3],  switchMockAndRemoteData[index4]] 
  = [switchMockAndRemoteData[index5], switchMockAndRemoteData[index6],  switchMockAndRemoteData[index7], switchMockAndRemoteData[index8]
, switchMockAndRemoteData[index9],  switchMockAndRemoteData[index10]];
};

let switchMockAndRemoteData = [ManageUserCollection, ManageAdminCollection, ManageTransactionCollection, ManageInvoiceCollection,
  AuthenticationProvider, ChargerStationCollection, UserCollection, ChargerCollection, AdminCollection, TransactionCollection ]
swapElements(switchMockAndRemoteData, 0,1,2,3,4,5,6,7,8,9);
console.log(switchMockAndRemoteData); 


export default container;