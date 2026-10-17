import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import usePhoneHook from '../Hooks/usePhoneHook'
import { useMMKVBoolean } from 'react-native-mmkv'

const QrPhone = () => {
  const { phone, setPhone, onClear, handleCreate } = usePhoneHook()

// DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? '#121212' : '#FFFFFF',
      }}
    >
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