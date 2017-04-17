import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  location: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(14),
    color: colors.flatBlue,
    textDecorationLine: 'underline',
  },
  noLocation: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(14),
    color: colors.flatRed,
    textDecorationLine: 'underline',
  }
});

export default function LocationButton(props) {
  const { latitude, longitude, onPressNolocation, onPress } = props;
  if (!latitude || !longitude) {
    return (
      <Text
        onPress={onPressNolocation}
        style={styles.noLocation}
      >
        {'Add location'}
      </Text>
    );
  }
  return (
    <Text
      onPress={onPress}
      style={styles.location}
    >
      {`${latitude}, ${longitude}`}
    </Text>
  );
}

LocationButton.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onPressNolocation: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired
};

LocationButton.defaultProps = {
  latitude: null,
  longitude: null
};
