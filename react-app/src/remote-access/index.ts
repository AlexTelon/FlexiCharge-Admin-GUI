import container from '../dependencyContainer';
import { IAuthenticationProvider, IChargerCollection, IChargerStationCollection, IManageUserCollection, IManageAdminCollection, IManageTransactionCollection } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const chargerStationCollection = container.resolve<IChargerStationCollection>('chargerStationCollection');
export const manageUserCollection = container.resolve<IManageUserCollection>('manageUserCollection');
export const manageAdminCollection = container.resolve<IManageAdminCollection>('manageAdminCollection');
export const adminCollection = container.resolve<IManageAdminCollection>('adminCollection');
export const userCollection = container.resolve<IManageUserCollection>('userCollection');
export const chargerCollection = container.resolve<IChargerCollection>('chargerCollection');
export const manageTransactionCollection = container.resolve<IManageTransactionCollection>('manageTransactionCollection');
export const transactionCollection = container.resolve<IManageTransactionCollection>('transactionCollection');