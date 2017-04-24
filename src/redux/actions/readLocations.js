import { GET_LOCATIONS, PUT_LOCATIONS } from '../constants/index';

export const getLocations = () => ({ type: GET_LOCATIONS });
export const putLocations = payload => ({ type: PUT_LOCATIONS, payload });
