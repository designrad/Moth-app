import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Text, Dimensions, BackAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyPhoto } from '../redux/actions/moth';
import { setApp } from '../redux/actions/app';


import { Routes, scale, scaleByVertical, screenWidth, ipServer } from '../global/constants';
import { colors } from '../global';
import { Moment } from '../global/utils';
import LocationButton from '../components/LocationButton';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.mainOrange,
  },
  container: {
    backgroundColor: colors.mainOrange,
    paddingTop: scaleByVertical(11),
    alignItems: 'center'
  },
  photo: {
    width: scale(381),
    height: scaleByVertical(201)
  },
  itemContainer: {
    paddingTop: scaleByVertical(19),
    paddingHorizontal: scale(20),
    alignItems: 'center'
  },
  data: {
    color: colors.black,
    fontSize: scale(17)
  },
  comment: {
    color: colors.black,
    paddingTop: scaleByVertical(12),
    paddingRight: scale(4),
    fontSize: scale(13)
  },
  inputName: {
    marginTop: scaleByVertical(20),
    marginBottom: scaleByVertical(11)
  },
  inputEmail: {
    marginTop: scaleByVertical(11),
    marginBottom: scaleByVertical(35)
  },
  bottomContainer: {
    backgroundColor: colors.flatBlack,
    width: screenWidth,
    height: scaleByVertical(175),
    alignItems: 'center'
  }
});

@connect(({ moth }) => ({
  ...moth,
}), dispatch => bindActionCreators({
  getMyPhoto,
  setApp
}, dispatch))
export default class Moth extends Component {

  static navigationOptions = {
    //title: Routes.moth.title.localized,
    title: 'Målerjakt',
    headerTitleStyle: {
      textAlign: 'center',
      width: Dimensions.get('window').width - scale(120),
    },
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string.isRequired
        })
      }),
      navigate: PropTypes.func.isRequired
    }).isRequired,
    setApp: PropTypes.func.isRequired,
    getMyPhoto: PropTypes.func.isRequired,
    image: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    latitude: null,
    longitude: null
  };

  componentWillMount() {
    const { getMyPhoto, navigation: { state } } = this.props;
    getMyPhoto(state.params.id); // Request from the server a detailed description of the photo
  }

  foo = () => {
    return true;
  }

  onLoadStart = () => {
     const {
      setApp
    } = this.props;
    setApp({ isLoading: true });
    BackAndroid.addEventListener('hardwareBackPress', this.foo);
  }

  onLoadEnd = () => {
     const {
      setApp
    } = this.props;
    setApp({ isLoading: false });
    BackAndroid.removeEventListener('hardwareBackPress', this.foo);
  }

  render() {
    console.log(this.props);
    const {
      navigation,
      image,
      setApp
    } = this.props;
    const longitude = parseFloat(image.longitude);
    const latitude = parseFloat(image.latitude);
    const dataTime = Moment(image.date).format('lll');
    const openMap = () => {
      navigation.navigate(Routes.addLocation.name, { longitude, latitude, fixed: true });
    };
    return (
      <KeyboardAwareScrollView
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: `http://${ipServer}/image/${[image.name]}` }}
            style={styles.photo}
            resizeMode={'contain'}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.data}>{dataTime}</Text>
            <LocationButton
              noLink
              longitude={longitude}
              latitude={latitude}
              onPress={openMap}
              onPressNolocation={openMap}
            />
            <Text style={styles.comment}>{image.comments}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
