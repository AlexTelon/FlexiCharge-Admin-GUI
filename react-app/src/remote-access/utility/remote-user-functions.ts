import { ManageUser } from '../types';

export const toUserAttributes = (fields: Omit<ManageUser, 'username'>): any[] => {
  const userAttributes = [];
  for (const [key, value] of Object.entries(fields)) {
    userAttributes.push({
      Name: key,
      Value: value
    });
  }
  return userAttributes;
};

export const fromUserAttributes = (userAttributes: any[]): Partial<ManageUser> => {
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

export const convertRemoteUserToLocal = (remoteUser: any): ManageUser => {
  const attributes = fromUserAttributes(remoteUser.UserAttributes ?? remoteUser.Attributes);
  const localUser: ManageUser = {
    username: remoteUser.Username,
    userStatus: remoteUser.userStatus,
    enabled: remoteUser.Enabled,
    created: remoteUser.UserCreateDate,
    lastModified: remoteUser.lastModified,
    ...attributes
  };
  return localUser;
};

export const convertRemoteUsersToLocal = (remoteUser: any): ManageUser => {
  const localUser: ManageUser = {
    email: remoteUser.Username,
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