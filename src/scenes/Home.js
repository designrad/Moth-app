import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from '../redux/actions/navigation';
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

@connect(
  state => ({}),
  dispatch => bindActionCreators({ push }, dispatch)
)
export default class Home extends Component {
  static navigationOptions = {
    header: {
      visible: false
    },
    title: Routes.home.title.localized
  };
  openLearnMore = () => this.props.navigation.navigate(Routes.learnMore.name);
  // TODO: fix clic 'cancel'
  takePhoto = () => {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response;
        this.props.navigation.navigate(Routes.finalize.name, { source });
      }
    });
  };

  oldPhoto = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response;
        this.props.navigation.navigate(Routes.finalize.name, { source });
      }
    });
  };
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
          <Button icon={'map'} title={'Show map'} onPress={() => {}} style={styles.buttonsContainer} />
          <Button icon={'info-circle'} title={'Learn more'} onPress={this.openLearnMore} style={styles.buttonsContainer} />
          <Button icon={'check-circle'} title={'Log'} onPress={() => {}} style={styles.buttonsContainer} />
        </View>
      </View>
    );
  }
}
