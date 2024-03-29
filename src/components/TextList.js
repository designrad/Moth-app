import React  from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../global';
import { scale, scaleByVertical } from '../global/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  simbol: {
    color: colors.black,
    fontSize: scale(18),
    lineHeight: 21,
  },
  text: {
    flex: 1,
    color: colors.black,
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
