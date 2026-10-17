import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useVcardHook from '../Hooks/useVcardHook'
import { useMMKVBoolean } from 'react-native-mmkv'

const QrVcard = () => {
  const vcard = useVcardHook()

 // DARK MODE
   const [dark] = useMMKVBoolean('darkTheme');
 
   return (
     <SafeAreaView
       style={{
         flex: 1,
         backgroundColor: dark ? '#121212' : '#FFFFFF',
       }}
     >
      <Header icon={true} title="QR VCARD" />
      <GenerateCard
        type="vcard"
        onClear={vcard.onClear}
        handleCreate={vcard.handleCreate}
        vcard={vcard}
      />
    </SafeAreaView>
  )
}

export default QrVcard