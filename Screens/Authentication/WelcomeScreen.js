import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/Authentication/WelcomeScreen.png')}
        style={styles.illustration}
      />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>
        Choose your location to start find the request around you.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#FFB900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInButton: {
    marginTop: 20,
  },
  signInButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default WelcomeScreen;