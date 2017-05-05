import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    color: colors.black,
    fontSize: scale(36)
  },
  label: {
    color: colors.black,
    marginLeft: scale(15),
    fontSize: scale(22),
    fontWeight: '500'
  }
});
// Button with icon
export default function Button(props) {
  const { onPress, icon, title, style } = props;
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <AIcon name={icon} style={styles.icon} />
      <Text style={styles.label}>{title.localized}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: View.propTypes.style,
};

Button.defaultProps = {
  style: {}
};
