import React, { Component, PropTypes } from 'react';
import { BackAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { navigateBack } from './redux/actions/app';
import './global/config';
import { Routes } from './global/constants';
import configureStore from './redux/store';
import Navigator from './navigation';

const store = configureStore();

export default class App extends Component {
  static propTypes = {
    navigateBack: PropTypes.func.isRequired
  };

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate(Routes.home.name);
    return true;
  };
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
