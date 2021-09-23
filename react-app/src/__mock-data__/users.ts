import { ManageUser } from '../remote-access/interfaces';

export const manageUsers: ManageUser[] = [
  { id: '1', name: 'Jon Doe', payment: 'Klarna', role: 'User' },
  { id: '2', name: 'Johan Svensson', payment: 'Invoices', role: 'User' },
  { id: '3', name: 'Erik Granlund', payment: 'Klarna', role: 'Admin' },
  { id: '4', name: 'Du Won Htoo', payment: 'Invoices', role: 'Admin' }
];