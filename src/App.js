import React, { Component, PropTypes } from 'react';
import Permissions from 'react-native-permissions';


import { Provider } from 'react-redux';

import './global/config';
import configureStore from './redux/store';
import Navigator from './navigation';

const store = configureStore();

export default class App extends Component {

  componentDidMount() {
    Permissions.requestPermission('location')
      .then(response => {
        console.log('request', response);
      });

      Permissions.getPermissionStatus('location')
      .then(response => {
        console.log('check', response);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
