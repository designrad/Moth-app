import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../global';
import { scale } from '../global/constants';

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
    backgroundColor: colors.orange,
    position: 'absolute',
    width: sizeContainer,
    bottom: scale(42),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainerAndroid: {
    backgroundColor: colors.transparent
  },
  text: {
    fontWeight: 'bold',
    fontSize: scale(30),
    textAlign: 'center'
  },
  textAndroid: {
    backgroundColor: colors.mainOrange
  }
});

export default function TakeFotoBtn(props) {
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
        <View style={[styles.textContainer, isAndroid && styles.textContainerAndroid]}>
          <Text style={[styles.text, isAndroid && styles.textAndroid]}>{'Take photo'.localized}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
TakeFotoBtn.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: Image.propTypes.source.isRequired
};
