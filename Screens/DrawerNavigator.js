import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen'; // Make sure the path is correct
import MenuScreen from './MenuScreen'; // Make sure the path is correct
import SearchResultsScreen from './SearchResultsScreen';
import LocationConfirmationScreen from './LocationConfirmationScreen';
import LocationInputScreen from './LocationInputScreen';
import LocationSelectScreen from './LocationSelectScreen';
import HistoryScreen from './HistoryScreen';
import CustomHeader from './components/CustomHeader'; // Adjust the path as needed

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }) => {
  const handleBellPress = () => {
    // Handle the bell icon press
    console.log('Bell icon pressed');
  };

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="LocationConfirmationScreen"
        component={LocationConfirmationScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="LocationInputScreen"
        component={LocationInputScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="LocationSelectScreen"
        component={LocationSelectScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
      <Drawer.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerRight: () => <CustomHeader onBellPress={handleBellPress} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
