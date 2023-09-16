import { expect, test } from '@jest/globals';
import ManageUser from '../remote-access/mock/ManageUser';
import { mockUsers } from '../__mock-data__/users';

test('resetUserPassword should reset the password of the user with the specified username', async () => {
  const manageUser = new ManageUser();
  const username = 'johndoe';
  const [updatedUser, error] = await manageUser.resetUserPassword(username);

  expect(updatedUser).toEqual(
    expect.objectContaining({
      ...mockUsers.find((u) => u.username === username),
      password: 'temp_password'
    })
  );
  expect(error).toBeNull();
});