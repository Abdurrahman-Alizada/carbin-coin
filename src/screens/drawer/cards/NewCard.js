import {View} from 'react-native';
import React from 'react';
import {Appbar, Avatar, Button, Text, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const NewCard = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{}}>
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'New card'} />
      </Appbar.Header>

      <View style={{alignItems: 'center'}}>
        <Avatar.Icon
          size={100}
          icon="credit-card-clock"
          style={{backgroundColor: theme.colors.background}}
        />
        <Text
          style={{
            marginTop: '2%',
            fontSize: 20,
            textAlign: 'center',
            width: '80%',
          }}>
          At the moment you can not add any more cards.
        </Text>
      </View>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{
          borderRadius: 40,
          height: 'auto',
          width: '80%',
          alignSelf: 'center',
          marginTop: '5%',
        }}>
        <Button
          icon="arrow-left"
          mode="contained"
          style={{
            backgroundColor: 'transparent',
            height: 'auto',
          }}
          contentStyle={{padding: '2%'}}
          theme={{roundness: 10}}
          labelStyle={{color: theme.colors.surface}}
          onPress={() => navigation.goBack()}>
          Go back
        </Button>
      </LinearGradient>
    </View>
  );
};

export default NewCard;
