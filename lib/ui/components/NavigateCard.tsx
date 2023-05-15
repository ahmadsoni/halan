import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination} from '../../core/redux/slices/navSlices';
import {useNavigation} from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import checkTimeOfDay from '../../utils/checkTimeOfDay';
import {Icon} from 'react-native-elements';
const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center font-medium py-5 text-base text-black`}>
        Selamat {checkTimeOfDay()}, User
      </Text>
      <View style={tw`border-t border-gray-100 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyle}
            textInputProps={{
              placeholderTextColor: 'gray',
              returnKeyType: 'search',
            }}
            placeholder="Lokasi kamu?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  describe: data.description,
                }),
              );
              navigation.navigate('FuelOptionsCard' as never);
            }}
            query={{
              key: GOOGLE_MAP_API_KEY,
              language: 'id',
            }}
          />
        </View>
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyle = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  textInput: {
    fontSize: 18,
    color: 'black',
    borderRadius: 0,
    backgroundColor: '#DDDDDF',
  },
  description: {
    color: 'gray',
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
