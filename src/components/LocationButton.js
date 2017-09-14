import React  from 'react';
import PropTypes from 'prop-types';
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
    fontWeight: 'bold'
  },
  location2: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(14),
    color: 'black',
  },
});

export default function LocationButton(props) {
  const { latitude, longitude, onPressNolocation, onPress, noLink } = props;
  if (!latitude || !longitude) {
    return (
      <Text
        onPress={onPressNolocation}
        style={styles.noLocation}
      >
        {'Add location'.localized}
      </Text>
    );
  } else if (noLink) {
    return (
      <Text
        onPress={() => {}}
        style={styles.location2}
      >
        {`${latitude}, ${longitude}`}
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
  onPress: PropTypes.func.isRequired,
  noLink: PropTypes.boolean,
};

LocationButton.defaultProps = {
  latitude: null,
  longitude: null,
  noLink: false,
};
