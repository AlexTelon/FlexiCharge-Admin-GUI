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
import ChargerStationCollection from './remote-access/mock/ChargerStationCollection';
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

export default container;