import { StackNavigator } from 'react-navigation';

import Home from '../scenes/Home';
import LearnMore from '../scenes/LearnMore';

import { Routes } from '../global/constants';

export default StackNavigator({
  [Routes.home.name]: {
    screen: Home
  },
  [Routes.learnMore.name]: {
    screen: LearnMore
  }
}, {
  headerMode: 'screen'
});
