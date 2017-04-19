import I18n from 'react-native-i18n';
import nb from './no';

I18n.fallbacks = true;
I18n.defaultSeparator = 'ы'; // Overriding for allow dots in keys. Keys should't contain this symbol.
I18n.translations = { nb };

Object.defineProperty(String.prototype, 'localized', {
  get () { return I18n.t(`${this}`, { defaultValue: `${this}` }); }
});

console.log('I18N: ', I18n);
