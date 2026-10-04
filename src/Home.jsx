import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from './component/BottomBar';
import QrGenerator from './main/QrGenerator';
import QrScanner from './main/QrScanner';
import History from './History';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Create" component={QrGenerator} options={{ title: 'Create QR' }} />
      <Tab.Screen name="Scan" component={QrScanner} options={{ title: 'Scan QR' }} />
      <Tab.Screen name="History" component={History} options={{ title: 'History' }} />
    </Tab.Navigator>
  );
};

export default Home;