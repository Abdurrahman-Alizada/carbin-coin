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
import { useTranslation } from 'react-i18next';

const Index = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  
  const currentLanguage = useSelector(state => state.settings.currentLanguage);

  const changeLng = async lng => {
    setValue(lng);
    await AsyncStorage.setItem('currentLanguage', lng);
    dispatch(handleCurrentLanguage(lng));
    i18next.changeLanguage(lng).then(()=>{
      const l = i18n.language
      let isLangRTL = (l == "ar" || l == "ur")
      I18nManager.forceRTL(isLangRTL)
    })
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
