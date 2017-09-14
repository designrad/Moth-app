import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../global';
import { scaleByVertical } from '../global/constants';

const styles = StyleSheet.create({
  container: {
    paddingRight: scaleByVertical(16)
  },
  text: {
    color: isAndroid ? colors.mainOrange : colors.white,
    fontSize: 17
  }
});

export default function SaveButton(props) {
  const { onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.text}>{'Save'.localized}</Text>
    </TouchableOpacity>
  );
}

SaveButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
