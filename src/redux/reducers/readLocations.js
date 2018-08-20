import { PUT_LOCATIONS, SET_FILTER_YEAR } from '../constants/index';
import makeReducer from './fabric';

const initialState = {
  locations: [],
  filterYear: null,
};

export default makeReducer(initialState, PUT_LOCATIONS, (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTER_YEAR: {
      const { year } = payload;
      const filterYear = year === state.filterYear ? null : year;
      return {
        ...state,
        filterYear,
      };
    }
    default:
      return state;
  }
});
