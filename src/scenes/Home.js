import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from '../redux/actions/navigation';
import { colors, images } from '../global';
import { screenWidth, screenHeight, scale } from '../global/constants';

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
  }
});

@connect(
  state => ({}),
  dispatch => bindActionCreators({ push }, dispatch)
)
export default class Home extends Component {
  takeFoto() {

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
          <TakeFotoButton image={images.fotoMoth} onPress={() => this.takeFoto()} />
        </View>
      </View>
    );
  }
}
