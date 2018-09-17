import {
  GET_LOCATIONS,
  PUT_LOCATIONS,
  SET_AVAILABLE_YEARS,
  SET_FILTER_YEAR
} from '../constants/index';

export const getLocations = () => ({ type: GET_LOCATIONS });
export const putLocations = payload => ({ type: PUT_LOCATIONS, payload });

export const setFilterYear = year => ({ type: SET_FILTER_YEAR, payload: { year } });
export const setAvailableYears = payload => ({ type: SET_AVAILABLE_YEARS, payload });
