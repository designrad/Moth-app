import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Dimensions, BackAndroid, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocations, setFilterYear } from '../redux/actions/readLocations';

import { Routes, scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

import { Moment } from '../global/utils';

import grayImage from '../imgs/marker-icon-gray.png';
import greenImage from '../imgs/marker-icon-green.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnMore: {
    color: colors.flatBlue,
    textDecorationLine: 'underline'
  },
  location: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(14),
    color: colors.black,
  },
  date: {
    color: colors.black,
    fontSize: scale(17),
  },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    paddingBottom: 0,
  },
  filterButton: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'red',
    borderRadius: 3,
    marginBottom: 10,
  },
  buttonEnabled: {
    backgroundColor: '#FFCE62',
  },
  buttonDisabled: {
    backgroundColor: '#C0BAB6',
  },
  label: {
    color: '#111111',
    fontSize: 18,
  },
  markerImage: {
    width: 26,
    height: 41,
  }
});

// Default coordinates for the map, if they do not exist and geolocation does not immediately appear, errors will occur

// const latitudeDelta = 0.3767730706970411;
// const longitudeDelta = 0.294662356863725;

const latitudeDelta = 0.01;
const longitudeDelta = 0.01;

const mapStateToProps = (state) => {
  const { readLocations } = state;
  const { locations, availableYears, selectedYears } = readLocations;
  console.log('LOC', locations);
  const filteredLocations = locations.filter(
    ({ date }) => (date && Number(Moment(date).format('YYYY'))
      && selectedYears.indexOf(Number(Moment(date).format('YYYY'))) >= 0)
  );

  return {
    ...readLocations,
    availableYears,
    filteredLocations,
  };
};

@connect(mapStateToProps, dispatch => bindActionCreators({
  getLocations,
  setFilterYear,
}, dispatch))

export default class ReadLocations extends Component {
  static navigationOptions = {
    title: Routes.readLocation.title.localized,
    headerTitleStyle: {
      textAlign: 'center',
      width: Dimensions.get('window').width - scale(120),
    },
  };

  static propTypes = {
    setFilterYear: PropTypes.func.isRequired,
    getLocations: PropTypes.func.isRequired,
    selectedYears: PropTypes.arrayOf(PropTypes.number),
    availableYears: PropTypes.arrayOf(PropTypes.number),
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    filteredLocations: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    availableYears: PropTypes.arrayOf(PropTypes.number),
  };

  constructor(props) {
    super(props);
    this.state = {

      // region: {
      //   latitude: 60.491403,
      //   longitude: 8.391523,
      //   latitudeDelta: 0.3767730706970411,
      //   longitudeDelta: 0.294662356863725,
      // },
      // initialPosition: {
      //   latitude: 60.491403,
      //   latitude: 50.491403,
      //   longitude: 8.391523,
      //   latitudeDelta: 0.3767730706970411,
      //   longitudeDelta: 0.294662356863725,
      // }
    };
  }

  disableBackButton = () => {
    return true;
  };

  getLoc = () => {
    this.props.getLocations();
  };

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.disableBackButton);
  }

  componentDidMount() {
    // Receiving points from the server
    // this.props.getLocations();
    this.getLoc();
    // When opening a scene, it requests the current geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const initialPosition = { latitude, longitude, latitudeDelta, longitudeDelta };
        this.setState({ initialPosition }, () => { BackAndroid.removeEventListener('hardwareBackPress', this.disableBackButton); });
      });
    // Begins to monitor the change in geolocation
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      const region = { latitude, longitude, latitudeDelta, longitudeDelta };
      this.setState({ region });
    });
  }

  componentWillUnmount() {
    // When the page closes, it stops monitoring the geolocation change
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    // When the map swype changes the region (that would not jump the map)
    this.setState({ region });
  }

  watchID: ?number = null;
  // Opens a detailed description of the point
  openLog = id => this.props.navigation.navigate(Routes.moth.name, { id });

  // The function adds points to the map
  renderPoint = (point, index) => {
    const { _id, latitude, longitude, identification, comments, date } = point;
    const readableDate = Moment(date).format('lll');

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
          style={{ zIndex: index }}
        >
          <Image
            source={greenImage}
            style={[styles.markerImage, { zIndex: index }]}
          />
          <MapView.Callout
            onPress={() => this.openLog(_id)}
            style={{ flex: -1, position: 'absolute', minWidth: 150, minHeight: 60 }}
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
    } else if (identification !== 'correct') {
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
          style={{
            zIndex: index,
          }}
        >
          <Image
            source={grayImage}
            style={[styles.markerImage, { zIndex: index }]}
          />
          <MapView.Callout
            onPress={() => {}}
            style={{ flex: -1, position: 'absolute', minWidth: 150, minHeight: 60 }}
          >
            <View>
              <Text>{newText}</Text>
              <Text style={styles.date}>{readableDate}</Text>
              <Text style={styles.location}>{latitude}, {longitude}</Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      );
    }
  };

  render() {
    const { availableYears, filteredLocations, selectedYears } = this.props;
    const { initialPosition, region } = this.state;

    return (
        <MapView
          initialRegion={initialPosition}
          // region={region}
          style={styles.container}
          mapType={'hybrid'}
          onRegionChange={e => this.onRegionChange(e)}
          showsUserLocation
          showsMyLocationButton
          cacheEnabled={isAndroid}
        >
          {filteredLocations.map((item, index) => (
           this.renderPoint(item, index)
          ))}
          <View style={styles.filterContainer}>
            {
              availableYears.map(year => (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    (selectedYears.indexOf(year) >= 0
                        ? styles.buttonEnabled
                        : styles.buttonDisabled
                    )
                  ]}
                  key={year}
                  onPress={() => this.props.setFilterYear(year)}
                >
                  <Text style={styles.label}>{year}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </MapView>
    );
  }
}

ReadLocations.defaultProps = {
  filterYear: null,
  availableYears: [],
};
