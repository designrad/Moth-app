import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize } from '../redux/actions/finalize';

import { Routes } from '../global/constants';
import { colors } from '../global';

@connect(({ finalize }) => ({
  ...finalize,
}), dispatch => bindActionCreators({
  setFinalize
}, dispatch))
export default class AddLocation extends Component {
  static navigationOptions = ({ navigation: { goBack } }) => ({
    title: Routes.addLocation.title.localized,
    headerRight: (
      <Button
        title={'Save'}
        color={colors.white}
        onPress={() => goBack()}
        icon={''}
      />
    )
  });
  static propTypes = {
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
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      lastPosition: {},
      x: {
        latitude: 37.78825,
        longitude: -122.4324
      }
    };
  }
  componentDidMount() {
    const { longitude, latitude } = this.props;
    if (longitude && latitude) {
      const photoPos = { longitude, latitude };
      this.initLocation(photoPos);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = position.coords;
          this.setState({ region });
        },
        error => Alert.alert(JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = position;
        this.setState({ lastPosition });
      });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  setLocation(location) {
    if (!this.state.fixed) {
      this.setState({ x: location });
      this.props.setFinalize({ latitude: location.latitude, longitude: location.longitude });
    }
  }
  initLocation(location) {
    this.setState({ x: location, initialPosition: location, region: location });
  }
  render() {
    const { initialPosition, region, lastPosition } = this.state;
    const latitude = (!this.props.latitude && lastPosition.latitude) ?
      lastPosition.latitude : initialPosition.latitude;
    const longitude = (!this.props.longitude && lastPosition.longitude) ?
      lastPosition.longitude : initialPosition.longitude;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude,
          latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}
        onRegionChange={e => this.onRegionChange(e)}
        onPress={e => this.setLocation(e.nativeEvent.coordinate)}
        showsUserLocation
      >
        <MapView.Marker
          coordinate={this.state.x}
          onDragEnd={e => this.setLocation(e.nativeEvent.coordinate)}
        />
      </MapView>
    );
  }
}
