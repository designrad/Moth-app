import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text, Button, Alert } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize } from '../redux/actions/finalize';

import MapView from 'react-native-maps';
import { Routes } from '../global/constants';
import { colors } from '../global';

@connect(({ finalize }) => ({
  ...finalize,
}), dispatch => bindActionCreators({
  setFinalize
}, dispatch))
export default class AddLocation extends Component {
  static navigationOptions = ({ navigation: { goBack, state }}) => ({
    title: Routes.addLocation.title.localized,
    headerRight: (!state.params.show &&
      <Button
        title={'Save'}
        color={colors.white}
        onPress={() => goBack()}
        icon={''}
      />
    )
  });
  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired
    }).isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    setFinalize: PropTypes.func.isRequired
  };

  static defaultProps = {
    latitude: null,
    longitude: null
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
      },
      fixed: false
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position.coords;
        this.setState({ initialPosition });
      },
      error => Alert.alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = position;
      this.setState({ lastPosition });
    });
    const { longitude, latitude } = this.props;
    if (longitude && latitude) {
      const photoPos = { longitude, latitude };
      this.initLocation(photoPos);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  setLocation(location) {
    if (!this.state.fixed) {
      this.setState({ x: location });
      this.props.setFinalize({ latitude: location.latitude, longitude: location.longitude });
    }
  }
  initLocation(location) {
    this.setState({ x: location, initialPosition: location, fixed: true });
  }
  render() {
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
        onPress={e => this.setLocation(e.nativeEvent.coordinate)}
        showsUserLocation
      >
        <MapView.Marker
          draggable={this.state.fixed}
          coordinate={this.state.x}
          onDragEnd={e => this.setLocation(e.nativeEvent.coordinate)}
        />
      </MapView>
    );
  }
}
