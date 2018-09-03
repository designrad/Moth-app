import { PUT_LOCATIONS, SET_AVAILABLE_YEARS, SET_FILTER_YEAR } from '../constants/index';
import makeReducer from './fabric';
import { Moment } from '../../global/utils';

import { filterYearsLimit } from '../../global/constants';

const initialState = {
  locations: [],
  availableYears: [],
  selectedYears: [],
  filterYear: null,
};

export default makeReducer(initialState, PUT_LOCATIONS, (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTER_YEAR: {
      const { year } = payload;
      const { selectedYears, availableYears } = state;

      if (availableYears.indexOf(year) < 0) return state;

      const pos = selectedYears.indexOf(year);

      if (pos < 0) {
        selectedYears.push(year);
      } else {
        selectedYears.splice(pos, 1);
      }

      return {
        ...state,
        selectedYears,
      };
    }

    case SET_AVAILABLE_YEARS: {
      const { locations } = payload;

      const availableYears = locations.reduce((obj, { date }) => (
          (date && obj.indexOf(Number(Moment(date).format('YYYY'))) >= 0)
            ? obj
            : [...obj, Number(Moment(date).format('YYYY'))]
        ), []
      ).sort((a, b) => Moment(b).diff(a)).slice(0, filterYearsLimit);

      return {
        ...state,
        availableYears,
        selectedYears: [...availableYears]
      };
    }

    default:
      return state;
  }
});
