import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List, Switch, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const CardSettingIndex = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const [isLimit, setIsLimit] = useState(false);
  return (
    <View style={{marginTop: '5%', padding: '2%'}}>
      <List.Section>
        <List.Subheader style={{}}>{t('Card settings')}</List.Subheader>

        <List.Item
          title={'Set limit'}
          description={t('set a limit for spending')}
          onPress={() => {
            setIsLimit(!isLimit);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => (
            <List.Icon {...props} size={40} icon="timer-sand-paused" />
          )}
          right={props => (
            <Switch
              {...props}
              value={isLimit}
              onValueChange={() => setIsLimit(!isLimit)}
            />
          )}
        />

        <List.Item
          title={'Online payment'}
          description={t('Enable online transaction')}
          onPress={() => {
            setIsLimit(!isLimit);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="wifi" />}
          right={props => (
            <Switch
              {...props}
              value={isLimit}
              onValueChange={() => setIsLimit(!isLimit)}
            />
          )}
        />

        <List.Item
          title={'Freeze Card'}
          description={t('Temporay diable card usage')}
          onPress={() => {
            setIsLimit(!isLimit);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="lock" />}
          right={props => (
            <Switch
              {...props}
              value={isLimit}
              onValueChange={() => setIsLimit(!isLimit)}
            />
          )}
        />

        <List.Item
          title={'International payment'}
          description={t(
            "We'll access your location to prevent fraud operations",
          )}
          onPress={() => {
            setIsLimit(!isLimit);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="earth" />}
          right={props => (
            <Switch
              {...props}
              value={isLimit}
              onValueChange={() => setIsLimit(!isLimit)}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

export default CardSettingIndex;
