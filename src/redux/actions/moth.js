import { GET_MY_PHOTO, PUT_MY_PHOTO } from '../constants/index';

export const getMyPhoto = id => ({ type: GET_MY_PHOTO, id });
export const putMyPhoto = payload => ({ type: PUT_MY_PHOTO, payload });
