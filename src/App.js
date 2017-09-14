import React, { Component } from 'react';
import Permissions from 'react-native-permissions';


import { Provider } from 'react-redux';

import './global/config';
import configureStore from './redux/store';
import Navigator from './navigation';

const store = configureStore();

export default class App extends Component {

  componentDidMount() {
    Permissions.request('location')
      .then(response => {
        console.log('request', response);
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
