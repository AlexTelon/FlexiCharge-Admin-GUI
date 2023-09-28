import { User } from '../types';

export const toUserAttributes = (fields: Omit<User, 'username'>): any[] => {
  const userAttributes = [];
  for (const [key, value] of Object.entries(fields)) {
    userAttributes.push({
      Name: key,
      Value: value
    });
  }
  return userAttributes;
};

export const fromUserAttributes = (userAttributes: any[]): Partial<User> => {
  const user: any = {};
  for (const attribute of userAttributes) {
    let { Name: key, Value: value } = attribute;

    switch (key) {
      case 'email_verified':
        key = 'emailVerified';
        value = value === 'true';
        break;
    }

    user[key] = value;
  }
  return user;
};

export const convertRemoteUsersToLocal = (remoteUser: any): User => {
  const attributes = fromUserAttributes(remoteUser.UserAttributes ?? remoteUser.Attributes);
  const localUser: User = {
    username: remoteUser.Username,
    userStatus: remoteUser.userStatus,
    enabled: remoteUser.Enabled,
    created: remoteUser.UserCreateDate,
    lastModified: remoteUser.lastModified,
    ...attributes
  };
  return localUser;
};

export const convertRemoteUserToLocal = (remoteUser: any): User => {
  const localUser: User = {
    email: remoteUser.username,
    userStatus: remoteUser.userStatus,
    enabled: remoteUser.Enabled,
    created: remoteUser.UserCreateDate,
    lastModified: remoteUser.lastModified,
    username: remoteUser.userId,
    name: remoteUser.firstName,
    family_name: remoteUser.lastName
  };
  return localUser;
};