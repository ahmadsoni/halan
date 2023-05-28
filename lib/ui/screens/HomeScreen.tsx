import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_API_KEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination, setOrigin} from '../../core/redux/slices/navSlices';
import requestLocationPermission from '../../utils/requestPermision';
const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={imageStyle.container}
          source={require('../../../assets/png/logo-1.png')}
        />
        <GooglePlacesAutocomplete
          styles={toInputBoxStyles}
          textInputProps={{
            placeholderTextColor: 'gray',
            returnKeyType: 'search',
          }}
          placeholder="Kamu mau kemana?"
          fetchDetails={true}
          minLength={2}
          suppressDefaultStyles={true}
          query={{
            key: GOOGLE_MAP_API_KEY,
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                describe: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 18,
    color: 'black',
  },
  description: {
    color: 'gray',
  },
});

const imageStyle = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
