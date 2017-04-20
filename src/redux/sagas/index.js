import { put, call, fork, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { takeLatest } from 'redux-saga';
import { setApp, showAlert } from '../actions/app';
import { callApi, Endpoints } from '../../global/api';
import { UPLOAD_PHOTO } from '../constants';
import { NavigationActions } from 'react-navigation';

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

function* uploadPhoto() {
  console.log('uploadPhoto');
  try {
    const { deviceID } = yield select(state => state.app);
    const {
      timestamp,
      latitude,
      longitude,
      name,
      team,
      email,
      comment,
      imgUri,
      imgName,
    } = yield select(state => state.finalize);
    const formData = new FormData();
    formData.append(
      'file',
      {
        uri: imgUri,
        name: imgName || 'file1.jpg',
        type: 'image/jpeg; image/png'
      }
    );
    formData.append('accuracy', 0);//
    formData.append('comments', comment);//
    formData.append('latitude', latitude);//
    formData.append('longitude', longitude);//
    formData.append('data', timestamp);
    formData.append('author', name);
    formData.append('team', team);
    formData.append('email', email);
    formData.append('device', deviceID);//
    yield call(callApi, {
      endpoint: Endpoints.upload,
      method: 'POST',
      payload: formData
    });
    yield put(NavigationActions.back());
    yield put(showAlert('success'.localized));
  } catch (error) {
    yield put(showAlert('Error'.localized));
  }
}

export default function* rootSaga() {
  yield fork(startup);
  yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
}
