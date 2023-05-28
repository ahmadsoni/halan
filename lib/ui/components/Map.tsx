import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect, RefObject, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'twrnc';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../../core/redux/slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_API_KEY} from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef: RefObject<MapView> = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      animated: true,
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
    mapRef.current?.fitToCoordinates([origin.location, destination.location], {
      animated: true,
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [origin, destination, dispatch, isMapReady]);
  useEffect(() => {
    if (!origin || !destination) {
      return;
    }
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_MAP_API_KEY}`;
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          setIsMapReady(true);
        });
    };
    getTravelTime();
  }, [origin, destination, dispatch]);
  return (
    <MapView
      ref={mapRef}
      mapType="standard"
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAP_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Titik Awal"
          description={origin.describe}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Titik Awal"
          description={destination.describe}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
