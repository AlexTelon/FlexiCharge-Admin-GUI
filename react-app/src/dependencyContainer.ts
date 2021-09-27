import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
//
import AuthenticationProvider from './remote-access/remote/AuthenticationProvider';
import ChargerStationCollection from './remote-access/mock/ChargerStationCollection';
import ChargerCollection from './remote-access/remote/ChargerCollection';
//

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  chargerStationCollection: asClass(ChargerStationCollection, { lifetime: Lifetime.SINGLETON }),
  chargerCollection: asClass(ChargerCollection, { lifetime: Lifetime.SINGLETON }),
});

export default container;