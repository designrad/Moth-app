import React  from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../global';
import { scale, scaleByVertical } from '../global/constants';

const sizeContainer = scale(300);
const sizeImage = scale(286);

const styles = StyleSheet.create({
  takePhotoBtn: {
    width: sizeContainer,
    height: sizeContainer,
    borderRadius: sizeContainer / 2,
    paddingVertical: scale(14),
    paddingHorizontal: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  img: {
    width: sizeImage,
    height: sizeImage,
    borderRadius: sizeImage / 2
  },
  textContainer: {
    height: scale(63),
    backgroundColor: colors.transparent,
    position: 'absolute',
    width: sizeContainer,
    bottom: scaleByVertical(38),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainerAndroid: {
    backgroundColor: colors.transparent
  },
  text: {
    fontWeight: 'bold',
    fontSize: scale(30),
    textAlign: 'center',
    color: colors.black
  },
  textAndroid: {
    color: colors.mainOrange
  }
});

export default function TakePhotoBtn(props) {
  const { onPress, image } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[colors.liteOrange, colors.orange]}
        style={styles.takePhotoBtn}
      >
        <Image
          source={image}
          style={styles.img}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{'Take photo'.localized}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
TakePhotoBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: Image.propTypes.source.isRequired
};
