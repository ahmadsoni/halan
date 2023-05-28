import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import GeoLocation from '@react-native-community/geolocation';
import {setDestination} from '../../core/redux/slices/navSlices';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Lokasi Anda',
    destination: 'Lokasi anda saat ini',
  },
];

const NavFavorites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, {height: 0.5}]} />
      )}
      renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            GeoLocation.getCurrentPosition(position => {
              dispatch(
                setDestination({
                  location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  },
                  describe: location,
                }),
              );
            });
            navigation.navigate('SelectCarAndFuel' as never);
          }}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-base text-black`}>
              {location}
            </Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
