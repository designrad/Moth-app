import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize } from '../redux/actions/finalize';
import { setApp } from '../redux/actions/app';

import { Routes, latitudeDelta, longitudeDelta } from '../global/constants';
import SaveButton from '../components/SaveButton';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

@connect(({ finalize }) => ({
  ...finalize,
}), dispatch => bindActionCreators({
  setFinalize,
  setApp
}, dispatch))
export default class AddLocation extends Component {
  static navigationOptions = ({ navigation: { goBack, state: { params } } }) => ({
    title: Routes.addLocation.title.localized,
    headerRight: (
      !params.fixed &&
      <SaveButton onPress={() => goBack()} />
    )
  });

  static propTypes = {
    setFinalize: PropTypes.func.isRequired,
    setApp: PropTypes.func.isRequired,
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
    this.pointlocation = this.state.x;
    const { navigation: { state }, setApp } = this.props;
    setApp({ isLoading: true });
    if (state.params.latitude !== null) {
      const { latitude, longitude } = state.params;
      const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
      const region = { latitude, longitude, latitudeDelta, longitudeDelta };
      const x = { latitude, longitude };
      this.pointlocation = x;
      this.setState({ initialPosition, region, x });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
          this.setState({ initialPosition });
          this.setLocation();
        });
      this.watchID = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        const region = { latitude, longitude, latitudeDelta, longitudeDelta };
        const x = { latitude, longitude };
        this.pointlocation = x;
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

  setLocation() {
    const { navigation: { state } } = this.props;
    if (!state.params.fixed) {
      this.setState({ x: this.pointlocation });
      this.props.setFinalize({
        latitude: this.pointlocation.latitude,
        longitude: this.pointlocation.longitude
      });
    }
  }

  pointlocation = { latitudeDelta, longitudeDelta };

  watchID: ?number = null;

  render() {
    const { initialPosition, region } = this.state;
    const { navigation: { state }, setApp } = this.props;
    return (
      <MapView
        style={styles.container}
        initialRegion={initialPosition}
        region={region}
        onRegionChange={e => this.onRegionChange(e)}
        onPress={(e) => {
          this.pointlocation = e.nativeEvent.coordinate;
          this.setLocation();
        }}
        onRegionChangeComplete={() => setApp({ isLoading: false })}
        showsUserLocation
        cacheEnabled={isAndroid}
      >
        <MapView.Marker
          coordinate={this.pointlocation}
          onDrag={(e) => { this.pointlocation = e.nativeEvent.coordinate; }}
          onDragEnd={() => this.setLocation()}
          draggable={!state.params.fixed}
        />
      </MapView>
    );
  }
}