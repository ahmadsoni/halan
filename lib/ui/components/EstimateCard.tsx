import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectTravelTimeInformation,
  selectEstimateInformation,
  selectOrigin,
  selectDestination,
} from '../../core/redux/slices/navSlices';
import extractName from '../../utils/extractName';
import convertMilesToKilometers from '../../utils/convertMilesToKilometers';
import calculateRoadPrice from '../../utils/calculateRoadPrice';
const EstimateCard = () => {
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const estimateInformation = useSelector(selectEstimateInformation);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const jarakTempuh: number = convertMilesToKilometers(
    travelTimeInformation?.distance?.text,
  );
  const hargaJalan: number = calculateRoadPrice(
    estimateInformation?.price,
    jarakTempuh,
    estimateInformation?.id,
  );
  function capitalize(word: string) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <SafeAreaView style={tw`bg-white flex-grow rounded-lg`}>
      <View style={tw`flex-row items-center justify-between`}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tw`p-3 rounded-full`}>
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <View style={tw`flex-grow`} />
        <Text style={tw`text-center py-5 text-base font-medium text-black`}>
          Estimasi Perjalanan
        </Text>
        <View style={tw`flex-grow`} />
      </View>
      <View style={tw`bg-gray-200 py-6`}>
        <View style={tw`flex-row items-center justify-evenly px-4`}>
          <Text style={tw`text-base font-medium text-black`}>
            {extractName(origin?.describe)}
          </Text>
          <Icon
            style={tw`bg-gray-200`}
            name="car"
            type="font-awesome"
            color="black"
            size={19}
          />
          <Text style={tw`text-base font-medium text-black`}>
            {extractName(destination?.describe)}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row items-center justify-between px-10 pt-5`}>
        <Text style={tw`text-sm font-medium text-black`}>Jarak Tempuh</Text>
        <Text style={tw`text-lg font-medium text-black`}>{jarakTempuh} KM</Text>
      </View>
      <View style={tw`flex-row items-center justify-between px-10 pt-5`}>
        <Text style={tw`text-sm font-medium text-black`}>
          Jenis Bahan Bakar
        </Text>
        <Text style={tw`text-lg font-medium text-black`}>
          {capitalize(estimateInformation?.fuelType)}
        </Text>
      </View>
      <View style={tw`flex-row items-center justify-between px-10 pt-5`}>
        <Text style={tw`text-sm font-medium text-black`}>Jenis Kendaraan</Text>
        <Text style={tw`text-lg font-medium text-black`}>
          {estimateInformation?.carType
            ? capitalize(estimateInformation.carType)
                .split(' ')
                .map((word: string) => capitalize(word))
                .join(' ')
            : ''}
        </Text>
      </View>
      <View style={tw`mt-auto bg-gray-200 border-black py-4`}>
        <Text style={tw`text-center text-black font-semibold text-2xl `}>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(hargaJalan)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EstimateCard;
