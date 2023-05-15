import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import tw from 'twrnc';
import Map from './../components/Map';
import NavigateCard from './../components/NavigateCard';
import FuelOptionsCard from './../components/FuelOptionsCard';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import EstimateCard from '../components/EstimateCard';
import {useDispatch} from 'react-redux';
import {setOrigin, setDestination} from '../../core/redux/slices/navSlices';
function MapScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => {
          dispatch(setDestination(null));
          dispatch(setOrigin(null));
          navigation.navigate('HomeScreen' as never);
        }}>
        <Icon name="arrowleft" type="antdesign" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FuelOptionsCard"
            component={FuelOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EstimateCard"
            component={EstimateCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

export default MapScreen;
