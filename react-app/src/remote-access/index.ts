import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerStationCollection } from '../remote-access/interfaces';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');