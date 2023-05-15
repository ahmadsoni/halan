import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../../core/redux/slices/navSlices';
const data = [
  {
    id: '123',
    title: 'Pilih Lokasimu',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen as never)}
            style={tw` pb-23 pt-2 bg-gray-200 m-2 w-76 rounded-xl shadow-md overflow-hidden ${
              origin ? '' : 'shadow-none'
            }`}
            disabled={!origin}>
            <View
              style={tw`${
                origin ? '' : 'opacity-20'
              } flex-shrink-0  items-center`}>
              <Image style={imageStyle.container} source={{uri: item.image}} />
            </View>
            <View style={tw`flex-grow ${origin ? '' : 'opacity-20'}`}>
              <View
                style={tw`flex-row justify-center absolute w-76 items-center bg-white rounded-xl p-6`}>
                <Text style={tw`mt-2 text-base font-semibold text-black px-2`}>
                  {item.title}
                </Text>
                <Icon
                  style={tw`p-2 bg-black rounded-full w-10 mt-1`}
                  name="arrowright"
                  color="white"
                  type="antdesign"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default NavOptions;

const imageStyle = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
