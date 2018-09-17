import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
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
    flex: 1,
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
    color: colors.black,
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
  ...finalize
}), dispatch => bindActionCreators({
  setFinalize,
  uploadPhoto,
}, dispatch))
export default class Finalize extends Component {

  static navigationOptions = {
    title: Routes.finalize.title.localized,
    headerTitleStyle: {
      textAlign: 'center',
      width: Dimensions.get('window').width - scale(120),
    },
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
      }),
    }).isRequired,
    date: PropTypes.string.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    modal: PropTypes.bool.isRequired,
    comment: PropTypes.string.isRequired,
    setFinalize: PropTypes.func.isRequired,
    uploadPhoto: PropTypes.func.isRequired,
    imgUri: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // team: PropTypes.string.isRequired,
    // email: PropTypes.string.isRequired
  };

  static defaultProps = {
    latitude: null,
    longitude: null,
    timestamp: ''
  };

  constructor() {
    super();
    this.state = {
      name: '',
      team: '',
      email: '',
    };
  }

  componentWillMount() {
    this.props.setFinalize({ comment: '' });
    const { name, team, email } = this.props.options;
    this.setState({
      name,
      team,
      email,
    });
  }

  changeNameField = (text = '') => {
    this.props.setFinalize({ name: text });
  }

  changeTeamField = (text = '') => {
    this.props.setFinalize({ team: text });
  }

  changeEmailField = (text = '') => {
    this.props.setFinalize({ email: text });
  }

  render() {
    let {
      navigation,
      date,
      latitude,
      longitude,
      comment,
      modal,
      imgUri,
      setFinalize,
      uploadPhoto,
      name,
      team,
      email,
    } = this.props;

    if (name === undefined) {
      name = this.state.name;
    }
    if (team === undefined) {
      team = this.state.team;
    }
    if (email === undefined) {
      email = this.state.email;
    }
    // Opens a comment editing window
    const openEditor = show => setFinalize({ modal: show });
    // Go to map for geolocation mark
    const openMap = () => {
      navigation.navigate(Routes.addLocation.name, { longitude, latitude, fixed: false });
    };

    return (
      <KeyboardAwareScrollView
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: imgUri }}
            resizeMode={'contain'}
            style={styles.photo}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.data}>{Moment(date).format('lll')}</Text>
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
              onChangeText={text => this.changeNameField(text)}
              clear={() => this.changeNameField()}
              clearBtn={name !== ''}
              value={name}
            />
            <Input
              placeholder={'Team (optional)'.localized}
              onChangeText={text => this.changeTeamField(text)}
              clear={() => this.changeTeamField()}
              clearBtn={team !== ''}
              value={team}
            />
            <Input
              placeholder={'Email (optional)'.localized}
              type={'email-address'} styleInput={styles.inputEmail}
              onChangeText={text => this.changeEmailField(text)}
              clear={() => this.changeEmailField()}
              clearBtn={email !== ''}
              value={email}
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
