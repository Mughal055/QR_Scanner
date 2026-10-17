import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from './component/BottomBar';
import QrGenerator from './main/QrGenerator';
import QrScanner from './main/QrScanner';
import History from './History';
import { useMMKVBoolean } from 'react-native-mmkv';                // DARK

const Tab = createBottomTabNavigator();

const Home = () => {
  // DARK: Settings mein Dark Mode badalte hi tabs ka background khud badal jata hai
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <Tab.Navigator
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: dark ? '#121212' : '#fff' },   // DARK: Create, Scan, History ka background
      }}>
      <Tab.Screen name="Create" component={QrGenerator} options={{ title: 'Create QR' }} />
      <Tab.Screen name="Scan" component={QrScanner} options={{ title: 'Scan QR' }} />
      <Tab.Screen name="History" component={History} options={{ title: 'History' }} />
    </Tab.Navigator>
  );
};

export default Home;