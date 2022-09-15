import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
//
import ManageUserCollection from './remote-access/mock/ManageUserCollection';
import ManageAdminCollection from './remote-access/mock/ManageAdminCollection';
//
import AuthenticationProvider from './remote-access/mock/AuthenticationProvider';
import ChargerStationCollection from './remote-access/remote/ChargerStationCollection';
import UserCollection from './remote-access/remote/userCollection';
import ChargerCollection from './remote-access/remote/ChargerCollection';
import AdminCollection from './remote-access/remote/AdminCollection';
//

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  manageUserCollection: asClass(ManageUserCollection, { lifetime: Lifetime.SINGLETON }),
  manageAdminCollection: asClass(ManageAdminCollection, { lifetime: Lifetime.SINGLETON }),
  userCollection: asClass(UserCollection, { lifetime: Lifetime.SINGLETON }),
  chargerCollection: asClass(ChargerCollection, { lifetime: Lifetime.SINGLETON }),
  chargerStationCollection: asClass(ChargerStationCollection, { lifetime: Lifetime.SINGLETON }),
  adminCollection: asClass(AdminCollection, { lifetime: Lifetime.SINGLETON })
});

export default container;