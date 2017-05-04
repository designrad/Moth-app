import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize } from '../redux/actions/finalize';
import { setApp } from '../redux/actions/app';

import Button from '../components/Button';
import { Moment } from '../global/utils';
import { colors, images } from '../global';
import { screenWidth, screenHeight, scale, Routes } from '../global/constants';
import TakeFotoButton from '../components/TakeFotoButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  background: {
    width: screenWidth,
    height: screenHeight
  },
  backgroundMoths: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight
  },
  itemContainer: {
    position: 'absolute',
    paddingTop: scale(54),
    alignItems: 'center',
    backgroundColor: colors.transparent
  },
  buttonsContainer: {
    marginTop: scale(20),
  }
});
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

@connect(({ finalize, app }) => ({
  ...finalize,
  ...app
}), dispatch => bindActionCreators({
  setFinalize,
  setApp
}, dispatch))

export default class Home extends Component {
  static navigationOptions = {
    headerVisible: false,
    title: Routes.home.title.localized
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({}),
      navigate: PropTypes.func.isRequired
    }).isRequired,
    setFinalize: PropTypes.func.isRequired,
    setApp: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    // Turn off the speaker if not turned off
    if (this.props.isLoading) {
      this.props.setApp({ isLoading: false });
    }
  }

  // open Learn more screen
  openLearnMore = () => this.props.navigation.navigate(Routes.learnMore.name);
  // open Log screen
  openLog = () => this.props.navigation.navigate(Routes.log.name);
  // open Confirmed observations screen
  openMap = () => this.props.navigation.navigate(Routes.readLocation.name);

  takePhoto = () => {
    ImagePicker.launchCamera(options, (response) => {
      this.sendPhoto(response);
    });
  };

  oldPhoto = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      this.sendPhotoLibrary(response);
    });
  };

  sendPhotoLibrary(response) {
    const dt = Moment().format();
    this.props.setFinalize();
    if (response.error) {
      return;
    } else if (response.didCancel) {
      return;
    }
    this.props.setFinalize({
      imgUri: response.uri,
      imgName: response.fileName,
      date: dt,
      latitude: response.latitude,
      longitude: response.longitude
    });
    this.props.navigation.navigate(Routes.finalize.name);
  }

  sendPhoto(response) {
    const dt = Moment().format();
    this.props.setFinalize();
    if (response.error) {
      return;
    } else if (response.didCancel) {
      return;
    }
    if (!response.latitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = position.coords;
          this.props.setFinalize({
            imgUri: response.uri,
            imgName: response.fileName,
            date: dt,
            latitude: pos.latitude,
            longitude: pos.longitude
          });
        });
    } else {
      this.props.setFinalize({
        imgUri: response.uri,
        imgName: response.fileName,
        date: dt,
        latitude: response.latitude,
        longitude: response.longitude
      });
    }
    this.props.navigation.navigate(Routes.finalize.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={images.background} style={styles.background} />
        <Image
          source={images.backgroundMoths}
          style={styles.backgroundMoths}
          resizeMode={Image.resizeMode.contain}
        />
        <View style={styles.itemContainer}>
          <TakeFotoButton image={images.photoMoth} onPress={this.takePhoto} />
          <Button icon={'picture-o'} title={'Send old photo'} onPress={this.oldPhoto} style={styles.buttonsContainer} />
          <Button icon={'map'} title={'Show map'} onPress={this.openMap} style={styles.buttonsContainer} />
          <Button icon={'info-circle'} title={'Learn more'} onPress={this.openLearnMore} style={styles.buttonsContainer} />
          <Button icon={'check-circle'} title={'Log'} onPress={this.openLog} style={styles.buttonsContainer} />
        </View>
      </View>
    );
  }
}
