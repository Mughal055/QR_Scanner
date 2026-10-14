import { View, Text,StyleSheet, Linking } from 'react-native'
import React from 'react'
import Header from './component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsCard from './component/SettingsCard'
import { Share } from 'react-native'

// 
const PACKAGE = 'com.qr_scanner'
// 
const RateUs =()=>{
  try {
    Linking.openURL(`market://details?id=${PACKAGE}`)
  } catch (error) {
     Linking.openURL(`https://play.google.com/store/apps/details?id=${PACKAGE}`)
  }
}
// 
const ShareApp =()=>{
  try {
    Share.share(`https://play.google.com/store/apps/details?id=${PACKAGE}`)
  } catch (error) {
     Linking.openURL(`https://play.google.com/store/apps/details?id=${PACKAGE}`)
  }
}
const Settings = () => {
  return (
    <SafeAreaView>
      {/*  */}
      <Header icon={true} title='QR SETTINGS' settings={true}/>
      {/*  */}
      <View>
      <SettingsCard icon={'volume-mute'} title={'Vibrate'} desc={'Vibrate when scan QR code'}
       themebtn={true}  />
       {/*  */}
       <SettingsCard icon={'moon-outline'} title={'Dark Mode'} desc={'Enable dark mode'}
       themebtn={true}/>
      </View>
      {/*  */}
      <View>
        <Text style={{fontWeight:'bold',fontSize:23,margin:25}}>Support</Text>
        {/*  */}
        <SettingsCard icon={'star'} title={'Rate Us'} desc={'Rate us on playstore'} onPress={RateUs}/>
        <SettingsCard icon={'alert-circle-outline'} title={'Privacy Policy'} desc={'Read our privacy policy'} onPress={RateUs}/>
        <SettingsCard icon={'share-social'} title={'Share'} desc={'share this app'} onPress={ShareApp}/>
      </View>
    </SafeAreaView>
  )
}


export default Settings

