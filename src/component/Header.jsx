import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useMMKVBoolean } from 'react-native-mmkv';                // DARK

const Header = ({ title, icon,settings }) => {
  const navigation = useNavigation();
  // DARK: Settings mein Dark Mode badalte hi header khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme');
  const iconColor = dark ? '#fff' : '#000';                        // DARK

  return (
    <View style={styles.container}>
      {/* Back button */}
       {icon?(
        <TouchableOpacity
          style={[styles.button, dark && styles.buttonDark]}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} size={22} color={iconColor} />
        </TouchableOpacity>)
       :(
        <View style={styles.placeholder} ></View>
       )}

      {/* Title */}
      <Text style={[styles.title, dark && styles.titleDark]}>{title}</Text>

      {/* Menu button */}
     {settings?  <View style={styles.placeholder} ></View>:
     ( <TouchableOpacity
        style={[styles.button, dark && styles.buttonDark]}
        activeOpacity={0.7}
        onPress={()=>navigation.navigate('Settings')}>
        <Ionicons name="menu" size={22} color={iconColor} />
      </TouchableOpacity>)
      }
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
  // DARK: button ka background aur border
  buttonDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#000',
    textAlign:'center'
  },
  // DARK: title safed
  titleDark: {
    color: '#fff',
  },
  placeholder:{
    height:55,
    width:55
  }
});