import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerStationCollection, IManageUserCollection, IManageAdminCollection } from '../remote-access/interfaces';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');
export const manageUserCollection = container.resolve<IManageUserCollection>('manageUserCollection');
export const manageAdminCollection = container.resolve<IManageAdminCollection>('manageAdminCollection');