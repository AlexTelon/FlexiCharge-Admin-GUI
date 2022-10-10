/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
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
		lastModified: '2022-09-22T16:34:03.922Z',
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
		lastModified: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'CONFIRMED'
	}
]


describe("Handling fetched users correctly tests", () =>{
	const handledTestUsers = handleUsersData(testUnhandledUsers)
	const handledTestUser = handledTestUsers[0]
	test("Placing user data in correct object properties", () => {
		expect(handledTestUser).toHaveProperty('username')
		expect(handledTestUser).toHaveProperty('userStatus')
		expect(handledTestUser).toHaveProperty('enabled')
		expect(handledTestUser).toHaveProperty('created')
		expect(handledTestUser).toHaveProperty('lastModified')
		expect(handledTestUser).toHaveProperty('sub')
		expect(handledTestUser).toHaveProperty('email')
	});

	test("Properties contain the correct datatype", () => {
		expect(typeof handledTestUser.username === 'string').toBeTruthy()
		expect(typeof handledTestUser.userStatus === 'string').toBeTruthy()
		expect(typeof handledTestUser.enabled === 'boolean').toBeTruthy()
		expect(typeof handledTestUser.created === 'string').toBeTruthy()
		expect(typeof handledTestUser.lastModified === 'string').toBeTruthy()
		expect(typeof handledTestUser.sub === 'string').toBeTruthy()
		expect(typeof handledTestUser.email === 'string').toBeTruthy()
	});
});

 