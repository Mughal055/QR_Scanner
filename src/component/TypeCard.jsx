import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

const TypeCard = ({ title, icon, onPress }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
        <Ionicons name={icon} size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.label}>{title}</Text>
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
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});