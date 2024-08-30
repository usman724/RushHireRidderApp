import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const paymentMethods = [
    { id: '1', name: 'Mastercard', icon: 'credit-card', lastDigits: '8295' },
    { id: '2', name: 'Visa', icon: 'credit-card', lastDigits: '4704' },
    { id: '3', name: 'Cash', icon: 'attach-money' },
];

const PaymentMethodScreen = ({ navigation, route }) => {
    const { selectedVehicle } = route.params;

    const renderPaymentMethod = ({ item }) => (
        <TouchableOpacity
            style={styles.paymentItem}
            onPress={() => navigation.navigate('DriverSelection', { selectedVehicle, paymentMethod: item })}
        >
            <View style={styles.paymentInfo}>
                <Icon name={item.icon} size={24} color="#000" />
                <Text style={styles.paymentName}>
                    {item.name} {item.lastDigits ? `•••• ${item.lastDigits}` : ''}
                </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select payment</Text>
                <View style={styles.placeholder} />
            </View>
            <View style={styles.content}>
                <FlatList
                    data={paymentMethods}
                    renderItem={renderPaymentMethod}
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 'auto',
        height: '50%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 24,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentName: {
        fontSize: 16,
        marginLeft: 15,
    },
});

export default PaymentMethodScreen;
