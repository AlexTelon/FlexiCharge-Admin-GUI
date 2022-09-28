import {expect, test} from '@jest/globals';
import { handleTransactionsData } from '../remote-access/remote/business-logic'

const testUnhandledTransaction = [
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
	}
]

test("Admin Collection", () => {
	handleTransactionsData(testUnhandledTransaction)
});

 test("Initial test", () => {
	expect(3).toEqual(3);
});