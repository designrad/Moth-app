import React, { Component, PropTypes } from 'react';
import { Button, Alert, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize } from '../redux/actions/finalize';

import { Routes, latitudeDelta, longitudeDelta } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

@connect(({ finalize }) => ({
  ...finalize,
}), dispatch => bindActionCreators({
  setFinalize
}, dispatch))
export default class AddLocation extends Component {
  static navigationOptions = ({ navigation: { goBack, state: { params } } }) => ({
    title: Routes.addLocation.title.localized,
    headerRight: (
      !params.fixed &&
      <Button
        title={'Save'}
        color={colors.white}
        onPress={() => goBack()}
        icon={''}
      />
    )
  });
  static propTypes = {
    setFinalize: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          fixed: PropTypes.bool.isRequired,
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        })
      }),
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.3767730706970411,
        longitudeDelta: 0.294662356863725,
      },
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.3767730706970411,
        longitudeDelta: 0.294662356863725,
      },
      x: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      userPos: true
    };
  }
  componentWillMount() {
    const { navigation: { state } } = this.props;
    if (state.params.latitude !== null) {
      const { latitude, longitude } = state.params;
      const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
      const region = { latitude, longitude, latitudeDelta, longitudeDelta };
      const x = { latitude, longitude };
      this.setState({ initialPosition, region, x });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
          this.setState({ initialPosition });
        },
        error => Alert.alert(JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        const region = { latitude, longitude, latitudeDelta, longitudeDelta };
        const x = { latitude, longitude };
        this.setState({ region, x });
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
    const { navigation: { state } } = this.props;
    if (!state.params.fixed) {
      this.setState({ x: location });
      this.props.setFinalize({ latitude: location.latitude, longitude: location.longitude });
    }
  }
  watchID: ?number = null;
  initLocation(region, point, initRegion, userPos) {
    this.setState({ x: point, initialPosition: initRegion, region, userPos });
  }
  render() {
    const { initialPosition, region, x } = this.state;
    const { navigation: { state } } = this.props;
    return (
      <MapView
        style={styles.container}
        initialRegion={initialPosition}
        region={region}
        onRegionChange={e => this.onRegionChange(e)}
        onPress={e => this.setLocation(e.nativeEvent.coordinate)}
        showsUserLocation
      >
        <MapView.Marker
          coordinate={x}
          onDrag={e => this.setLocation(e.nativeEvent.coordinate)}
          draggable={!state.params.fixed}
        />
      </MapView>
    );
  }
}
