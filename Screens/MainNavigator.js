import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator'; // Make sure the path is correct
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import SignUpScreen from './Authentication/SignUpScreen';
import WelcomeScreen from './Authentication/WelcomeScreen';
import VerifyOTPScreen from './Authentication/VerifyOTPScreen';
import SetNewPasswordScreen from './Authentication/SetNewPasswordScreen';
import CompleteProfileScreen from './Authentication/CompleteProfileScreen';
import CongratulationsScreen from './Authentication/CongratulationsScreen';
import LocationSelectionScreen from './LocationSelectScreen';
import LocationConfirmationScreen from './LocationConfirmationScreen';
import VehicleSelectionScreen from './Transport/vehicleTypes';
import DriverSelectionScreen from './Transport/DriverSelectionScreen';
import PaymentMethodScreen from './Transport/PaymentMethodScreen';
import DriverTrackingScreen from './Transport/DriverTrackingScreen';
import ChatScreen from './Transport/ChatScreen';
import CallScreen from './Transport/CallScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="SetNewPasswordScreen" component={SetNewPasswordScreen} />
      <Stack.Screen name="CompleteProfileScreen" component={CompleteProfileScreen} />
      <Stack.Screen name="CongratulationsScreen" component={CongratulationsScreen} />
      <Stack.Screen name="LocationSelectionScreen" component={LocationSelectionScreen} />

      <Stack.Screen name="LocationConfirmationScreen" component={LocationConfirmationScreen} />
      <Stack.Screen name="VehicleSelectionScreen" component={VehicleSelectionScreen} />

      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="DriverSelection" component={DriverSelectionScreen} />
      <Stack.Screen name="DriverTracking" component={DriverTrackingScreen} />

      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Call" component={CallScreen} />

      
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
