import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Dimensions, BackHandler, BackAndroid } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPhotoStatus } from '../redux/actions/log';
import { setFinalize, uploadPhoto } from '../redux/actions/finalize';

import { Routes, scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';
import DisclosureButton from '../components/DisclosureButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    //paddingLeft: scale(16),
    //paddingVertical: scaleByVertical(5),
  }
});

@connect(({ log, app }) => ({
  ...log,
  ...app
}), dispatch => bindActionCreators({
  getPhotoStatus,
  setFinalize,
  uploadPhoto
}, dispatch))

export default class Log extends Component {

  static navigationOptions = {
    title: Routes.log.title.localized,
    headerTitleStyle: {
      textAlign: 'center',
      width: Dimensions.get('window').width - scale(120),
    },
  };

  static propTypes = {
    getPhotoStatus: PropTypes.func.isRequired,
    setFinalize: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.shape({}),
      navigate: PropTypes.func.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentWillMount() {
    this.getLogs();
  }

  // Server request
  getLogs = () => {
    this.props.getPhotoStatus();
  };

  // Sends an old photo (not sent) to the server
  sendOld = (log) => {
    const { setFinalize, uploadPhoto } = this.props;
    setFinalize({
      date: log.date,
      latitude: log.latitude,
      longitude: log.longitude,
      name: log.name,
      team: log.team,
      email: log.email,
      comment: log.comment,
      imgUri: log.imgUri,
      imgName: log.imgName,
    });
    uploadPhoto();
  };

  openLog = id => this.props.navigation.navigate(Routes.moth.name, { id });

  renderRefresh = (
    <RefreshControl
      refreshing={this.props.isLoading}
      onRefresh={this.getLogs}
    />
  );

  render() {
    const { photos } = this.props;
    if (!photos || !photos.length) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.header}>{'Submitted images'.localized}</Text>
          <Text style={styles.header}>{('Below is a list of all submitted images. ' +
          'If you don’t have network available, the images are saved in the app ' +
          'and will be uploaded later automatically when there’s network available. ' +
          'You can also re-send them manually.').localized}</Text>
        </View>
        {photos.length > 0 &&
        <ScrollView
          style={styles.scroller}
          refreshControl={
            this.renderRefresh
          }
        >
          {/* Outputs logs sent and not sent, then sorts by date */}
          {photos
            .sort((a, b) => {
              if (a.date < b.date) return 1;
              return -1;
            })
            .map(item => (
              <DisclosureButton
                status={item.identification || ''}
                date={item.date}
                onPress={item.id ? () => { this.openLog(item.id); } :
                () => { this.sendOld(item); }}
                comment={item.comments || item.comment}
                key={item.id || item.latitude}
              />
          ))}
        </ScrollView>
        }
      </View>
    );
  }
}
