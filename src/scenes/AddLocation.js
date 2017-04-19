import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Routes, scale, scaleByVertical, screenWidth } from '../global/constants';

export default class AddLocation extends Component {
  static navigationOptions = {
    title: Routes.addLocation.title.localized,
  };
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      lastPosition: '',
      x: {
        latitude: 37.78825,
        longitude: -122.4324
      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position.coords;
        this.setState({ initialPosition });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = position;
      this.setState({ lastPosition });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    console.log('asdkjlskajd', this.state.initialPosition);
    const { latitude, longitude } = this.state.initialPosition;
    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
        onPress={e => this.setState({ x: e.nativeEvent.coordinate })}
        showsUserLocation
      >
        <MapView.Marker
          draggable
          coordinate={this.state.x}
          onDragEnd={e => this.setState({ x: e.nativeEvent.coordinate })}
        />
      </MapView>
    );
  }
}
