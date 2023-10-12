import container from '../dependencyContainer';
import { IAuthenticationProvider, ICharger, IChargerPoint, IUser, IAdmin, ITransaction, IInvoice } from './types';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');
export const manageChargerPoint = container.resolve<IChargerPoint>('manageChargerPoint');
export const manageUser = container.resolve<IUser>('manageUser');
export const manageAdmin = container.resolve<IAdmin>('manageAdmin');
export const manageCharger = container.resolve<ICharger>('manageCharger');
export const manageTransaction = container.resolve<ITransaction>('manageTransaction');
export const manageInvoice = container.resolve<IInvoice>('manageInvoice');