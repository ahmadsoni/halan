import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectTravelTimeInformation,
  setEstimateInformation,
} from '../../core/redux/slices/navSlices';
const data = [
  {
    id: '1',
    title: 'Pertalite',
    price: 10000,
    image: require('../../../assets/icon/icon-pertalite.png'),
  },
  {
    id: '2',
    title: 'Pertamax',
    price: 13300,
    image: require('../../../assets/icon/icon-pertamax.png'),
  },
  {
    id: '3',
    title: 'Pertamax Turbo',
    price: 15100,
    image: require('../../../assets/icon/icon-pertamaxTurbo.png'),
  },
  {
    id: '4',
    title: 'Dexlite',
    price: 14950,
    image: require('../../../assets/icon/icon-dexLite.png'),
  },
];
const FuelOptionsCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null) as any[];
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow rounded-xl`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard' as never)}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}>
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text
          style={tw`text-center py-5 text-base font-medium text-black ml-4`}>
          Pilih Jenih Bahan Bakar
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, price, image}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-5 pb-5 ${
              id === selected?.id ? 'bg-gray-200' : ''
            }`}>
            <View style={tw`flex-row items-center`}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                }}
                source={image}
              />
              <Text style={tw`text-center text-base font-medium text-black`}>
                {title}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-base font-medium text-black`}>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(price)}
                <Text style={tw`text-center text-base font-medium text-black`}>
                  /Liter
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          onPress={() => {
            navigation.navigate('EstimateCard' as never);
            dispatch(
              setEstimateInformation({
                price: selected?.price,
                title: selected?.title,
              }),
            );
          }}
          style={tw`bg-black py-4  ${!selected ? 'bg-gray-300' : ''}`}>
          <Text style={tw`text-center text-white text-xl`}>
            Pilih {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FuelOptionsCard;

const styles = StyleSheet.create({});
