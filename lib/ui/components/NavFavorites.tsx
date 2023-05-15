import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Jalan Raya Cibaduyut, Bandung, Indonesia',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'Jalan Raya Cibaduyut, Bandung, Indonesia',
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, {height: 0.5}]} />
      )}
      renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
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
