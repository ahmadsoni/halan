import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izinkan Akses Lokasi?',
        message:
          'izinkan aplikasi ini untuk mengakses lokasi anda ' +
          'untuk mempermudah anda dalam mencari lokasi anda saat ini.',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Tidak',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Lokasi diizinkan');
    } else {
      console.log('Lokasi tidak diizinkan');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default requestLocationPermission;
