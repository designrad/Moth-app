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
    height: scaleByVertical(245)
  },
  itemContainer: {
    paddingLeft: scale(30),
    paddingRight: scale(28),
    paddingTop: scaleByVertical(30)
  },
  header: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scaleByVertical(17)
  },
  text: {
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
    fontSize: scale(13)
  }
});

export default class LearnMore extends Component {
  static navigationOptions = {
    title: Routes.learnMore.title.localized
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={images.photoMoth} style={styles.img} />
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Målerjakt app'.localized}</Text>
          <Text style={styles.text}>
            {('The overarching goal of the project is to' +
            ' engage volunteer observers in a campaign to' +
            ' map the current distribution of scarce umber' +
            ' moth. In doing so, we hope to achieve a' +
            ' number of sub-goals:').localized}
          </Text>
          <TextList
            text={('To obtain an up-to-date overview of scarce' +
             ' umber moth presences north and east of the' +
              ' known front of spread of the species.').localized}
          />
          <TextList
            text={('To provide teachers with a low threshold' +
             ' opportunity for engaging school children in a' +
              ' practical educational activity which will' +
               ' contribute to generating real data.').localized}
          />
          <TextList
            text={('To provide a simple, fun and hands-on way' +
             ' of engaging the public in science, and through' +
              ' that influence public awareness and attitudes' +
               ' towards science.').localized}
          />
          <TextList
            text={('To gain valuable in-house experience in' +
             ' how simple apps can be designed and used in' +
              ' targeted surveys of biodiversity.').localized}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'Team Målerjakt'}</Text>
          <Text style={styles.text}>
            {('The overarching goal of the project is to' +
            ' engage volunteer observers in a campaign to' +
            ' map the current distribution of scarce umber' +
            ' moth. In doing so, we hope to achieve a ' +
            'number of sub-goals:').localized}
          </Text>
          <MembersList
            photo={images.photoJane}
            name={'Jane Uhd Jepsen'}
            position={'Senior Researcher'}
            institute={'Norwegian Institute for Nature Research (NINA)'}
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
            source={images.webLogo}
            style={styles.webLogo}
            resizeMode={Image.resizeMode.contain}
          />
          <Image
            source={images.framsenteretLogo}
            style={styles.framsenteretLogo}
            resizeMode={Image.resizeMode.contain}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.header}>{'App utvikling'.localized}</Text>
          <Text style={styles.text}>
            {('This app is produced for NINA by Designråd, Tromsø and' +
            ' all source code is open source and available on GitHub.').localized}
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
