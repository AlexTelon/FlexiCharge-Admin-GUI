/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { expect, test } from '@jest/globals';
import ManageUser from '../remote-access/mock/ManageUser';
import { mockUsers } from '../__mock-data__/users';

describe('Test getting users/user', () => { 
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
})

describe('Test CRUD operations on user', () => { 
  test('addUser should add a new user to the list', async () => {
    const manageUser = new ManageUser();
    const newUser = {
      name: 'John Doe',
      username: (manageUser.users.length + 1).toString(),
      email: 'johndoe@example.com',
      password: 'password123'
    };
    const [addedUser, error] = await manageUser.addUser(newUser);
  
    expect(addedUser).toEqual(expect.objectContaining(newUser));
    expect(error).toBeNull();
  });
  
  test('updateUser should update the user with the specified username', async () => {
    const manageUser = new ManageUser();
    const user = mockUsers[0];
    const updatedFields = {
      name: 'John Doe Jr.',
      email: 'johndoejr@example.com'
    };
    const [updatedUser, error] = await manageUser.updateUser(
      user.username,
      updatedFields
    );
  
    expect(updatedUser).toEqual(
      expect.objectContaining({
        ...mockUsers.find((u) => u.username === user.username),
        ...updatedFields
      })
    );
    expect(error).toBeNull();
  });
  
  test('deleteUser should remove the user with the specified username', async () => {
    const manageUser = new ManageUser();
    const user = mockUsers[0];
    const success = await manageUser.deleteUser(user.username);
  
    expect(success).toBe(true);
    expect(manageUser.users.find((u) => u.username === user.username)).toBeUndefined();
  });
})

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