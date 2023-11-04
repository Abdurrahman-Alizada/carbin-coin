import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme, Text, Avatar, Button} from 'react-native-paper';

const Index = ({navigation}) => {
  const theme = useTheme();
  const [curr, setCurr] = useState([
    {
      id: 0,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
    },
    {
      id: 1,
      name: 'Digital candian dollar 1',
      nickName: 'DCNH',
      image: '',
    },
    {
      id: 2,
      name: 'Digital candian dollar 2',
      nickName: 'DCNH',
      image: '',
    },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);
  return (
    <View style={{paddingHorizontal: '5%', marginVertical: 20}}>
      <Text style={{textAlign: 'center', fontSize: 16, lineHeight: 25}}>
        You can add these currencies to your account and hold digital cash in
        it.
      </Text>
      <Text style={{marginTop: '8%', lineHeight: 25}}>Select currency</Text>

      <View>
        {curr.map((item, index) => (
          <TouchableOpacity
          onPress={()=>setSelectedCurrency(index)}
            key={index}
            style={{
              flexDirection: 'row',
              marginTop: '3%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '1%',
              paddingVertical: '2%',
              backgroundColor:
                index === selectedCurrency
                  ? theme.colors.secondaryContainer
                  : theme.colors.background,
              borderRadius: 40,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image
                size={35}
                source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: '5%',
                }}>
                {item.name}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: '3%',
                }}>
                {item.nickName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Button
        style={{marginTop:"5%",}}
        contentStyle={{padding:"1%"}}
          // icon="camera"
          disabled={!(selectedCurrency > -1)}
          mode="contained"
          theme={{roundness:6}}
          onPress={() => navigation.goBack()}>
          Add currency
        </Button>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
