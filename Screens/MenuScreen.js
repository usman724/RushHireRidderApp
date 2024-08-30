// MenuScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    { id: '1', title: 'Edit Profile', icon: 'edit-icon.png' },
    { id: '2', title: 'Address', icon: 'address-icon.png' },
    { id: '3', title: 'History', icon: 'history-icon.png' },
    { id: '4', title: 'Coupons', icon: 'coupons-icon.png' },
    { id: '5', title: 'Referral', icon: 'referral-icon.png' },
    { id: '6', title: 'About Us', icon: 'about-icon.png' },
    { id: '7', title: 'Settings', icon: 'settings-icon.png' },
    { id: '8', title: 'Help and Support', icon: 'support-icon.png' },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <Image source={require(`../assets/Authentication/placeholder.png`)} style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
        <Image source={require('../assets/icons/menu.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Image source={require('../assets/Authentication/placeholder.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Nate Samson</Text>
        <Text style={styles.profileEmail}>nate@email.com</Text>
      </View>
      <View style={styles.menuList}>
        {menuItems.map(renderMenuItem)}
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#999',
  },
  menuList: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFB900',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;