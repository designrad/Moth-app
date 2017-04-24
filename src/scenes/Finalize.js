import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFinalize, uploadPhoto } from '../redux/actions/finalize';

import { Routes, scale, scaleByVertical, screenWidth } from '../global/constants';
import { colors } from '../global';
import { Moment } from '../global/utils';
import LocationButton from '../components/LocationButton';
import CommentButton from '../components/CommentButton';
import Input from '../components/Input';
import SendButton from '../components/SendButton';
import CommentEditor from '../components/CommentEditor';


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
    alignItems: 'center'
  },
  data: {
    fontSize: scale(17)
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

@connect(({ finalize }) => ({
  ...finalize,
}), dispatch => bindActionCreators({
  setFinalize,
  uploadPhoto,
}, dispatch))
export default class Finalize extends Component {

  static navigationOptions = {
    title: Routes.finalize.title.localized
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
      }),
    }).isRequired,
    data: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    modal: PropTypes.bool.isRequired,
    comment: PropTypes.string.isRequired,
    setFinalize: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired
  };

  static defaultProps = {
    latitude: null,
    longitude: null
  };

  render() {
    const {
      navigation,
      data,
      timestamp,
      latitude,
      longitude,
      comment,
      modal,
      setFinalize,
      uploadPhoto
    } = this.props;
    const dataTime = Moment(timestamp).format('lll');
    const openEditor = show => setFinalize({ modal: show });
    const openMap = () => {
      navigation.navigate(Routes.addLocation.name, { longitude, latitude, fixed: false });
    };
    return (
      <KeyboardAwareScrollView
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${data}` }}
            style={styles.photo}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.data}>{dataTime}</Text>
            <LocationButton
              longitude={longitude}
              latitude={latitude}
              onPress={openMap}
              onPressNolocation={openMap}
            />
            <CommentButton
              onPress={() => openEditor(true)}
              text={comment}
            />
            <Input
              placeholder={'Name (optional)'.localized}
              styleInput={styles.inputName}
              onChangeText={text => setFinalize({ name: text })}
            />
            <Input
              placeholder={'Team (optional)'.localized}
              onChangeText={text => setFinalize({ team: text })}
            />
            <Input
              placeholder={'Email (optional)'.localized}
              type={'email-address'} styleInput={styles.inputEmail}
              onChangeText={text => setFinalize({ email: text })}
            />
          </View>
          <View style={styles.bottomContainer}>
            <SendButton longitude={longitude} latitude={latitude} onPress={uploadPhoto} />
          </View>
        </View>
        <CommentEditor
          show={modal}
          close={() => openEditor(false)}
          value={comment}
          onChangeText={text => setFinalize({ comment: text })}
        />
      </KeyboardAwareScrollView>
    );
  }
}
