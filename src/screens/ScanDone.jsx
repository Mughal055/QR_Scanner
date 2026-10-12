import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import ScanHistoryCard from '../component/ScanHistoryCard'

const ScanDone = ({route}) => {
    const {item} = route.params
  return (
    <SafeAreaView>
        <Header icon={'arrow-back'} title={'QR SCANNED'} />
      <ScanHistoryCard item={route.params.item} />
    </SafeAreaView>
  )
}

export default ScanDone