import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useVcardHook from '../Hooks/useVcardHook'

const QrVcard = () => {
  const vcard = useVcardHook()

  return (
    <SafeAreaView style={{ flex: 1 }}>
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