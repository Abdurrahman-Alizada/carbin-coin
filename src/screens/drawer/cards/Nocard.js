import React, {useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Button, List, Switch, Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const circleSize = 250;
export default function CreditCard({
  name,
  date,
  style,
  textColor = 'white',
  bgColor = '#0047cc',
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const dotStyle = [s.dot, {backgroundColor: textColor}];
  return (
    <View>
      <View style={[s.container, {backgroundColor: bgColor}, style]}>
        <View style={[s.bgCircle, s.rightBgCircle]} />
        <View style={[s.bgCircle, s.bottomBgCircle]} />
        <View style={s.logoContainer}>
          <View style={[s.circle, s.leftCircle]} />
          <View style={[s.circle, s.rightCircle]} />
        </View>

        <View style={s.footerContainer}>
          <Text style={[s.text, {color: textColor}]}>{name}</Text>
          <Text style={[s.text, {color: textColor}]}>{date}</Text>
        </View>
        <View style={s.cardNumberContainer}>
          <View style={s.cardNumberPart}>
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
          </View>

          <View style={s.cardNumberPart}>
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
          </View>
          <View style={s.cardNumberPart}>
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
          </View>

          <View style={s.cardNumberPart}>
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
            <View style={dotStyle} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[s.text, {color: textColor}]}>Your name</Text>
          <Text style={[s.text, {color: textColor}]}>11/30</Text>
        </View>
      </View>

      <View style={{padding: '6%', paddingTop: '10%'}}>
        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '800'}}>
          You have no card yet

        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', marginTop: '4%'}}>
          Caribbean cards are designed for people who want their money to work
          harder for them. Start spending your funds anywhere in the world.
        </Text>
      </View>

      <View style={{padding: '5%'}}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{borderRadius: 40, height: 'auto'}}>
          <Button
            icon="credit-card"
            mode="contained"
            style={{
              backgroundColor: 'transparent',
              height: 'auto',
            }}
            contentStyle={{padding:"2%"}}
            theme={{roundness: 10}}
            labelStyle={{color: theme.colors.surface}}
            onPress={() => navigation.navigate('NewCard')}>
            Get card
          </Button>
        </LinearGradient>
        <Button
          icon="arrow-top-right"
          mode="text"
          style={{
            marginTop: '5%',
            height: 'auto',
          }}
          contentStyle={{padding:"2%"}}
          theme={{roundness: 10}}
          >
          Learn more
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: '90%',
    marginTop: '4%',
    alignSelf: 'center',
    position: 'relative',
  },
  logoContainer: {position: 'relative', marginBottom: 24},
  circle: {width: 34, height: 34, borderRadius: 17},
  rightCircle: {backgroundColor: '#f9a000', position: 'absolute', left: 20},
  leftCircle: {backgroundColor: '#ed0006', zIndex: 999},
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardNumberPart: {flexDirection: 'row'},
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 16,
    letterSpacing: 0.53,
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.05,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize,
  },
  rightBgCircle: {
    top: (-1 * circleSize) / 4,
    right: (-1 * circleSize) / 2,
  },
  bottomBgCircle: {
    bottom: (-1 * circleSize) / 2,
    left: (0 * (-1 * circleSize)) / 2,
  },
});
