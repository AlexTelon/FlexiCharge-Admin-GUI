import container from '../dependencyContainer';
import { type IAuthenticationProvider, type ICharger, type IChargerStation, type IUser, type IAdmin, type ITransaction, type IInvoice } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const manageChargerStation = container.resolve<IChargerStation>('manageChargerStation');
export const manageUser = container.resolve<IUser>('manageUser');
export const manageAdmin = container.resolve<IAdmin>('manageAdmin');
export const manageCharger = container.resolve<ICharger>('manageCharger');
export const manageTransaction = container.resolve<ITransaction>('manageTransaction');
export const manageInvoice = container.resolve<IInvoice>('manageInvoice');