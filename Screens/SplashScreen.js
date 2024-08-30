import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the SignInScreen after 2 seconds
    const timer = setTimeout(() => {
        // Alert.alert('Welcome to Easy Rider', 'Your one stop solution for all your transportation needs');
        navigation.replace('SignInScreen');
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/Logo.png')} style={styles.icon} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
});

export default SplashScreen;
