import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text, AsyncStorage, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Routes, scale, scaleByVertical, screenWidth } from '../global/constants';
import { colors} from '../global';
import DisclosureButton from '../components/DisclosureButton';

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleByVertical(32),
    backgroundColor: colors.mainOrange
  },
  topContainer: {
    paddingHorizontal: scale(28)
  },
  header: {
    color: colors.black,
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: scaleByVertical(13)
  },
  text: {
    color: colors.black,
    fontSize: scale(14)
  },
  scroller: {
    backgroundColor: colors.whiteOrange,
    borderWidth: scale(0.5),
    borderColor: colors.borderGray,
    paddingLeft: scale(16),
    paddingVertical: scaleByVertical(5)
  }
});

export default class Log extends Component {
  static navigationOptions = {
    title: Routes.log.title.localized
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.header}>{'Submitted images'.localized}</Text>
          <Text style={styles.text}>{('Below is a list of all submitted images.' +
          'If you don’t have network available, the images are saved in the app' +
          'and will be uploaded later automatically when there’s network' +
          'available. You can also re-send them manually.').localized}</Text>
        </View>
        <ScrollView style={styles.scroller}>
          <DisclosureButton onPress={ () => {}}/>
        </ScrollView>
      </View>
    );
  }
}
