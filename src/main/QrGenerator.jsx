import { ScrollView, View, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../component/Header';
import TypeCard from '../component/TypeCard';

const QrGenerator = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Header title="QR GENERATE"  />
      
        <View style={styles.grid}>
          <TypeCard title={'URL'} onPress={() => navigation.navigate('QRurl')} icon="link-outline" />
          <TypeCard title={'Text'} onPress={() => navigation.navigate('QRtext')} icon="text" />
          <TypeCard title={'Email'} onPress={() => navigation.navigate('QRemail')} icon="mail-outline" />
          <TypeCard title={'Phone'} onPress={() => navigation.navigate('QrPhone')} icon="call-outline" />
          <TypeCard title={'Contact'} onPress={() => navigation.navigate('QrContact')} icon="chatbox-ellipses-outline" />
          <TypeCard title={'SMS'} onPress={() => navigation.navigate('QrSMS')} icon="chatbox-ellipses-outline" />
          <TypeCard title={'VCard'} onPress={() => navigation.navigate('QrVcard')} icon="id-card-outline" />
          <TypeCard title={'WhatsApp'} onPress={() => navigation.navigate('QrWhatsapp')} icon="logo-whatsapp" />
          <TypeCard title={'WiFi'} onPress={() => navigation.navigate('QrWifi')} icon="wifi" />
        </View>
      
    </SafeAreaView>
  );
};

export default QrGenerator;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 5,
  },
});