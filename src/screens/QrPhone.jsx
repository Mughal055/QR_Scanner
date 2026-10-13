import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import usePhoneHook from '../Hooks/usePhoneHook'

const QrPhone = () => {
  const { phone, setPhone, onClear, handleCreate } = usePhoneHook()

  return (
    <SafeAreaView>
      <Header icon={true} title="QR PHONE" />
      <GenerateCard
        type="phone"
        onClear={onClear}
        handleCreate={handleCreate}
        input={phone}
        setInput={setPhone}
      />
    </SafeAreaView>
  )
}

export default QrPhone