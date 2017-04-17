import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, scaleByVertical } from '../global/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  simbol: {
    fontSize: scale(18),
    lineHeight: 21,
  },
  text: {
    flex: 1,
    fontSize: scale(18),
    lineHeight: 21,
    marginBottom: scaleByVertical(15)
  }
});
export default function TextList(props) {
  const { text } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.simbol}>• </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

TextList.propTypes = {
  text: PropTypes.string.isRequired
};
