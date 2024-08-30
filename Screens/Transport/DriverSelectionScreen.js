import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const dummyDrivers = [
    { id: '1', name: 'John Doe', photo: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 4.8, latitude: 37.78825, longitude: -122.4324 },
    { id: '2', name: 'Jane Smith', photo: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 4.9, latitude: 37.78850, longitude: -122.4350 },
    { id: '3', name: 'Bob Johnson', photo: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 4.7, latitude: 37.78900, longitude: -122.4340 },
];

const DriverSelectionScreen = ({ navigation, route }) => {
    const { selectedVehicle, paymentMethod } = route.params;
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [searchTime, setSearchTime] = useState(2);
    const [searchProgress] = useState(new Animated.Value(100));
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        const timer = setInterval(() => {
            setSearchTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    setAvailableDrivers(dummyDrivers.map(driver => ({
                        ...driver,
                        progress: new Animated.Value(100),
                        timeRemaining: 30,
                    })));
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        Animated.timing(searchProgress, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: false,
        }).start();

        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            })
        ).start();

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (availableDrivers.length > 0) {
            const interval = setInterval(() => {
                setAvailableDrivers(currentDrivers =>
                    currentDrivers.map(driver => {
                        if (driver.timeRemaining > 0) {
                            Animated.timing(driver.progress, {
                                toValue: (driver.timeRemaining - 1) * 100 / 30,
                                duration: 1000,
                                useNativeDriver: false,
                            }).start();
                            return { ...driver, timeRemaining: driver.timeRemaining - 1 };
                        }
                        return driver;
                    }).filter(driver => driver.timeRemaining > 0)
                );
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [availableDrivers]);

    const handleDriverPress = (driver) => {
        setSelectedDriver(driver);
        setRegion({
          latitude: driver.latitude,
          longitude: driver.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        navigation.navigate('DriverTracking', { driver: {
          ...driver,
          carModel: 'Toyota Camry', 
          carPlate: 'ABC 123',
        }});
      };
    const renderDriverItem = ({ item }) => {
        const progressBarWidth = item.progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        });

        const progressBarColor = item.progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['rgb(255, 0, 0)', 'rgb(255, 165, 0)', 'rgb(0, 255, 0)'],
        });

        return (
            <View style={styles.driverItem}>
                <Image source={{ uri: item.photo }} style={styles.driverPhoto} />
                <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>{item.name}</Text>
                    <Text style={styles.driverRating}>⭐ {item.rating}</Text>
                    <View style={styles.progressBarContainer}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                { width: progressBarWidth, backgroundColor: progressBarColor }
                            ]}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => {
                        alert(`You've accepted a ride with ${item.name}`);
                    }}
                >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.zoomButton}
                    onPress={() => handleDriverPress(item)}
                >
                    <Text style={styles.zoomButtonText}>Locate</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderRadar = () => {
        const rings = [0, 1, 2];
        return rings.map((ring) => {
            const scaleAnimation = animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1.5 + ring * 0.3],
            });
            const opacityAnimation = animation.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0.8, 0.4, 0],
            });
            return (
                <Animated.View
                    key={ring}
                    style={[
                        styles.radar,
                        {
                            transform: [{ scale: scaleAnimation }],
                            opacity: opacityAnimation,
                        },
                    ]}
                />
            );
        });
    };

    const searchProgressWidth = searchProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                >
                    {availableDrivers.map(driver => (
                        <Marker
                            key={driver.id}
                            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
                            title={driver.name}
                        />
                    ))}
                    {selectedDriver && (
                        <Marker
                            coordinate={{ latitude: selectedDriver.latitude, longitude: selectedDriver.longitude }}
                            title={`Selected: ${selectedDriver.name}`}
                        />
                    )}
                </MapView>
                {renderRadar()}
            </View>
            <View style={styles.listContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Available Drivers</Text>
                    <View style={styles.placeholder} />
                </View>
                {searchTime > 0 ? (
                    <View style={styles.searchingContainer}>
                        <Text style={styles.searchingText}>Searching for drivers...</Text>
                        <Text style={styles.timerText}>{searchTime}s</Text>
                        <View style={styles.searchProgressBarContainer}>
                            <Animated.View style={[styles.searchProgressBar, { width: searchProgressWidth }]} />
                        </View>
                    </View>
                ) : (
                    <FlatList
                        data={availableDrivers}
                        renderItem={renderDriverItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
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
    mapContainer: {
        height: '50%',
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    radar: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: 'rgba(255, 185, 0, 0.5)',
        backgroundColor: 'rgba(255, 185, 0, 0.1)',
        transform: [{ translateX: -75 }, { translateY: -75 }],
    },
    listContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        marginTop: -20,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 24,
    },
    searchingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchingText: {
        fontSize: 18,
        marginBottom: 10,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchProgressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
    },
    searchProgressBar: {
        height: '100%',
        backgroundColor: '#FFB900',
        borderRadius: 5,
    },
    driverItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    driverPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    driverInfo: {
        flex: 1,
        marginLeft: 15,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverRating: {
        fontSize: 14,
        color: '#8E8E93',
    },
    progressBarContainer: {
        width: '100%',
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 2.5,
        marginTop: 5,
    },
    progressBar: {
        height: '100%',
        borderRadius: 2.5,
    },
    acceptButton: {
        backgroundColor: '#FFB900',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    zoomButton: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 10,
    },
    zoomButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DriverSelectionScreen;