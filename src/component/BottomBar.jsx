import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

const BottomBar = ({ state, navigation }) => {
  // state.index: 0 = Create, 1 = Scan, 2 = History
  const current = state.index;

  return (
    <View style={styles.container}>
      {/* Create */}
      <TouchableOpacity
        style={[styles.tab, current === 0 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('Create')}>
        <Ionicons name="add-circle-outline" size={22} color={current === 0 ? '#000' : '#7e7878'} />
        {current === 0 && <Text style={styles.title}>Create QR</Text>}
      </TouchableOpacity>

      {/* Scan */}
      <TouchableOpacity
        style={[styles.tab, current === 1 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('Scan')}>
        <Ionicons name="camera-outline" size={22} color={current === 1 ? '#000' : '#7e7878'} />
        {current === 1 && <Text style={styles.title}>Scan QR</Text>}
      </TouchableOpacity>

      {/* History */}
      <TouchableOpacity
        style={[styles.tab, current === 2 ? styles.active : styles.inactive]}
        onPress={() => navigation.navigate('History')}>
        <Ionicons name="time-outline" size={22} color={current === 2 ? '#000' : '#7e7878'} />
        {current === 2 && <Text style={styles.title}>History</Text>}
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
  active: { paddingHorizontal: 18 },
  inactive: { width: 72 },
  title: { color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});