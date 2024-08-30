import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBtDIUU8kI61bqZWzoqiWhtthaEa3iJrGA'; // Replace with your actual API key

const LocationSelectionScreen = ({ navigation }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        Alert.alert('Error', 'Location service is not available on this device');
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results && data.results.length > 0) {
                            setCurrentLocation(data.results[0].formatted_address);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            },
            error => console.error(error),
            { enableHighAccuracy: true, timeout: 15000 }
        );
    };

    const recentPlaces = [
        { id: '1', name: 'Current Location', distance: currentLocation },
    ];

    const renderRecentPlace = ({ item }) => (
        <TouchableOpacity style={styles.recentPlace} onPress={() => setFrom(item.name)}>
            <Icon name="place" size={20} color="#000" />
            <View style={styles.recentPlaceTextContainer}>
                <Text style={styles.recentPlaceName}>{item.name}</Text>
                <Text style={styles.recentPlaceDistance}>{item.distance}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select address</Text>
                <View style={styles.placeholder} />
            </View>
            <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                    placeholder='From'
                    onPress={(data, details = null) => setFrom(data.description)}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    styles={{
                        container: styles.autocompleteContainer,
                        textInput: styles.autocompleteInput,
                    }}
                    renderLeftButton={() => (
                        <Icon name="my-location" size={20} color="#000" style={styles.inputIcon} />
                    )}
                />
                <GooglePlacesAutocomplete
                    placeholder='To'
                    onPress={(data, details = null) => setTo(data.description)}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    styles={{
                        container: styles.autocompleteContainer,
                        textInput: styles.autocompleteInput,
                    }}
                    renderLeftButton={() => (
                        <Icon name="location-on" size={20} color="#000" style={styles.inputIcon} />
                    )}
                />
            </View>
            <View style={styles.recentPlacesContainer}>
                <Text style={styles.recentTitle}>Recent places</Text>
                <FlatList
                    data={recentPlaces}
                    renderItem={renderRecentPlace}
                    keyExtractor={item => item.id}
                />
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
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 24,
    },
    inputContainer: {
        padding: 15,
    },
    autocompleteContainer: {
        marginBottom: 10,
    },
    autocompleteInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    inputIcon: {
        marginLeft: 10,
        marginRight: 5,
    },
    recentPlacesContainer: {
        flex: 1,
        padding: 15,
    },
    recentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recentPlace: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    recentPlaceTextContainer: {
        marginLeft: 15,
    },
    recentPlaceName: {
        fontSize: 16,
    },
    recentPlaceDistance: {
        color: '#999',
        fontSize: 14,
        marginTop: 2,
    },
});

export default LocationSelectionScreen;