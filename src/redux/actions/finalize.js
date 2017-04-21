import { SET_FINALIZE, UPLOAD_PHOTO } from '../constants/index';

export const setFinalize = payload => ({ type: SET_FINALIZE, payload });
export const uploadPhoto = () => ({ type: UPLOAD_PHOTO });

