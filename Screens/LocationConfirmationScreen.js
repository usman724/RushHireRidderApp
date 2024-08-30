import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

const LocationConfirmationScreen = ({ route, navigation }) => {
    const { from, to, distance } = route.params;

    const handleConfirmLocation = () => {
        navigation.navigate('VehicleSelectionScreen', { from, to, distance });
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="menu" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="notifications-none" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Add markers for 'from' and 'to' locations here */}
            </MapView>
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />
                <Text style={styles.selectAddressText}>Select address</Text>
                <View style={styles.locationContainer}>
                    <View style={styles.locationItem}>
                        <View style={styles.iconContainer}>
                            <Icon name="my-location" size={20} color="#FF3B30" />
                        </View>
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.locationLabel}>From</Text>
                            <Text style={styles.locationAddress}>{from.address}</Text>
                        </View>
                    </View>
                    <View style={styles.dotLine} />
                    <View style={styles.locationItem}>
                        <View style={styles.iconContainer}>
                            <Icon name="location-on" size={20} color="#FFB900" />
                        </View>
                        <View style={styles.locationTextContainer}>
                        <View style={styles.locationHeader}>
                            <Text style={styles.locationLabel}>To</Text>
                            {distance !== null && (
                                <Text style={styles.distanceText}>{distance.toFixed(1)} km</Text>
                            )}
                        </View>
                        <Text style={styles.locationAddress}>{to.address}</Text>
                    </View>

                    </View>
                </View>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                    <Text style={styles.confirmButtonText}>Confirm Location</Text>
                </TouchableOpacity>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        padding: 5,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 15,
    },
    map: {
        flex: 1,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#D1D1D6',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 10,
    },
    selectAddressText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    locationContainer: {
        marginBottom: 20,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1E',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    locationAddress: {
        fontSize: 14,
        color: '#8E8E93',
    },
    distanceText: {
        fontSize: 14,
        color: '#000000',
       
        fontWeight:'bold',
        textAlign: 'right', 
    },
    dotLine: {
        width: 1,
        height: 20,
        backgroundColor: '#D1D1D6',
        marginLeft: 18,
        marginBottom: 15,
    },
    confirmButton: {
        backgroundColor: '#FFB900',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LocationConfirmationScreen;