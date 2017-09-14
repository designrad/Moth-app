import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWarning: {
    paddingTop: scaleByVertical(12),
    fontSize: scale(14),
    color: colors.flatRed,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  button: {
    width: scale(350),
    height: scaleByVertical(60),
    borderRadius: scale(8),
    borderWidth: scale(3),
    marginTop: scaleByVertical(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  enabledBtn: {
    backgroundColor: colors.mainOrange,
    borderColor: colors.liteOrange
  },
  disabledBtn: {
    backgroundColor: colors.backgroundBtn,
    borderColor: colors.borderGray
  },
  icon: {
    color: colors.black,
    fontSize: scale(36)
  },
  labelBtn: {
    color: colors.black,
    fontSize: scale(22),
    paddingLeft: scale(15)
  },
  disableLabel: {
    color: colors.borderGray
  }
});

export default function SendButton(props) {
  const { latitude, longitude, onPress } = props;
  const disable = !latitude || !longitude;
  return (
    <View style={styles.container}>
      <Text style={styles.textWarning}>{disable ? 'Please add location to the image.'.localized : ''}</Text>
      <TouchableOpacity
        onPress={onPress}
        disabled={disable}
      >
        <View style={[styles.button, disable ? styles.disabledBtn : styles.enabledBtn]}>
          <AIcon name={'cloud-upload'} style={[styles.icon, disable && styles.disableLabel]} />
          <Text style={[styles.labelBtn, disable && styles.disableLabel]}>{'Send image'.localized}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

SendButton.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onPress: PropTypes.func.isRequired
};

SendButton.defaultProps = {
  latitude: null,
  longitude: null
};
