import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {Modalize} from 'react-native-modalize'
import {
  Card,
  Text,
  Avatar,
  Button,
  useTheme,
  TextInput,
  Divider,
  IconButton,
  Portal,
} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Entypo'
const ConvertIndex = () => {
  const theme = useTheme();
  const [sendAmount, setSendAmount] = useState(10);

  const [curr, setCurr] = useState([
    {
      id: 0,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 98.01,
      sign: '$',
    },
    {
      id: 1,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 80.01,
      sign: '$',
    },
    {
      id: 2,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 0,
      sign: '$',
    },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };


  return (
    <View style={{padding: '4%'}}>
      <Text style={{textAlign: 'center', fontSize: 16}}>
        Convert your traditional and crypto currencies with ease. Just choose an
        exchanging pair.
      </Text>

      <View style={{marginTop: '4%'}}>
        <Card style={{}}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                onPress={()=>onOpen()}
              // key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2%',
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 40,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={30}
                  source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: '5%',
                    fontWeight: 'bold',
                  }}>
                  DFRT
                </Text>
                <Avatar.Icon
                  size={45}
                  icon="chevron-down"
                  style={{backgroundColor: theme.colors.primaryContainer}}
                />
              </View>
            </TouchableOpacity>

            <View style={{alignItems: 'flex-end'}}>
              <Text variant="bodyMedium">Balance:</Text>
              <Text variant="bodyMedium">D$ 0.0</Text>
            </View>
          </Card.Content>
          <Card.Content style={{marginTop: '4%'}}>
            <Text variant="bodyMedium">You pay</Text>

            <TextInput
              style={{
                marginTop: '2%',
                backgroundColor: theme.colors.background,
              }}
              label="D$"
              keyboardType="numeric"
              //   left={<TextInput.Icon icon="eye" />}
              //   value={sendAmount}
              //   onChangeText={text => setText(text)}
            />
          </Card.Content>
        </Card>

        <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
          <Text>1.0</Text>
          <IconButton
            icon="arrow-down"
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="arrow-up"
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />

          <Text>0.88</Text>

        </View>

        <Card style={{}}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                onPress={()=>onOpen()}
              // key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2%',
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 40,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={30}
                  source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: '5%',
                    fontWeight: 'bold',
                  }}>
                  DFRT
                </Text>
                <Avatar.Icon
                  size={45}
                  icon="chevron-down"
                  style={{backgroundColor: theme.colors.primaryContainer}}
                />
              </View>
            </TouchableOpacity>

            <View style={{alignItems: 'flex-end'}}>
              <Text variant="bodyMedium">Balance:</Text>
              <Text variant="bodyMedium">D$ 0.0</Text>
            </View>
          </Card.Content>
          <Card.Content style={{marginTop: '4%'}}>
            <Text variant="bodyMedium">You get</Text>

            <TextInput
              style={{
                marginTop: '2%',
                backgroundColor: theme.colors.background,
              }}
              label="D$"
              keyboardType="numeric"
              //   left={<TextInput.Icon icon="eye" />}
              //   value={sendAmount}
              //   onChangeText={text => setText(text)}
            />
          </Card.Content>
        </Card>
      </View>

      <Portal>
        <Modalize
          handlePosition="inside"
          HeaderComponent={() => (
            <View style={{paddingHorizontal: '2%'}}>
              <IconButton
                icon="close"
                style={{alignSelf: 'flex-end'}}
                // iconColor={MD3Colors.error50}
                size={25}
                onPress={() => onClose()}
              />
            </View>
          )}
          ref={modalizeRef}>
          <View style={{paddingHorizontal: '4%'}}>
            {curr.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedCurrency(index)}
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
                      fontSize: 18,
                      marginLeft: '5%',
                    }}>
                    {item.nickName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                    }}>
                    {item.sign}
                    {item.balance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default ConvertIndex;

const styles = StyleSheet.create({});
