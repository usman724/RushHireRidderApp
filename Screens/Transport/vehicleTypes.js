import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBtDIUU8kI61bqZWzoqiWhtthaEa3iJrGA'; // Replace with your actual API key

const vehicleTypes = [
    { id: '1', name: 'Just go', price: 250, icon: 'directions-car' },
    { id: '2', name: 'Limousine', price: 250, icon: 'directions-car' },
    { id: '3', name: 'Luxury', price: 250, icon: 'directions-car' },
    { id: '4', name: 'ElectricCar', price: 450, icon: 'electric-car' },
    { id: '5', name: 'Bike', price: 150, icon: 'motorcycle' },
    { id: '6', name: 'Taxi 4 seat', price: 550, icon: 'local-taxi' },
    { id: '7', name: 'Taxi 7 seat', price: 600, icon: 'local-taxi' },
];

const VehicleSelectionScreen = ({ route, navigation }) => {
    const [mapReady, setMapReady] = useState(false);
    const [region, setRegion] = useState(null);
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);
    const { from, to } = route.params || {};
    
    const [radarAnimation] = useState(new Animated.Value(0));

    const geocode = async (address) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=${GOOGLE_MAPS_APIKEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                return { latitude: lat, longitude: lng };
            }
            throw new Error('No results found');
        } catch (error) {
            console.error('Geocoding error:', error);
            return null;
        }
    };

    const processCoordinates = async (location) => {
        if (typeof location === 'string') {
            return await geocode(location);
        } else if (location && location.latitude && location.longitude) {
            return location;
        }
        return null;
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            const fromResult = await processCoordinates(from);
            const toResult = await processCoordinates(to);

            setFromCoords(fromResult);
            setToCoords(toResult);

            if (fromResult && toResult) {
                const newRegion = {
                    latitude: (fromResult.latitude + toResult.latitude) / 2,
                    longitude: (fromResult.longitude + toResult.longitude) / 2,
                    latitudeDelta: Math.abs(fromResult.latitude - toResult.latitude) * 1.5,
                    longitudeDelta: Math.abs(fromResult.longitude - toResult.longitude) * 1.5,
                };
                setRegion(newRegion);
            }
        };

        fetchCoordinates();
    }, [from, to]);

    useEffect(() => {
        const startRadarAnimation = () => {
            radarAnimation.setValue(0);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(radarAnimation, {
                        toValue: 1,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(radarAnimation, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        startRadarAnimation();
    }, [radarAnimation]);

    const renderVehicleItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.vehicleItem}
            onPress={() => navigation.navigate('PaymentMethod', { selectedVehicle: item })}
        >
            <Icon name={item.icon} size={24} color="#000" />
            <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{item.name}</Text>
                <Text style={styles.vehicleTime}>2 min</Text>
            </View>
            <Text style={styles.vehiclePrice}>Pkr {item.price}</Text>
        </TouchableOpacity>
    );

    const radarStyle = {
        opacity: radarAnimation,
        transform: [
            {
                scale: radarAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2],
                }),
            },
        ],
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                {region ? (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={region}
                        onMapReady={() => setMapReady(true)}
                    >
                        {mapReady && fromCoords && toCoords && (
                            <>
                                <Marker
                                    coordinate={fromCoords}
                                    title="Start"
                                    pinColor="green"
                                />
                                <Marker
                                    coordinate={toCoords}
                                    title="End"
                                    pinColor="red"
                                />
                                <Polyline
                                    coordinates={[fromCoords, toCoords]}
                                    strokeColor="#FFB900"
                                    strokeWidth={3}
                                />
                            </>
                        )}
                    </MapView>
                ) : (
                    <ActivityIndicator size="large" color="#0000ff" />
                )}
                <Animated.View style={[styles.radar, radarStyle]} />
            </View>
            <View style={styles.listContainer}>
                <View style={styles.middleBar}></View>
                <Text style={styles.headerText}>Choose Vehicle Type</Text>
                <FlatList
                    data={vehicleTypes}
                    renderItem={renderVehicleItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
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
    mapContainer: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    radar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FFB900',
        backgroundColor: 'transparent',
        borderStyle: 'dotted',
        opacity: 0.5,
    },
    middleBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        width: 100,
        borderRadius: 2,
        marginLeft: '40%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#000000',
        opacity: 0.5,
        zIndex: 1,
    },
    listContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        marginTop: -20,
        padding: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    vehicleInfo: {
        flex: 1,
        marginLeft: 15,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    vehicleTime: {
        fontSize: 14,
        color: '#8E8E93',
    },
    vehiclePrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VehicleSelectionScreen;
