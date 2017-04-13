/**
 * Created by Bardiaswift on 29/09/2016.
 */
import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const AlertTypes = {
  ok: 'ok',
  yesOrNo: 'yesOrNo'
};

const borderRadius = 3;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexDirection: 'column'
  },
  alert: {
    backgroundColor: 'white',
    marginHorizontal: 32,
    borderRadius,
    overflow: 'hidden'
  },
  textContainer: {
    paddingHorizontal: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  buttonsContainer: {
    height: 50,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  okButton: {
    backgroundColor: '#6BBF6F',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  },
  noButton: {
    backgroundColor: '#D9534F',
    borderBottomLeftRadius: borderRadius
  },
  yesButton: {
    backgroundColor: '#6BBF6F',
    borderBottomRightRadius: borderRadius
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
});

const Button = ({ style, onPress, children }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.4}>
    <Text style={styles.buttonText}>{children.localized}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  style: View.propTypes.style,
  onPress: PropTypes.func,
  children: PropTypes.string
};

Button.defaultProps = {
  style: {},
  onPress: () => {},
  children: ''
};

/**
 * @return {null} if not visible.
 */
export default function Alert ({
  visible,
  title,
  text,
  type,
  okHandler,
  noHandler,
  yesHandler,
  children
}) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.alert}>
        <View style={[styles.textContainer, { paddingVertical: title ? 16 : 24 }]}>
          {children || (
            <View>
              {title != null && <Text style={styles.title}>{title.localized}</Text>}
              <Text style={styles.text}>{text.localized}</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          {type === AlertTypes.ok ? (
              <Button style={styles.okButton} onPress={okHandler}>{'Ok'}</Button>
            ) : (
              <View style={styles.buttonsRow}>
                <Button style={styles.noButton} onPress={noHandler}>{'No'}</Button>
                <Button style={styles.yesButton} onPress={yesHandler}>{'Yes'}</Button>
              </View>
            )}
        </View>
      </View>
    </View>
  );
}

Alert.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf([
    AlertTypes.ok,
    AlertTypes.yesOrNo,
  ]),
  okHandler: PropTypes.func,
  noHandler: PropTypes.func,
  yesHandler: PropTypes.func,
  children: PropTypes.node
};

Alert.defaultProps = {
  visible: true,
  title: null,
  text: '',
  type: AlertTypes.ok,
  okHandler: () => {},
  noHandler: () => {},
  yesHandler: () => {},
  children: null
};
