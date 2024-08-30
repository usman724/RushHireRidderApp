import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Anywhere you are',
    description: 'Get a ride easily with the help of our app to make this trip big. I am writing more.',
    image: require('../../assets/onboarding/onboarding1.png'),
  },
  {
    title: 'At anytime',
    description: 'Get a ride easily with the help of our app to make this trip big. I am writing more.',
    image: require('../../assets/onboarding/onboarding2.png'),
  },
  {
    title: 'Book your car',
    description: 'Get a ride easily with the help of our app to make this trip big. I am writing more.',
    image: require('../../assets/onboarding/onboarding3.png'),
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderDots = () => {
    return onboardingData.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: index === currentIndex ? '#FFB900' : '#E0E0E0' },
        ]}
      />
    ));
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={currentItem.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{currentItem.title}</Text>
        <Text style={styles.description}>{currentItem.description}</Text>
      </View>
      <View style={styles.dotContainer}>{renderDots()}</View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? 'Go' : '→'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#333',
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;