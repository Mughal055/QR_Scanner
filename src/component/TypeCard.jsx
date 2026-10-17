import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useMMKVBoolean } from 'react-native-mmkv';                // DARK

const TypeCard = ({ title, icon, onPress }) => {
  // DARK: Settings mein Dark Mode badalte hi ye card khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={[styles.card, dark && styles.cardDark]} activeOpacity={0.7} onPress={onPress}>
        <Ionicons name={icon} size={30} color={dark ? '#fff' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.label, dark && styles.labelDark]}>{title}</Text>
    </View>
  );
};

export default TypeCard;

const styles = StyleSheet.create({
  wrapper: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 22,
  },
  card: {
    width: 74,
    height: 74,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  // DARK: card ka background
  cardDark: {
    backgroundColor: '#1e1e1e',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  // DARK: label safed
  labelDark: {
    color: '#fff',
  },
});