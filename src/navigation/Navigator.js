import { StackNavigator } from 'react-navigation';

import Home from '../scenes/Home';

import { Routes } from '../global/constants';

export default StackNavigator({
  [Routes.home.name]: {
    screen: Home
  }
});
