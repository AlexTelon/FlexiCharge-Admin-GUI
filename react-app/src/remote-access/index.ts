import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerStationCollection, IManageUserCollection } from '../remote-access/interfaces';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');
export const manageUserCollection = container.resolve<IManageUserCollection>('manageUserCollection');