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
  }
};
export const screenWidth = width;
export const screenHeight = height;

export const scale = value => (width / 414) * value;
export const scaleByVertical = value => (height / 736) * value;

export const dataFormat = 'lll';
