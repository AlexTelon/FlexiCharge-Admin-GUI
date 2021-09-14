import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
//
import AuthenticationProvider from './remote-access/mock/AuthenticationProvider';
import ChargerStationCollection from './remote-access/mock/ChargerStationCollection';
//

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  chargerStationCollection: asClass(ChargerStationCollection, { lifetime: Lifetime.SCOPED })
});

export default container;