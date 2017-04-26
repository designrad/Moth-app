import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocations } from '../redux/actions/readLocations';

import { Routes } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnMore: {
    color: colors.flatBlue,
    textDecorationLine: 'underline'
  }
});

const latitudeDelta = 0.3767730706970411;
const longitudeDelta = 0.294662356863725;

@connect(({ readLocations }) => ({
  ...readLocations
}), dispatch => bindActionCreators({
  getLocations
}, dispatch))
export default class ReadLocations extends Component {
  static navigationOptions = {
    title: Routes.readLocation.title.localized
  };
  static propTypes = {
    getLocations: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
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
      }
    };
  }

  componentDidMount() {
    this.props.getLocations();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
        this.setState({ initialPosition });
      });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      const region = { latitude, longitude, latitudeDelta, longitudeDelta };
      this.setState({ region });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  watchID: ?number = null;
  openLog = id => this.props.navigation.navigate(Routes.moth.name, { id });

  renderPoint = (point) => {
    const { _id, latitude, longitude, identification, comments } = point;
    if (identification === 'correct') {
      let newText;
      if (comments.length > 35) {
        newText = `${comments.substr(0, 35)}...`;
      } else {
        newText = comments;
      }

      return (
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          }}
          identifier={_id}
          key={_id}
        >
          <MapView.Callout
            onPress={() => this.openLog(_id)}
          >
            <View>
              <Text>{newText}</Text>
              <Text
                style={styles.btnMore}
              >{'More info'.localized}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    }
    return null;
  };

  render() {
    const { locations } = this.props;
    const { initialPosition, region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={initialPosition}
          region={region}
          style={styles.container}
          mapType={'hybrid'}
          onRegionChange={e => this.onRegionChange(e)}
          showsUserLocation
          showsMyLocationButton
          cacheEnabled={isAndroid}
        >
          {locations.map(item => (
           this.renderPoint(item)
          ))}
        </MapView>
      </View>
    );
  }
}
