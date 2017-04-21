import {
  GET_PHOTO_STATUS,
  PUT_PHOTO_STATUS
} from '../constants/index';

export const getPhotoStatus = () => ({ type: GET_PHOTO_STATUS });
export const putPhotoStatus = payload => ({ type: PUT_PHOTO_STATUS, payload });
