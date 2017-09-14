import React  from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import { scale, scaleByVertical } from '../global/constants';
import { colors } from '../global';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteOrange,
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: colors.gray,
    paddingLeft: scale(11),
    flexDirection: 'row',
    width: scale(295)
  },
  input: {
    fontSize: scale(14),
    width: scale(258),
    height: scaleByVertical(39)
  },
  icon: {
    fontSize: scale(14),
    color: colors.backgroundBtn,
  },
  clearBtn: {
    justifyContent: 'center',
    paddingRight: scale(15)
  }
});

export default function Input(props) {
  const { placeholder, styleInput, type, clear, clearBtn } = props;
  return (
    <View style={[styles.container, styleInput]}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        multiline={false}
        placeholder={placeholder}
        maxLength={40}
        keyboardType={type}
        disableFullscreenUI={false}
        underlineColorAndroid={colors.transparent}
        {...props}
      />
      {clearBtn && <TouchableOpacity onPress={clear} style={styles.clearBtn}>
        <AIcon name={'times'} style={styles.icon} />
      </TouchableOpacity>}
    </View>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  styleInput: View.propTypes.style,
  type: PropTypes.string,
  clear: PropTypes.func.isRequired,
  clearBtn: PropTypes.bool.isRequired
};

Input.defaultProps = {
  styleInput: {},
  type: 'default'
};
