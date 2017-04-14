import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../global';
import { scale } from '../global/constants';

const styles = StyleSheet.create({
  button: {
    width: scale(337),
    height: scale(64),
    backgroundColor: colors.orange,
    borderRadius: scale(8),
    borderWidth: scale(3),
    borderColor: colors.liteOrange,
    paddingLeft: scale(20),
    paddingVertical: scale(11),
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    fontSize: scale(36)
  },
  label: {
    marginLeft: scale(15),
    fontSize: scale(22),
    fontWeight: '500'
  }
});

export default function Button(props) {
  const { onPress, icon, text } = props;
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <AIcon name={icon} style={styles.icon} />
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
