import {View} from 'react-native';
import React from 'react';
import {Appbar, Avatar, Button, Text, useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';

const NewCard = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
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
            width: '95%',
          }}>
          {t("At the moment you can not add any more cards.")}
        </Text>
      </View>
      <ButtonLinearGradient style={{width:"80%", alignSelf:"center", marginTop:"5%"}}>

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
          {t("Go back")}
        </Button>
      </ButtonLinearGradient>
      
    </View>
  );
};

export default NewCard;
