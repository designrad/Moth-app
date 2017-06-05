import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Routes = {
  home: {
    name: 'Home',
    title: 'Home'
  },
  learnMore: {
    name: 'LearnMore',
    title: 'Learn more'
  },
  finalize: {
    name: 'Finalize',
    title: 'Finalize'
  },
  addLocation: {
    name: 'AddLocation',
    title: 'Add location'
  },
  log: {
    name: 'Log',
    title: 'Log'
  },
  moth: {
    name: 'Moth',
    title: 'Moth'
  },
  readLocation: {
    name: 'readLocation',
    title: 'Verified observations'
  }
};
export const screenWidth = width;
export const screenHeight = height;

export const scale = value => (width / 414) * value;
export const scaleByVertical = value => (height / 736) * value;

export const latitudeDelta = 0.0922;
export const longitudeDelta = 0.0421;

export const ipServer = '192.168.88.49:3001';
// 78.47.117.65
// 192.168.88.49

