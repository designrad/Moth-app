import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, MapView } from 'react-native';
import { Routes, scale, scaleByVertical, screenWidth } from '../global/constants';

export default class AddLocation extends Component {
  static navigationOptions = {
    title: Routes.addLocation.title.localized
  };
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: '',
      lastPosition: ''
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    console.log('asdkjlskajd', this.state.initialPosition);
    return (
      <MapView
        region={this.state.initialPosition}
      />
    );
  }
}
