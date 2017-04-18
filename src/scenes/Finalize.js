import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Routes, scale, scaleByVertical, screenWidth } from '../global/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

export default class Finalize extends Component {
  static navigationOptions = {
    title: Routes.finalize.title.localized
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      team: '',
      email: '',
      modal: false,
      comment: ''
    };
  }

  render() {
    const { navigation } = this.props;
    const { source } = navigation.state.params;
    const { data, timestamp, latitude, longitude } = source;
    const dataTime = Moment(timestamp).format('lll');
    const openEditor = show => this.setState({ modal: show });
    const openMap = () => navigation.navigate(Routes.addLocation.name)
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
              onPress={() => {}}
              onPressNolocation={openMap}
            />
            <CommentButton
              onPress={() => openEditor(true)}
              text={this.state.comment}
            />
            <Input
              placeholder={'Name (optional)'.localized}
              styleInput={styles.inputName}
              onChangeText={text => this.setState({ name: text })}
            />
            <Input
              placeholder={'Team (optional)'.localized}
              onChangeText={text => this.setState({ team: text })}
            />
            <Input
              placeholder={'Email (optional)'.localized}
              type={'email-address'} styleInput={styles.inputEmail}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.bottomContainer}>
            <SendButton longitude={longitude} latitude={latitude} onPress={() => {}} />
          </View>
        </View>
        <CommentEditor
          show={this.state.modal}
          close={() => openEditor(false)}
          value={this.state.comment}
          onChangeText={text => this.setState({ comment: text })}
        />
      </KeyboardAwareScrollView>


    );
  }
}
