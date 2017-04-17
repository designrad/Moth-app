import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Routes, scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';
import { Moment } from '../global/utils';
import LocationButton from '../components/LocationButton';
import CommentButton from '../components/CommentButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});


export default class Finalize extends Component {
  static navigationOptions = {
    title: Routes.finalize.title
  };
  render() {
    const { state } = this.props.navigation;
    const { source } = state.params;
    const { data, timestamp, latitude, longitude } = source;
    console.log('finalize', timestamp);
    const dataTime = Moment(timestamp).format('lll');
    return (
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
            onPressNolocation={() => {}}
          />
          <CommentButton
            onPress={() => {}}
            text={'amdslkdjaskjdljals'}
          />
        </View>
      </View>
    );
  }
}
