import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBtDIUU8kI61bqZWzoqiWhtthaEa3iJrGA';
const { width, height } = Dimensions.get('window');

const LocationSelectionScreen = ({ navigation }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [distance, setDistance] = useState(null);
    const fromRef = useRef(null);
    const toRef = useRef(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (currentLocation && fromRef.current) {
            fromRef.current.setAddressText(currentLocation);
            setSelectedFrom({ description: currentLocation, location: null });
        }
    }, [currentLocation]);

    useEffect(() => {
        if (selectedFrom?.location && selectedTo?.location) {
            calculateDistance(selectedFrom.location, selectedTo.location);
        }
    }, [selectedFrom, selectedTo]);

    const getCurrentLocation = () => {
        setIsLoading(true);
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results && data.results.length > 0) {
                            const address = data.results[0].formatted_address;
                            setCurrentLocation(address);
                        }
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        setIsLoading(false);
                    });
            },
            error => {
                console.error(error);
                setIsLoading(false);
            },
            { timeout: 5000 }
        );
    };

    const calculateDistance = (fromLocation, toLocation) => {
        const fromCoords = {
            latitude: fromLocation.lat,
            longitude: fromLocation.lng,
        };
        const toCoords = {
            latitude: toLocation.lat,
            longitude: toLocation.lng,
        };

        const distance = haversine(fromCoords, toCoords, { unit: 'kilometer' });
        setDistance(distance.toFixed(2));

        navigation.navigate('LocationConfirmationScreen', {
            from: {
                latitude: fromLocation.lat,
                longitude: fromLocation.lng,
                address: selectedFrom.description,
            },
            to: {
                latitude: toLocation.lat,
                longitude: toLocation.lng,
                address: selectedTo.description,
            },
            distance,
        });
    };

    const handleFromSelect = (data, details) => {
        setSelectedFrom({
            description: data.description,
            location: details.geometry.location,
        });
    };

    const handleToSelect = (data, details) => {
        setSelectedTo({
            description: data.description,
            location: details.geometry.location,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Address</Text>
                <View style={styles.placeholder} />
            </View>
            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <GooglePlacesAutocomplete
                                ref={fromRef}
                                placeholder='From'
                                onPress={handleFromSelect}
                                query={{
                                    key: GOOGLE_MAPS_APIKEY,
                                    language: 'en',
                                }}
                                styles={autocompleteStyles}
                                renderLeftButton={() => (
                                    <Icon name="my-location" size={20} color="#000" style={styles.inputIcon} />
                                )}
                                enablePoweredByContainer={false}
                                fetchDetails={true}
                            />
                        </View>
                        {selectedFrom && (
                            <View style={styles.selectedLocationItem}>
                                <Icon name="location-on" size={20} color="#000" />
                                <Text style={styles.selectedLocationText} numberOfLines={1}>{selectedFrom.description}</Text>
                            </View>
                        )}
                        <View style={styles.inputContainer}>
                            <GooglePlacesAutocomplete
                                ref={toRef}
                                placeholder='To'
                                onPress={handleToSelect}
                                query={{
                                    key: GOOGLE_MAPS_APIKEY,
                                    language: 'en',
                                }}
                                styles={autocompleteStyles}
                                renderLeftButton={() => (
                                    <Icon name="location-on" size={20} color="#000" style={styles.inputIcon} />
                                )}
                                enablePoweredByContainer={false}
                                fetchDetails={true}
                            />
                        </View>
                        {selectedTo && (
                            <View style={styles.selectedLocationItem}>
                                <Icon name="location-on" size={20} color="#000" />
                                <Text style={styles.selectedLocationText} numberOfLines={1}>{selectedTo.description}</Text>
                            </View>
                        )}
                        {distance && (
                            <View style={styles.distanceContainer}>
                                <Text style={styles.distanceText}>Distance: {distance} km</Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 5,
    },
    placeholder: {
        width: 24,
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 15,
        flex: 1,
        maxHeight: 50,
    },
    inputIcon: {
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center',
    },
    selectedLocationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    selectedLocationText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    distanceContainer: {
        marginTop: 20,
        backgroundColor: '#e6f7ff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    distanceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0066cc',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const autocompleteStyles = {
    container: {
        flex: 1,
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 8,
       
      
    },
    textInput: {
        height: 50,
        color: '#333',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingLeft: 40,
        
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    listView: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: width - 30,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
        zIndex: 10, // Ensure the list view is on top
    },
};

export default LocationSelectionScreen;
