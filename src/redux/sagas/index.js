import { put, call, fork, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { takeLatest } from 'redux-saga';
import { setApp } from '../actions/app';

function* startup() {
  try {
    let deviceID = yield call(AsyncStorage.getItem, 'deviceID');
    if (!deviceID) {
      deviceID = DeviceInfo.getUniqueID();
      yield call(AsyncStorage.setItem, 'deviceID', deviceID);
    }
    yield put(setApp({ deviceID }));
  } catch (error) {
    console.log('error: ', error);
  }
}


export default function* rootSaga() {
  yield fork(startup);
}
