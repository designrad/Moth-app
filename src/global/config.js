import { Platform } from 'react-native';
import '../localization';

global.isIOS = Platform.OS === 'ios';
global.isAndroid = Platform.OS === 'android';
