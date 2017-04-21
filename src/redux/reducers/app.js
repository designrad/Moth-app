import {
  SET_APP,
  SHOW_ALERT,
  SHOW_YES_OR_NO_ALERT,
} from '../constants';

import { AlertTypes } from '../../components/Alert';
import makeReducer from './fabric';

const initialState = {
  isLoading: false,
  alerts: [],
  deviceID: ''
};

export default makeReducer(initialState, SET_APP, (state, action) => {
  const { type } = action;
  switch (type) {
    case SHOW_ALERT:
    case SHOW_YES_OR_NO_ALERT: {
      const alerts = [...state.alerts];
      const addAlertIfNotContains = (alert) => {
        const { title, text } = alert;
        if (!alerts.some(alert => alert.title === title && alert.text === text)) {
          alerts.push(alert);
        }
      };
      switch (type) {
        case SHOW_ALERT: {
          const { title, text, okHandler } = action;
          addAlertIfNotContains({ title, text, okHandler });
          break;
        }
        case SHOW_YES_OR_NO_ALERT: {
          const { title, text, yesHandler, noHandler } = action;
          addAlertIfNotContains({ title, text, yesHandler, noHandler, type: AlertTypes.yesOrNo });
          break;
        }
        default:
          break;
      }
      return { ...state, alerts, isLoading: false };
    }
    default:
      return state;
  }
});
