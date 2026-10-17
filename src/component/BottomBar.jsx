import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useMMKVBoolean } from 'react-native-mmkv';                // DARK

const BottomBar = ({ state, navigation }) => {
  // state.index: 0 = Create, 1 = Scan, 2 = History
  const current = state.index;
  // DARK: Settings mein Dark Mode badalte hi bar khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme');
  const activeColor = dark ? '#fff' : '#000';                      // DARK: active icon aur text ka rang

  return (
    <View style={[styles.container, dark && styles.containerDark]}>
      {/* Create */}
      <TouchableOpacity
        style={[styles.tab, dark && styles.tabDark, current === 0 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('Create')}>
        <Ionicons name="add-circle-outline" size={22} color={current === 0 ? activeColor : '#7e7878'} />
        {current === 0 && <Text style={[styles.title, dark && styles.titleDark]}>Create QR</Text>}
      </TouchableOpacity>

      {/* Scan */}
      <TouchableOpacity
        style={[styles.tab, dark && styles.tabDark, current === 1 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('Scan')}>
        <Ionicons name="camera-outline" size={22} color={current === 1 ? activeColor : '#7e7878'} />
        {current === 1 && <Text style={[styles.title, dark && styles.titleDark]}>Scan QR</Text>}
      </TouchableOpacity>

      {/* History */}
      <TouchableOpacity
        style={[styles.tab, dark && styles.tabDark, current === 2 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('History')}>
        <Ionicons name="time-outline" size={22} color={current === 2 ? activeColor : '#7e7878'} />
        {current === 2 && <Text style={[styles.title, dark && styles.titleDark]}>History</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  // DARK: bar ka background
  containerDark: { backgroundColor: '#121212' },
  tab: {
    height: 62,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  // DARK: tab ka background aur border
  tabDark: { backgroundColor: '#1e1e1e', borderColor: '#333' },
  active: { paddingHorizontal: 18 },
  inactive: { width: 72 },
  title: { color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  // DARK: active tab ka text safed
  titleDark: { color: '#fff' },
});