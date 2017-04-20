import { put, call, fork, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { takeLatest } from 'redux-saga';
import { showAlert } from '../actions/app';

function* startup(action) {
  try {
    const key = yield AsyncStorage.getItem('UID');
    if (!key) {
      const uid = DeviceInfo.getUniqueID();
      try {
        yield AsyncStorage.setItem('UID', uid);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}


export default function* rootSaga() {
  yield fork(startup);
}
