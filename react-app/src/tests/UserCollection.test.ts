import {expect, test} from '@jest/globals';
import { handleUsersData } from '../remote-access/remote/business-logic'


const testUnhandledUsers = [
	{
		Username: '090163d-saa-4ecd-832b',
		Attributes: [
			{
				Name: 'sub',
				Value: '0901fd-63aa-4ecd-832b'
			},
			{
				Name: 'email_verified',
				Value: 'true'
			},
            {
				Name: 'email',
				Value: 'test@hotmail.com'
			}
		],
		UserCreateDate: '2022-09-22T16:34:03.922Z',
		UserLastModifiedDate: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'CONFIRMED'
	},
	{
        Username: '0901fds-63d-saa-4ecd-832b',
		Attributes: [
			{
				Name: 'sub',
				Value: '090-1fd-63aa-4ecd-832b'
			},
			{
				Name: 'email_verified',
				Value: 'true'
			},
            {
				Name: 'email',
				Value: 'tes2t@hotmail.com'
			}
		],
		UserCreateDate: '2022-09-22T16:34:03.922Z',
		UserLastModifiedDate: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'CONFIRMED'
	}
]

test("User Collection", () => {
    const handledTestUsers = handleUsersData(testUnhandledUsers)
	const handledTestUser = handledTestUsers[0]

    expect(handledTestUsers.length).toEqual(2)

    expect(handledTestUser).toHaveProperty('username')
    expect(handledTestUser).toHaveProperty('userStatus')
    expect(handledTestUser).toHaveProperty('enabled')
    expect(handledTestUser).toHaveProperty('created')
    expect(handledTestUser).toHaveProperty('lastModified')
    expect(handledTestUser).toHaveProperty('sub')
    expect(handledTestUser).toHaveProperty('emailVerified')
    expect(handledTestUser).toHaveProperty('email')
});
 