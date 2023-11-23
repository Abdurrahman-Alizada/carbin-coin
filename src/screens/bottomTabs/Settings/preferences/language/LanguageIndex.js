import {I18nManager, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  List,
  RadioButton,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import i18next, {languageResources} from '../../../../../../locales/i18next';
import {useSelector, useDispatch} from 'react-redux';
import languagesList from '../../../../../../locales/languagesList.json';
import {handleCurrentLanguage} from '../../../../../redux/reducers/settings/settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart'; // Import package from node modules

const Index = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const currentLanguage = useSelector(state => state.settings.currentLanguage);

  const changeLng = async lng => {
    const isNewLanguageRTL = i18next.dir(lng) === 'rtl';
    const isCurrentLayoutRTL = I18nManager.isRTL;
    const isLayoutChangeNeeded = isCurrentLayoutRTL !== isNewLanguageRTL;
    
    setValue(lng);
    await AsyncStorage.setItem('currentLanguage', lng);
    dispatch(handleCurrentLanguage(lng));
    i18next.changeLanguage(lng).then(async () => {
      const l = i18n.language;
      let isLangRTL = l == 'ar' || l == 'ur';
      I18nManager.forceRTL(isLangRTL);

      if (isLayoutChangeNeeded) {
        await AsyncStorage.setItem('isRTL', lng);
        RNRestart.restart();
      }
    });
  };
  const [value, setValue] = useState(currentLanguage);
  const theme = useTheme();

  return (
    <View
      style={{
        padding: '2%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <RadioButton.Group
        onValueChange={newValue => changeLng(newValue)}
        value={value}>
        <ScrollView>
          {Object.keys(languageResources)?.map((item, index) => (
            <RadioButton.Item
              key={index}
              label={languagesList[item].nativeName}
              value={item}
              onValueChange={() => changeLng(item)}
            />
          ))}
        </ScrollView>
      </RadioButton.Group>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
