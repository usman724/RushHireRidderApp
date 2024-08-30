import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentPosition } from 'react-native-geolocation-service';

const EnableLocationScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const getLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasLocationPermission(permission === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasLocationPermission(true);
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    if (hasLocationPermission) {
      getCurrentPosition(
        (position) => {
          setRegion({
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [hasLocationPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
      <View style={styles.card}>
        <Text style={styles.title}>Enable your location</Text>
        <Text style={styles.description}>
          Choose your location to start finding requests around you.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Enable Location</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.skipButtonText}>Skip for now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: [{ translateY: -150 }],
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#FFB900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default EnableLocationScreen;
