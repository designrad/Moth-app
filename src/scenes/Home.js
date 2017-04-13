import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from '../redux/actions/navigation';
import { colors, styles } from '../global';

@connect(
  state => ({}),
  dispatch => bindActionCreators({ push }, dispatch)
)
export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{backgroundColor: colors.flatBlue, borderRadius: 6}} onPress={() => push(RouteTypes.COUNTER)}>
          <Text style={{margin: 12, fontWeight: 'bold', color: 'black'}}>Redux Counter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
