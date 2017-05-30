import { SET_FINALIZE, UPLOAD_PHOTO, SET_USER_OPTIONS } from '../constants/index';

export const setFinalize = payload => ({ type: SET_FINALIZE, payload });
export const uploadPhoto = () => ({ type: UPLOAD_PHOTO });

export const setUserOptions = payload => ({ type: SET_USER_OPTIONS, payload });

