/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
import { expect, test } from '@jest/globals';
import ManageCharger from '../remote-access/mock/ManageCharger';
import { mockChargers } from '../__mock-data__/chargers';

describe('manage charger test', () => {
  const manageCharger = new ManageCharger();
  const chargers = mockChargers;

  test('getCharger should return the charger with the specified id', async () => {
    const connectorID = 1;
    const [retrievedCharger, error] = await manageCharger.getChargerById(connectorID);
    expect(retrievedCharger).toEqual(chargers.find(charger => charger.connectorID === connectorID));
    expect(error).toBeNull();
  });

  test('getCharger should return null for invalid id', async () => {
    const invalidId = 999;
    const [retrievedCharger, error] = await manageCharger.getChargerById(invalidId);
    expect(retrievedCharger).toBeNull();
    expect(error).toBeNull();
  });

  test('addCharger should add a new charger to the list', async () => {
    const newCharger = {
      connectorID: 5,
      status: 0,
      location: [34.3456, 67.3465] as [number, number],
      chargePointID: 1
    };
    const [addedCharger, error] = await manageCharger.addCharger(newCharger);
    expect(addedCharger).toEqual(newCharger);
    expect(error).toBeNull();
  });

  test('getAllChargers should return all chargers', async () => {
    const [allChargers, error] = await manageCharger.getAllChargers();
    expect(allChargers).toEqual(chargers);
    expect(error).toBeNull();
  });

  test('getAllAvailableChargers should return all available chargers', async () => {
    const [availableChargers, error] = await manageCharger.getAllAvailableChargers();
    expect(availableChargers).toEqual(chargers.filter(charger => charger.status === 0));
    expect(error).toBeNull();
  });

  test('updateChargerById should update the charger with the specified id', async () => {
    const connectorID = 1;
    const updatedFields = {
      status: 1,
      location: [56.40568, 23.0948] as [number, number],
      chargePointID: 1
    };
    const [updatedCharger, error] = await manageCharger.updateChargerById(connectorID, updatedFields);
    expect(updatedCharger).toEqual({ ...chargers.find(charger => charger.connectorID === connectorID), ...updatedFields });
    expect(error).toBeNull();
  });

  test('deleteChargerById should delete the charger with the specified id', async () => {
    const connectorID = 1;
    const result = await manageCharger.deleteChargerById(connectorID);
    expect(result).toBe(true);
  });
});