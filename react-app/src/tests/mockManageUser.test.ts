/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { expect, test } from '@jest/globals';
import ManageUser from '../remote-access/mock/ManageUser';
import { mockUsers } from '../__mock-data__/users';

describe('reset user password test', () => {
  const manageUser = new ManageUser();
  const users = mockUsers;

  test('resetUserPassword should reset the password of the user with the specified username', async () => {
    const user = users[0];
    const [updatedUser, error] = await manageUser.resetUserPassword(user.username);
    expect(error).toBeNull();
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.username).toEqual(user.username);
    expect(updatedUser?.email).toEqual(user.email);
    expect(updatedUser?.password).toEqual('temp_password');
  });

  test('resetUserPassword should show error for invalid username', async () => {
    const invalidUsername = 'invalidUser';
    const [updatedUser, error] = await manageUser.resetUserPassword(invalidUsername);
    expect(updatedUser).toBeNull();
    expect(error).toEqual({ errorMessage: 'Could not find the User' });
  });
});