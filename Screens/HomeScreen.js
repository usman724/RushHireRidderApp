import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBtDIUU8kI61bqZWzoqiWhtthaEa3iJrGA';

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('Error', 'Location service is not available on this device');
        break;
      case RESULTS.DENIED:
        requestLocationPermission();
        break;
      case RESULTS.GRANTED:
        getCurrentLocation();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Location Permission',
          'Location permission is blocked. Please enable it in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() }
          ]
        );
        break;
    }
  };

  const requestLocationPermission = async () => {
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const permissionStatus = await request(permission);

    if (permissionStatus === RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      Alert.alert(
        "Location Permission Required",
        "This app needs access to your location to function properly. Please enable location services in your device settings.",
        [{ text: "OK" }]
      );
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      },
      (error) => {
        console.error(error);
        Alert.alert(
          "Location Error",
          "Unable to get your current location. Please ensure location services are enabled and try again.",
          [{ text: "OK" }]
        );
      },
      { timeout: 5000}
    );
  };

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const goToCurrentLocation = () => {
    getCurrentLocation();
  };

  const onSearchPress = () => {
    setShowSearch(true);
  };

  const openLocationSelection = () => {
    navigation.navigate('LocationSelectionScreen');
  };

  const onPlaceSelected = (data, details) => {
    const { lat, lng } = details.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
    setDestination(data.description);
    setShowSearch(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
      >
        {region && <Marker coordinate={region} />}
      </MapView>

    

      <TouchableOpacity style={styles.currentLocationButton} onPress={goToCurrentLocation}>
        <Icon name="my-location" size={24} color="#000" />
      </TouchableOpacity>

      {showSearch ? (
        <View style={styles.searchOverlay}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={onPlaceSelected}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInput: styles.autocompleteInput,
              listView: styles.autocompleteList,
            }}
            enablePoweredByContainer={false}
            onFail={error => console.error(error)}
          />
          <TouchableOpacity style={styles.closeSearchButton} onPress={() => setShowSearch(false)}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchInput} onPress={openLocationSelection}>
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Where would you go?</Text>
          </TouchableOpacity>
        </View>
      )}

     
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  currentLocationButton: {
    position: 'absolute',
    top: 490,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFB900',
    borderRadius: 20,
  },
  tabText: {
    fontWeight: 'bold',
  },
  rentalButton: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    backgroundColor: '#FFB900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  rentalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    zIndex: 1,
  },
  autocompleteContainer: {
    flex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  autocompleteInput: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  autocompleteList: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex: 2,
  },
  closeSearchButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
});

export default HomeScreen;
