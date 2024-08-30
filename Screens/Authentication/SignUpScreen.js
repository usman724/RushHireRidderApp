import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
      />
      <View style={styles.phoneContainer}>
        <TextInput
          style={[styles.input, styles.phonePrefix]}
          placeholder="+1"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.phoneNumber]}
          placeholder="Phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VerifyOTP')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.socialButtons}>
        {/* Add social media sign-up buttons here */}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign in</Text>
        </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  phonePrefix: {
    width: '20%',
  },
  phoneNumber: {
    width: '75%',
  },
  button: {
    backgroundColor: '#FFB900',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  signInText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  signInLink: {
    color: '#FFB900',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;