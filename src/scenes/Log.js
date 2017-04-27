import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPhotoStatus } from '../redux/actions/log';

import { Routes, scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';
import DisclosureButton from '../components/DisclosureButton';

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleByVertical(32),
    backgroundColor: colors.mainOrange
  },
  topContainer: {
    paddingHorizontal: scale(28),
    paddingBottom: scaleByVertical(16)
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
    paddingVertical: scaleByVertical(5),
  }
});
@connect(({ log }) => ({
  ...log,
}), dispatch => bindActionCreators({
  getPhotoStatus
}, dispatch))

export default class Log extends Component {
  static navigationOptions = {
    title: Routes.log.title.localized
  };
  static propTypes = {
    getPhotoStatus: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.shape({}),
      navigate: PropTypes.func.isRequired
    }).isRequired,
  };
  componentDidMount() {
    this.props.getPhotoStatus();
  }
  openLog = id => this.props.navigation.navigate(Routes.moth.name, { id });
  render() {
    const { photos } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.header}>{'Submitted images'.localized}</Text>
          <Text style={styles.header}>{('Below is a list of all submitted images. ' +
          'If you don’t have network available, the images are saved in the app ' +
          'and will be uploaded later automatically when there’s network available. ' +
          'You can also re-send them manually.').localized}</Text>
        </View>
        {photos.length > 0 && <ScrollView style={styles.scroller}>
          {photos.map((item, i) => (
            <DisclosureButton
              status={item.identification}
              date={item.date}
              onPress={() => this.openLog(item.id)}
              comment={item.comments}
              key={item.id}
              last={i === (photos.length - 1)}
            />
          ))}
        </ScrollView>
        }
      </View>
    );
  }
}
