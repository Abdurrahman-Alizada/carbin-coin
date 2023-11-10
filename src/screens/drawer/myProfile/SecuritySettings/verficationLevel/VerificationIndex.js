import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Chip, Text, Button, List, useTheme} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
const VerificationIndex = () => {
  const theme = useTheme()
  const {t} = useTranslation();
  return (
    <View style={{padding: '3%', backgroundColor:theme.colors.background, flex:1}}>
      <View
        style={{
          marginHorizontal: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>{t("Your status")}</Text>
        <Chip
          icon="information-outline"
          mode="outlined"
          onPress={() => console.log('Pressed')}>
          {t("Not verified")}
        </Chip>
      </View>

      <Card mode="outlined" style={{marginTop: '7%'}}>
        <Card.Title title={t("Verification method")} />
        <Card.Content>
          <Button
            icon="plus"
            mode="outlined"
            style={{padding: '2%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t("Photo ID, face scan")}
          </Button>

          <Button
            icon="home-city"
            mode="contained-tonal"
            style={{padding: '2%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t("Proof of address")}
          </Button>
        </Card.Content>
      </Card>

      <Card mode="outlined" style={{marginTop: '3%'}}>
        <Card.Title title={t("Current features")} />
        <Card.Content>
          <List.Item
            title={t("Digital cash accounts")}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
            right={props => <Text style={{alignSelf:"center"}}>{t("Available")}</Text>}
          />
          <List.Item
            title={t("Internal transfer per day")}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
            right={props => <Text style={{alignSelf:"center"}}>10000 FHT</Text>}
          />

        </Card.Content>
      </Card>

      <Card mode="outlined" style={{marginTop: '3%', }}>
        <Card.Title title={t("Premium features")} />
        <Card.Content>
          <List.Item
            title={t("Digital cash accounts")}
            // description="available"
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => <Text style={{alignSelf:"center"}}>{t("Available")}</Text>}
          />
          <List.Item
            title={t("Internal transfer per day")}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => <Text {...props} style={{alignSelf:"center"}}>50000 FHT</Text>}
          />

        </Card.Content>
      </Card>
      
    </View>
  );
};

export default VerificationIndex;

const styles = StyleSheet.create({});
