import container from '../dependencyContainer';
import { IAuthenticationProvider } from '../remote-access/interfaces';

export const authenticationProvider = container.resolve<IAuthenticationProvider>('authenticationProvider');