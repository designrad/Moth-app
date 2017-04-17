import { StackNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Home from '../scenes/Home';
import LearnMore from '../scenes/LearnMore';

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
  }
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: {
      style: styles.header,
      titleStyle: styles.title,
      tintColor: 'white'
    }
  }
});
