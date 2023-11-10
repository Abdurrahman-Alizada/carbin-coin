
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

export default function CustomNavigationBar({ navigation, back, title }) {
  const theme = useTheme()
   const {t} = useTranslation()
  return (
      <Appbar.Header style={{backgroundColor: theme.colors.background}}  >
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={t(title)} />
      </Appbar.Header>
    );
  }