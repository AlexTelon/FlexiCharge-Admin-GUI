/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { createContainer, asClass, Lifetime, InjectionMode } from 'awilix';
// change /mock/ to /remote/ to use api data

import AuthenticationProvider from './remote-access/remote/AuthenticationProvider';
import ManageUser from './remote-access/remote/ManageUser';
import ManageAdmin from './remote-access/remote/ManageAdmin';
import ManageTransaction from './remote-access/remote/ManageTransaction';
import ManageInvoice from './remote-access/mock/ManageInvoice';
import ManageChargerStation from './remote-access/remote/ManageChargerStation';
import ManageCharger from './remote-access/remote/ManageCharger';

/*
import AuthenticationProvider from './remote-access/mock/AuthenticationProvider';
import ManageUser from './remote-access/mock/ManageUser';
import ManageAdmin from './remote-access/mock/ManageAdmin';
import ManageTransaction from './remote-access/mock/ManageTransaction';
import ManageInvoice from './remote-access/mock/ManageInvoice';
import ManageChargerStation from './remote-access/remote/ManageChargerStation';
import ManageCharger from './remote-access/remote/ManageCharger';
*/

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authenticationProvider: asClass(AuthenticationProvider, { lifetime: Lifetime.SINGLETON }),
  manageUser: asClass(ManageUser, { lifetime: Lifetime.SINGLETON }),
  manageAdmin: asClass(ManageAdmin, { lifetime: Lifetime.SINGLETON }),
  manageTransaction: asClass(ManageTransaction, { lifetime: Lifetime.SINGLETON }),
  manageInvoice: asClass(ManageInvoice, { lifetime: Lifetime.SINGLETON }),
  manageCharger: asClass(ManageCharger, { lifetime: Lifetime.SINGLETON }),
  manageChargerStation: asClass(ManageChargerStation, { lifetime: Lifetime.SINGLETON }),
});

export default container;