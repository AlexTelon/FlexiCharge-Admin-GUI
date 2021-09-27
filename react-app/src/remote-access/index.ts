import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerStationCollection, IChargerCollection } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');
export const chargerCollection = container.resolve<IChargerCollection>('chargerCollection');