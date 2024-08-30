import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DriverTrackingScreen = ({ navigation, route }) => {
    const { driver } = route.params;
    const [driverLocation, setDriverLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });
    const [userLocation] = useState({
        latitude: 37.78925,
        longitude: -122.4344,
    });
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
            // Simulate driver movement
            setDriverLocation((prevLocation) => ({
                latitude: prevLocation.latitude + (Math.random() - 0.5) * 0.001,
                longitude: prevLocation.longitude + (Math.random() - 0.5) * 0.001,
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        ...driverLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={driverLocation} title="Driver">
                        <Icon name="directions-car" size={30} color="#007AFF" />
                    </Marker>
                    <Marker coordinate={userLocation} title="You">
                        <Icon name="person-pin-circle" size={30} color="#FF3B30" />
                    </Marker>
                    <Polyline
                        coordinates={[driverLocation, userLocation]}
                        strokeColor="#000"
                        strokeWidth={2}
                    />
                </MapView>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.driverInfo}>
                    <Image source={{ uri: driver.photo }} style={styles.driverPhoto} />
                    <View style={styles.driverDetails}>
                        <Text style={styles.driverName}>{driver.name}</Text>
                        <Text style={styles.driverRating}>⭐ {driver.rating}</Text>
                    </View>
                    <View style={styles.carInfo}>
                        <Text style={styles.carModel}>{driver.carModel}</Text>
                        <Text style={styles.carPlate}>{driver.carPlate}</Text>
                    </View>
                </View>
                <View style={styles.tripInfo}>
                    <Text style={styles.tripTimeLabel}>Trip Time:</Text>
                    <Text style={styles.tripTime}>{formatTime(elapsedTime)}</Text>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Chat', { driver })}>
                        <Icon name="chat" size={24} color="#007AFF" />
                        <Text style={styles.actionButtonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Call', { driver })}>
                        <Icon name="call" size={24} color="#007AFF" />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                </View>
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
        flex: 2,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    infoContainer: {
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    driverPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    driverDetails: {
        marginLeft: 15,
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    driverRating: {
        fontSize: 16,
        color: '#8E8E93',
    },
    carInfo: {
        alignItems: 'flex-end',
    },
    carModel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    carPlate: {
        fontSize: 14,
        color: '#8E8E93',
    },
    tripInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    tripTimeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripTime: {
        fontSize: 16,
        color: '#007AFF',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionButtonText: {
        marginTop: 5,
        color: '#007AFF',
    },
});

export default DriverTrackingScreen;