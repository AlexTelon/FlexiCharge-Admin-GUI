import { expect, test } from '@jest/globals';
import ManageUser from '../remote-access/mock/ManageUser';
import { mockUsers } from '../__mock-data__/users';

test('getAllUsers should return all users', async () => {
  const manageUser = new ManageUser();
  const [users, error] = await manageUser.getAllUsers();

  expect(users).toEqual(mockUsers);
  expect(error).toBeNull();
});

test('getUserById should return the user with the specified ID', async () => {
  const manageUser = new ManageUser();
  const userId = '1';
  const user = await manageUser.getUserById(userId);

  expect(user).toEqual(mockUsers.find((u) => u.username === userId) ?? null);
});

test('addUser should add a new user to the list', async () => {
  const manageUser = new ManageUser();
  const newUser = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123'
  };
  const [addedUser, error] = await manageUser.addUser(newUser);

  expect(addedUser).toEqual(expect.objectContaining(newUser));
  expect(error).toBeNull();
});

test('updateUser should update the user with the specified username', async () => {
  const manageUser = new ManageUser();
  const username = 'johndoe';
  const updatedFields = {
    name: 'John Doe Jr.',
    email: 'johndoejr@example.com'
  };
  const [updatedUser, error] = await manageUser.updateUser(
    username,
    updatedFields
  );

  expect(updatedUser).toEqual(
    expect.objectContaining({
      ...mockUsers.find((u) => u.username === username),
      ...updatedFields
    })
  );
  expect(error).toBeNull();
});

test('deleteUser should remove the user with the specified username', async () => {
  const manageUser = new ManageUser();
  const username = 'johndoe';
  const success = await manageUser.deleteUser(username);

  expect(success).toBe(true);
  expect(manageUser.users.find((u) => u.username === username)).toBeUndefined();
});

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