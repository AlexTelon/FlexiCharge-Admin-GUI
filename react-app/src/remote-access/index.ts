import container from '../dependencyContainer';
import { type IAuthenticationProvider, type ICharger, type IChargerPoint, type IUser, type IAdmin, type ITransaction, type IInvoice } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const manageChargerPoint = container.resolve<IChargerPoint>('manageChargerPoint');
export const manageUser = container.resolve<IUser>('manageUser');
export const manageAdmin = container.resolve<IAdmin>('manageAdmin');
export const manageCharger = container.resolve<ICharger>('manageCharger');
export const manageTransaction = container.resolve<ITransaction>('manageTransaction');
export const manageInvoice = container.resolve<IInvoice>('manageInvoice');