import { Linking } from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';

const localeString = I18n.locale.toLowerCase();
const shortLocaleString = localeString.substr(0, 2);
let isMomentHaveLocale = false;

/* eslint-disable global-require */
if (localeString.length === 5 && shortLocaleString === 'en') {
  switch (localeString) {
    case 'en-au':
      isMomentHaveLocale = true;
      require('moment/locale/en-au');
      break;
    case 'en-ca':
      isMomentHaveLocale = true;
      require('moment/locale/en-ca');
      break;
    case 'en-gb':
      isMomentHaveLocale = true;
      require('moment/locale/en-gb');
      break;
    case 'en-ie':
      isMomentHaveLocale = true;
      require('moment/locale/en-ie');
      break;
    case 'en-nz':
      isMomentHaveLocale = true;
      require('moment/locale/en-nz');
      break;
    default:
      break;
  }
  if (isMomentHaveLocale) {
    moment().locale(localeString);
  }
} else {
  switch (shortLocaleString) {
    case 'nb':
      isMomentHaveLocale = true;
      require('moment/locale/nb');
      break;
    default:
      break;
  }
  if (isMomentHaveLocale) {
    moment().locale('nb');
  }
}
/* eslint-enable global-require */

export const Moment = moment;

export function openURLIfCan(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}
