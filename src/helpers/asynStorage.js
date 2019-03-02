import { AsyncStorage } from 'react-native';
import { stringify } from 'querystring';

// Store/save data to storage
export const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// Get data back from storage
export const _retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
      // return value;
    }
  } catch (error) {
    console.log(error);
  }
};

// Remove data back from storage
export const _removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

// Remove all data back from storage
export const _removeAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
