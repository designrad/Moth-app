import { NavigationActions } from 'react-navigation';
import {
  SET_APP,
  SHOW_ALERT,
  SHOW_YES_OR_NO_ALERT
} from '../constants/index';
// App
export const setApp = payload => ({ type: SET_APP, payload });
export const showAlert = (title, text, okHandler) => ({ type: SHOW_ALERT, title, text, okHandler });
export const showYesOrNoAlert = (title, text, yesHandler, noHandler) => ({
  type: SHOW_YES_OR_NO_ALERT,
  title,
  text,
  yesHandler,
  noHandler
});
