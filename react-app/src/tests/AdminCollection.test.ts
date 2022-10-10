/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import {expect, test} from '@jest/globals';
import { handleAdminsData } from '../remote-access/remote/business-logic'


const testUnhandledAdmins = [
	{
		Username: '090163aa-4ecd-832b',
		Attributes: [
			{
				Name: 'sub',
				Value: '090163aa-4ecd-832b'
			},
			{
				Name: 'email',
				Value: 'test@hotmail.com'
			}
		],
		UserCreateDate: '2022-09-22T16:34:03.922Z',
		lastModified: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'FORCE_CHANGE_PASSWORD'
	},
	{
		Username: '090163aa-4edfcd-832b',
		Attributes: [
			{
				Name: 'sub',
				Value: '090163aa-4edfcd-832b'
			},
			{
				Name: 'email',
				Value: 'test2@hotmail.com'
			}
		],
		UserCreateDate: '2022-09-22T16:34:03.922Z',
		lastModified: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'FORCE_CHANGE_PASSWORD'
	}
]

describe("Handling fetched admins correctly tests", () =>{
	const handledTestAdmins = handleAdminsData(testUnhandledAdmins)
	const handledTestAdmin = handledTestAdmins[0]
	test("Placing admin data in correct object properties", () => {
		expect(handledTestAdmin).toHaveProperty('username')
		expect(handledTestAdmin).toHaveProperty('userStatus')
		expect(handledTestAdmin).toHaveProperty('enabled')
		expect(handledTestAdmin).toHaveProperty('created')
		expect(handledTestAdmin).toHaveProperty('lastModified')
		expect(handledTestAdmin).toHaveProperty('sub')
		expect(handledTestAdmin).toHaveProperty('email')
	});

	test("Properties contain the correct datatype", () => {
		expect(typeof handledTestAdmin.username === 'string').toBeTruthy()
		expect(typeof handledTestAdmin.userStatus === 'string').toBeTruthy()
		expect(typeof handledTestAdmin.enabled === 'boolean').toBeTruthy()
		expect(typeof handledTestAdmin.created === 'string').toBeTruthy()
		expect(typeof handledTestAdmin.lastModified === 'string').toBeTruthy()
		expect(typeof handledTestAdmin.sub === 'string').toBeTruthy()
		expect(typeof handledTestAdmin.email === 'string').toBeTruthy()
	});
});

 