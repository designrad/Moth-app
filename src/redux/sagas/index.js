import { put, call, fork, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';
import { takeLatest } from 'redux-saga';
import { setApp, showAlert } from '../actions/app';
import { putPhotoStatus } from '../actions/log';
import { putMyPhoto } from '../actions/moth';
import { callApi, Endpoints } from '../../global/api';
import { putLocations } from '../actions/readLocations';
import { UPLOAD_PHOTO, GET_PHOTO_STATUS, GET_MY_PHOTO, GET_LOCATIONS } from '../constants';

function* startup() {
  try {
    let deviceID = yield call(AsyncStorage.getItem, 'deviceID');
    if (!deviceID) {
      deviceID = DeviceInfo.getUniqueID();
      yield call(AsyncStorage.setItem, 'deviceID', deviceID);
    }
    yield put(setApp({ deviceID }));
  } catch (error) {
    yield put(showAlert('Error'.localized));
  }
}

function* uploadPhoto() {
  try {
    yield put(setApp({ isLoading: true }));
    const { deviceID } = yield select(state => state.app);
    let moths = yield call(AsyncStorage.getItem, 'moths');
    const mothsJson = JSON.parse(moths);
    const {
      date,
      latitude,
      longitude,
      name,
      team,
      email,
      comment,
      imgUri,
      imgName,
    } = yield select(state => state.finalize);
    mothsJson.find((element, i) => {
      if (element.imgUri === imgUri) {
        mothsJson.splice(i, 1);
        return mothsJson;
      }
      return false;
    });
    moths = JSON.stringify(mothsJson);
    yield call(AsyncStorage.setItem, 'moths', moths);
    const formData = new FormData();
    formData.append(
      'file',
      {
        uri: imgUri,
        name: imgName || 'file1.jpg',
        type: 'image/jpeg'
      }
    );
    formData.append('accuracy', 0);
    formData.append('comments', comment);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('date', date);
    formData.append('author', name);
    formData.append('team', team);
    formData.append('email', email);
    formData.append('device', deviceID);
    yield call(callApi, {
      endpoint: Endpoints.upload,
      method: 'POST',
      payload: formData,
      isFormData: true
    });
    yield put(NavigationActions.back());
    yield put(showAlert('Success'.localized));
  } catch (error) {
    let moths = yield call(AsyncStorage.getItem, 'moths');
    const finalize = yield select(state => state.finalize);
    if (!moths) {
      moths = JSON.stringify([finalize]);
    } else {
      const mothsJson = JSON.parse(moths);
      mothsJson.push(finalize);
      moths = JSON.stringify(mothsJson);
    }
    yield call(AsyncStorage.setItem, 'moths', moths);
    yield put(NavigationActions.back());
    yield put(showAlert('Error'.localized));
  }
}

function* getPhotoStatus() {
  try {
    const device = yield select(({ app: { deviceID } }) => deviceID);
    const response = yield call(callApi, {
      endpoint: Endpoints.photos,
      method: 'POST',
      payload: { device: `${device}` }
    });
    const moths = yield call(AsyncStorage.getItem, 'moths');
    const logs = response.data.photos.concat(JSON.parse(moths));
    yield put(putPhotoStatus({ photos: logs }));
  } catch (error) {
    yield put(showAlert('Error'.localized));
  }
}

function* getPhoto({ id }) {
  try {
    const response = yield call(callApi, {
      endpoint: Endpoints.image,
      method: 'POST',
      payload: { id: `${id}` }
    });
    yield put(putMyPhoto({ image: response.data.image }));
  } catch (error) {
    yield put(showAlert('Error'.localized));
  }
}

function* getLocations() {
  try {
    yield put(setApp({ isLoading: true }));
    const response = yield call(callApi, {
      endpoint: Endpoints.geolocations,
      method: 'GET'
    });
    yield put(putLocations({ locations: response.data.photos }));
    yield put(setApp({ isLoading: false }));
  } catch (error) {
    yield put(showAlert('Error'.localized));
  }
}

export default function* rootSaga() {
  yield fork(startup);
  yield takeLatest(UPLOAD_PHOTO, uploadPhoto);
  yield takeLatest(GET_PHOTO_STATUS, getPhotoStatus);
  yield takeLatest(GET_MY_PHOTO, getPhoto);
  yield takeLatest(GET_LOCATIONS, getLocations);
}
