import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Image, Text } from 'react-native';
import { colors, images } from '../global';
import { Routes, screenWidth, scale, scaleByVertical } from '../global/constants';
import TextList from '../components/TextList';
import MembersList from '../components/MembersList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainOrange
  },
  img: {
    width: screenWidth,
    height: scaleByVertical(302)
  },
  innerImg: {
    width: screenWidth,
    height: scaleByVertical(403)
  },
  textUnderlearnImage: {
    color: colors.black,
    fontSize: scale(14),
    marginTop: scaleByVertical(8),
    marginLeft: scale(19),
  },
  textUnderInnerImage: {
    marginTop: scaleByVertical(14),
    marginBottom: scaleByVertical(25),
    marginLeft: scaleByVertical(19),
  },
  itemContainer: {
    paddingLeft: scale(30),
    paddingRight: scale(28),
    paddingTop: scaleByVertical(30)
  },
  header: {
    color: colors.black,
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scaleByVertical(17)
  },
  text: {
    color: colors.black,
    fontSize: scale(18),
    lineHeight: 21,
    marginBottom: scaleByVertical(15)
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  webLogo: {
    width: scale(106),
    height: scaleByVertical(56),
    marginTop: scaleByVertical(6),
    marginBottom: scaleByVertical(23)
  },
  coatLogo: {
    width: scale(125),
    height: scaleByVertical(125),
    marginVertical: scaleByVertical(29),
  },
  tromsLogo: {
    width: scale(133),
    height: scaleByVertical(133),
    marginTop: scaleByVertical(37),
    marginBottom: scaleByVertical(37),
  },
  framsenteretLogo: {
    width: scale(253),
    height: scaleByVertical(44),
    marginBottom: scaleByVertical(23)
  },
  desingradLogo: {
    width: scale(219),
    height: scaleByVertical(48),
    marginTop: scaleByVertical(8)
  },
  mitAndGitLogo: {
    width: scale(167),
    height: scaleByVertical(48),
    marginTop: scaleByVertical(26)
  },
  bottomContainer: {
    paddingTop: scaleByVertical(78),
    paddingBottom: scaleByVertical(30),
    alignItems: 'center'
  },
  versionApp: {
    color: colors.black,
    fontSize: scale(13)
  },
  link: {
    color: colors.flatBlue,
    fontSize: scale(18),
    textDecorationLine: 'underline',
    marginBottom: scaleByVertical(26),
  }
});

export default class LearnMore extends Component {
  static navigationOptions = {
    title: Routes.learnMore.title.localized
  };
  // static screnn Learn More
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={images.learnImage} style={styles.img} />
        <Text style={styles.textUnderlearnImage}>Frostmåler larve på gren</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Facts about geometrid moths'.localized}</Text>
          <TextList
            text={('Geometrid moths is a group of butterflies named after the way they move. They are also called ‘measuring worms’ because it looks like they are measuring the surface they walk on.').localized}
          />
          <TextList
            text={('In the birch forests of northern Norway, Sweden and Finland, a few species of geometrids occurs regularly in very high densities. We call it a “moth outbreak” when all of a sudden the forest is crawling with larvae in summer.').localized}
          />
          <TextList
            text={('The birch forest moth larvae hatch from eggs when the birch leaves come out in early summer. They pupate in late summer and appears again as adults in autumn. At that time the adult moths are easy to find, as they are swarming, especially near garden lights.').localized}
          />
          <TextList
            text={('The moth larvae feed on the leaves from birch and other deciduous trees, as well as bilberry and shrubs on the ground. A large moth outbreak can kill both trees and shrubs.').localized}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Why are we mapping geometrids?'.localized}</Text>
          <Text style={styles.text}>
            {('During the last few decades moth outbreaks in the birch forest has occurred further north and further inland than previously. We think it is caused by a milder climate. It is therefore important to acquire updated information about the distribution of the moth species that cause outbreaks. The least known of the outbreaking moth species in the birch forest is the scarce umber moth (Agriopis aurantiaria). We know it has spread northwards as far as Troms. But exactly how far north and east is it present? Can it be found in inner parts of Troms? In Finnmark? In northernmost Sweden and Finland? We hope the app “Målerjakt” (Moth hunt”) and the efforts of many volunteer moth hunters will help answer these questions. We need your assistance!').localized}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Facts about the scarce umber moth'.localized}</Text>
          <TextList
            text={('The scarce umber moth is easy to recognize. The adult males have bright golden wings of a similar color as a birch leaf in autumn. Their wing span is 3-4 cm. They are attracted to light and can often be found near garden lights in the autumn (early September – well into October). ').localized}
          />
          <TextList
            text={('The female moths are rarely seen. They cannot fly and their wings are reduced to tiny stubs. If you are lucky, you might find females crawling the stems of birch trees on autumn nights on their way into the tree canopy to lay their eggs. ').localized}
          />
          <TextList
            text={('Scarce umber moth is distributed all over Norway as far as Troms. We assume that the species is spreading further north and east, but very few observations exist. The current known distribution in Norway can be found at the Norwegian Biodiversity Information Centre webpage.').localized}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.link}>http://artsdatabanken.no/Pages/144194</Text>
        </View>
        <Image source={images.learnImage2} style={styles.innerImg} />
        <Text style={styles.textUnderInnerImage}>Scarce umber moth male</Text>
        <Image source={images.learnImage3} style={styles.innerImg} />
        <Text style={[styles.textUnderInnerImage, { marginBottom: scaleByVertical(0) }]}>Scarce umber moth male</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'How can you contribute?'.localized}</Text>
          <Text style={styles.text}>
            {('Download the app Målerjakt and let the hunt begin! Search near garden lights on your house, your cabin, on your way to school, or anywhere you go. When you find a moth you believe to be the scarce umber moth, take a picture with the app and send it. If you are unsure whether it is the right species, send it anyway. All pictures will be checked by an expert, and only those that are certain to be scarce umber moth are added as new records. Visit the map in Målerjakt to see how your observations help us a better picture of the distribution of scarce umber moth in the northern birch forests. If you give your name and email when you submit pictures, you will receive our newsletter with updates on the progress of the hunt.').localized}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Team Målerjakt'}</Text>
          <Text style={styles.text}>
            {('Meet the team behind Målerjakt app!').localized}
          </Text>
          <MembersList
            photo={images.photoJane}
            name={'Jane Uhd Jepsen'}
            position={'Senior Researcher'}
            institute={'Norwegian Institute for Nature Research (NINA)'}
            email={'jane.jepsen@nina.no'}
          />
          <MembersList
            photo={images.photoIngrid}
            name={'Ingrid Jensvoll'}
            position={'Senior Researcher'}
            institute={'Norges arktiske universitet (UIT)'}
            email={'jane.jepsen@nina.no'}
          />
          <MembersList
            photo={images.photoPetter}
            name={'Ole Petter Laksforsmo Vindustad'}
            position={'Postdoktor'}
            institute={'Arctic University of Norway (UIT)'}
            email={'ole.p.vindstad@uit.no'}
          />
          <MembersList
            photo={images.photoMalin}
            name={'Malin Ek'}
            position={'PhD student'}
            institute={'Arctic University of Norway (UIT)'}
            email={'malin.ek@uit.no'}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Sponsors and financing'.localized}</Text>
          <Text style={styles.text}>{'This app is sponsored by:'.localized}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={images.framsenteretLogo}
            style={styles.framsenteretLogo}
            resizeMode={Image.resizeMode.contain}
          />
          <Image
            source={images.coatLogo}
            style={styles.coatLogo}
            resizeMode={Image.resizeMode.contain}
          />
          <Image
            source={images.webLogo}
            style={styles.webLogo}
            resizeMode={Image.resizeMode.contain}
          />
          <Image
            source={images.tromsLogo}
            style={styles.tromsLogo}
            resizeMode={Image.resizeMode.contain}
          />
          
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'App development'.localized}</Text>
          <Text style={styles.text}>
            {('This app is produced for COAT by Designråd, Tromsø. This app is open sourced and all code is available on GitHub.').localized}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={images.desingradLogo}
            style={styles.desingradLogo}
            resizeMode={Image.resizeMode.contain}
          />
          <Image
            source={images.mitAndGitLogo}
            style={styles.mitAndGitLogo}
            resizeMode={Image.resizeMode.contain}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.versionApp}>App version 1.0.2</Text>
        </View>
      </ScrollView>
    );
  }
}
