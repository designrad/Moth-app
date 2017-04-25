import { StackNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Home from '../scenes/Home';
import LearnMore from '../scenes/LearnMore';
import Finalize from '../scenes/Finalize';
import AddLocation from '../scenes/AddLocation';
import Log from '../scenes/Log';
import Moth from '../scenes/Moth';
import RearLocations from '../scenes/ReadLocations';

import { colors } from '../global';

import { Routes } from '../global/constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.mainOrange
  }
});

export default StackNavigator({
  [Routes.home.name]: {
    screen: Home
  },
  [Routes.learnMore.name]: {
    screen: LearnMore
  },
  [Routes.finalize.name]: {
    screen: Finalize
  },
  [Routes.addLocation.name]: {
    screen: AddLocation
  },
  [Routes.log.name]: {
    screen: Log
  },
  [Routes.moth.name]: {
    screen: Moth
  },
  [Routes.readLocation.name]: {
    screen: RearLocations
  }
}, {
  mode: 'modal',
  headerMode: 'screen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerTintColor: 'white'
  }
});
