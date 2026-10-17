import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import ScanHistoryCard from '../component/ScanHistoryCard'
import { useMMKVBoolean } from 'react-native-mmkv'

const ScanDone = ({route}) => {
    const {item} = route.params
  // DARK MODE
    const [dark] = useMMKVBoolean('darkTheme');
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: dark ? '#121212' : '#FFFFFF',
        }}
      >
        <Header icon={'arrow-back'} title={'QR SCANNED'} />
      <ScanHistoryCard item={route.params.item} />
    </SafeAreaView>
  )
}

export default ScanDone