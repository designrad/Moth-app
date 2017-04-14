import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './global/config';
import configureStore from './redux/store';
import Navigator from './navigation';


const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
