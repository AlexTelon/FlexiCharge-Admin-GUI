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
    const handledTestAdmins = handleAdminsData(testUnhandledAdmins)
	const handledTestAdmin = handledTestAdmins[0]

    expect(handledTestAdmins.length).toEqual(2)

    expect(handledTestAdmin).toHaveProperty('username')
    expect(handledTestAdmin).toHaveProperty('userStatus')
    expect(handledTestAdmin).toHaveProperty('enabled')
    expect(handledTestAdmin).toHaveProperty('created')
    expect(handledTestAdmin).toHaveProperty('lastModified')
    expect(handledTestAdmin).toHaveProperty('sub')
    expect(handledTestAdmin).toHaveProperty('email')
});
 