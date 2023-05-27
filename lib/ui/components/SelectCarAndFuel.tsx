import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectTravelTimeInformation,
  setEstimateInformation,
} from '../../core/redux/slices/navSlices';
import DropDownPicker from 'react-native-dropdown-picker';
import _dataFuel from '../../core/services/dataFuel.json';
import _fuelEffeciencyData from '../../core/services/fuelEfficiencyData .json';
import _dataFuelMatch from '../../core/services/dataFuelMatch.json';

interface FuelType {
  id: string;
  data: {
    fuelTypes: string[];
  };
}
const SelectCarAndFuel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [price, setPrice] = useState(null) as any[];
  const [id, setId] = useState(null) as any[];
  const [fuelType, setFuelType] = useState(null) as any[];
  const [carType, setCarType] = useState(null) as any[];
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState(_fuelEffeciencyData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([] as string[]);

  useEffect(() => {
    const selectedData = _dataFuelMatch.find(item => item.id === value1);
    const fuelPrice = _dataFuel.find(item => item.label === fuelType);
    const typeCar = _fuelEffeciencyData.find(item => item.id === value1);
    if (selectedData) {
      const fuelTypes = selectedData.data.fuelTypes;
      setItems(fuelTypes);
    }
    if (fuelPrice) {
      setPrice(fuelPrice.price);
    }
    if (typeCar) {
      setCarType(typeCar.label);
    }
  }, [value1, items, fuelType]);
  return (
    <SafeAreaView style={tw`bg-white flex-grow rounded-xl rounded-lg`}>
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
          Pilih Jenis Mobil dan Bahan Bakar
        </Text>
        <View style={tw`flex-grow`} />
      </View>
      <View style={tw`items-center justify-between px-10 pt-5 items-start z-2`}>
        <Text style={tw`text-sm font-medium text-black pb-2`}>Mobil</Text>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1.map(item => ({
            label: item.label,
            value: item.id,
          }))}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          dropDownDirection="BOTTOM"
          onChangeValue={setId}
        />
      </View>
      <View style={tw`items-center justify-between px-10 pt-5 items-start z-1`}>
        <Text style={tw`text-sm font-medium text-black pb-2`}>Bahan bakar</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items.map(item => ({
            label: item,
            value: item,
          }))}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownDirection="BOTTOM"
          disabled={!value1}
          style={[
            tw`border border-gray-300 rounded-md px-4 py-2`,
            !value1 && tw`bg-gray-200`,
          ]}
          textStyle={tw`text-black`}
          onChangeValue={setFuelType}
        />
      </View>
      <View style={tw`items-center justify-between px-20 items-start`}>
        <View style={tw`mt-8 border-gray-200 w-50`}>
          <TouchableOpacity
            disabled={!value}
            onPress={() => {
              navigation.navigate('EstimateCard' as never);
              dispatch(
                setEstimateInformation({
                  price,
                  id,
                  fuelType,
                  carType,
                }),
              );
            }}
            style={tw`bg-black py-4 rounded-full ${
              !value ? 'bg-gray-300' : ''
            }`}>
            <Text style={tw`text-center text-white text-xl`}>Pilih</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectCarAndFuel;
