import {
  Platform,
  Animated,
  Image,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  Button,
  Portal,
  Text,
  Dialog,
  Paragraph,
  useTheme,
} from 'react-native-paper';

export const CELL_SIZE = 50;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
// export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const NOT_EMPTY_CELL_BG_COLOR = '#fff';
export const ACTIVE_CELL_BG_COLOR = '#d8dce3';

const {Value, Text: AnimatedText} = Animated;

const TwoFAConfirm = ({navigation, route}) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [visible, setVisible] = useState(false);
  const [isDisabled, setDisibility] = useState(true);
  const [message, setMessage] = useState('Something went wrong');

  const verify = () => {
    setDisibility(true);
  };

  useEffect(() => {
    if (value.length === 5) {
      setDisibility(false);
    } else {
      setDisibility(true);
    }
  }, [value]);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        secureTextEntry={false}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: '5%',
        paddingHorizontal: '2%',
      }}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>OTP verification error</Dialog.Title>
          <Dialog.Content>
            <Paragraph> {message} </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor={theme.colors.tertiary}
              onPress={() => setVisible(false)}>
              close
            </Button>
            <Button
              onPress={() => {
                setVisible(false);
                setDisibility(false);
                navigation.navigate('ForgotPassword');
              }}>
              Try again
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View>
        <Image
          style={{
            width: 227 / 2.4,
            height: 190 / 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5%',
          }}
          source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
        />
        <Text style={{fontSize: 20, textAlign: 'center', marginTop: '5%'}}>
          2FA
        </Text>
        <Text style={styles.subTitle}>
          To confirm the operation enter the 6-digit code from
          Authenticatoriljgs;
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={{
            height: CELL_SIZE,
            marginTop: 30,
            paddingHorizontal: 5,
            justifyContent: 'center',
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>
      <Button
        disabled={isDisabled}
        style={{
          margin: 30,
          justifyContent: 'center',
          // minWidth: 300,
        }}
        contentStyle={{padding: '2%'}}
        //   buttonStyle={{padding: '1%'}}
        theme={{roundness: 10}}
        mode="contained"
        onPress={verify}>
        Next
      </Button>
    </SafeAreaView>
  );
};

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const styles = StyleSheet.create({
  cell: {
    marginHorizontal: 3,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#665a6f',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
});

export default TwoFAConfirm;
