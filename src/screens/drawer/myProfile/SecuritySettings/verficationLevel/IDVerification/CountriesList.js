import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetAllCountriesListQuery} from '../../../../../../redux/reducers/user/userThunk';
import {useDispatch} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import {FlashList} from '@shopify/flash-list';
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {handleSelectedCountry} from '../../../../../../redux/reducers/user/user';

const CountriesList = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    data,
    isError: IsCountryListError,
    error: countryListError,
    isLoading: isCountryListLoading,
    refetch,
  } = useGetAllCountriesListQuery();

  const [country, setCountry] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const searchFilterFunction = async text => {
    setMasterDataSource(data);
    setFilteredDataSource(data);
    if (text) {
      const newData = masterDataSource?.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (!newData?.length) {
        // setListEmptyText('Nothing find. Please enter some other text');
      }
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(masterDataSource);
    }
  };

  useEffect(() => {
    setMasterDataSource(data);
    setFilteredDataSource(data);
  }, [data]);
  const onClose = item => {
    dispatch(handleSelectedCountry(item));
    navigation.goBack();
  };

  const getHighlightedText = result =>
    result.split(new RegExp(`(${country})`, `gi`)).map((piece, index) => {
      return (
        <Text
          key={index}
          style={
            piece.toLocaleLowerCase() == country.toLocaleLowerCase()
              ? {fontWeight: 'bold', color: theme.colors.secondary}
              : {}
          }>
          {piece}
        </Text>
      );
    });

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClose(item);
        }}
        key={index}
        style={{
          flexDirection: 'row',
          marginTop: '3%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          minHeight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: '1%',
            paddingHorizontal: '2%',
            alignItems: 'center',
          }}>
          <CountryFlag isoCode={item?.code} size={22} />

          <Text
            style={{
              fontSize: 16,
              marginLeft: '8%',
            }}>
            {getHighlightedText(item.name)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => (
    <View style={{marginVertical: '4%'}}>
      <View
        style={{
          textAlign: 'center',
          marginTop: '7%',
          alignItems: 'center',
        }}>
        <Avatar.Icon
          size={70}
          style={{backgroundColor: theme.colors.background}}
          icon="airballoon-outline"
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: '2%',
          }}>
          {t('Country not found')}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: '2%'}}>
        <IconButton
          icon="close"
          style={{alignSelf: 'flex-end'}}
          size={25}
          onPress={() => onClose()}
        />
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '800'}}>
          Country of residence
        </Text>
      </View>
      {isCountryListLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: '2%'}}>
            <TextInput
              style={{
                marginBottom: '1%',
                backgroundColor: theme.colors.surface,
              }}
              label={t('Search')}
              dense
              onFocus={() => setIsSearch(true)}
              onBlur={() => setIsSearch(false)}
              value={country}
              onChangeText={e => {
                setCountry(e);
                searchFilterFunction(e);
              }}
              mode="outlined"
              outlineColor={theme.colors.background}
              activeOutlineColor={theme.colors.secondary}
            />
          </View>

          <FlashList
            data={filteredDataSource}
            renderItem={renderItem}
            estimatedItemSize={200}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      )}
    </View>
  );
};

export default CountriesList;
