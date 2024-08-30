// components/CustomHeader.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomHeader = ({ onBellPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBellPress}>
        <Image
          source={require('../../assets/icons/notification.png')} // Ensure the path is correct
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    marginRight: 15, // Adjust as needed
  },
});

export default CustomHeader;
