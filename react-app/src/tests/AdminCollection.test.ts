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
		UserLastModifiedDate: '2022-09-22T16:34:03.922Z',
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
		UserLastModifiedDate: '2022-09-22T16:34:03.922Z',
		Enabled: true,
		userStatus: 'FORCE_CHANGE_PASSWORD'
	}
]

test("Admin Collection", () => {
	handleAdminsData(testUnhandledAdmins)
 });

 test("Initial test", () => {
	expect(3).toEqual(3);
 });
 