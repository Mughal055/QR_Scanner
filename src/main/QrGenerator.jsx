import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../component/Header';
import TypeCard from '../component/TypeCard';
import { useMMKVBoolean } from 'react-native-mmkv';

const QrGenerator = () => {
  const navigation = useNavigation();

  // DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: dark ? '#121212' : '#FFFFFF' },
      ]}>

      <Header title="QR GENERATE" />

      <View style={styles.grid}>
        <TypeCard
          title="URL"
          onPress={() => navigation.navigate('QRurl')}
          icon="link-outline"
          dark={dark}
        />

        <TypeCard
          title="Text"
          onPress={() => navigation.navigate('QRtext')}
          icon="text"
          dark={dark}
        />

        <TypeCard
          title="Email"
          onPress={() => navigation.navigate('QRemail')}
          icon="mail-outline"
          dark={dark}
        />

        <TypeCard
          title="Phone"
          onPress={() => navigation.navigate('QrPhone')}
          icon="call-outline"
          dark={dark}
        />

        <TypeCard
          title="Contact"
          onPress={() => navigation.navigate('QrContact')}
          icon="chatbox-ellipses-outline"
          dark={dark}
        />

        <TypeCard
          title="SMS"
          onPress={() => navigation.navigate('QrSMS')}
          icon="chatbox-ellipses-outline"
          dark={dark}
        />

        <TypeCard
          title="VCard"
          onPress={() => navigation.navigate('QrVcard')}
          icon="id-card-outline"
          dark={dark}
        />

        <TypeCard
          title="WhatsApp"
          onPress={() => navigation.navigate('QrWhatsapp')}
          icon="logo-whatsapp"
          dark={dark}
        />

        <TypeCard
          title="WiFi"
          onPress={() => navigation.navigate('QrWifi')}
          icon="wifi"
          dark={dark}
        />
      </View>
    </SafeAreaView>
  );
};

export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 5,
  },
});