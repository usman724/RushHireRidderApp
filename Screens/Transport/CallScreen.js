import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CallScreen = ({ navigation, route }) => {
  const { driver } = route.params;
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prevDuration => prevDuration + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    // In a real app, you would end the call here
    navigation.goBack();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real app, you would mute/unmute the call here
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // In a real app, you would turn speaker on/off here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.callerInfo}>
        <Image source={{ uri: driver.photo }} style={styles.callerPhoto} />
        <Text style={styles.callerName}>{driver.name}</Text>
        <Text style={styles.callStatus}>On call</Text>
        <Text style={styles.callDuration}>{formatTime(callDuration)}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleMute}>
          <Icon name={isMuted ? "mic-off" : "mic"} size={30} color="white" />
          <Text style={styles.actionButtonText}>{isMuted ? "Unmute" : "Mute"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={toggleSpeaker}>
          <Icon name={isSpeakerOn ? "volume-up" : "volume-down"} size={30} color="white" />
          <Text style={styles.actionButtonText}>{isSpeakerOn ? "Speaker Off" : "Speaker On"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Icon name="call-end" size={40} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  callerInfo: {
    alignItems: 'center',
    marginTop: 50,
  },
  callerPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  callerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 10,
  },
  callDuration: {
    fontSize: 16,
    color: '#8E8E93',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    marginTop: 5,
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default CallScreen;