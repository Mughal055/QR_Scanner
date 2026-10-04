import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, icon }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back button */}
       {icon ? (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <Ionicons name={icon} size={22} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Menu button */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={()=>navigation.navigate('Settings')}>
        <Ionicons name="menu" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#000',
  },
});