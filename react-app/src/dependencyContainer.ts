import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
//
import AuthenticationProvider from './remote-access/AuthenticationProvider';
import ChargerStationCollection from './remote-access/mock/ChargerStationCollection';
import ManageUserCollection from './remote-access/mock/ManageUserCollection';
import ManageAdminCollection from './remote-access/mock/ManageAdminCollection';
import UserCollection from './remote-access/userCollection';
//

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  chargerStationCollection: asClass(ChargerStationCollection, { lifetime: Lifetime.SINGLETON }),
  manageUserCollection: asClass(ManageUserCollection, { lifetime: Lifetime.SINGLETON }),
  manageAdminCollection: asClass(ManageAdminCollection, { lifetime: Lifetime.SINGLETON }),
  userCollection: asClass(UserCollection, { lifetime: Lifetime.SINGLETON })

});

export default container;