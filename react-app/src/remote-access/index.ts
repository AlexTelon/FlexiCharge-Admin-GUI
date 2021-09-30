import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerCollection, IChargerStationCollection, IManageUserCollection } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');
export const manageUserCollection = container.resolve<IManageUserCollection>('manageUserCollection');
export const chargerCollection = container.resolve<IChargerCollection>('chargerCollection');