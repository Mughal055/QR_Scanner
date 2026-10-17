import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useWhatsappHook from '../Hooks/useWhatsappHook'
import { useMMKVBoolean } from 'react-native-mmkv'

const QrWhatsapp = () => {
  const {
    phone, setPhone,
    message, setMessage,
    onClear, handleCreate,
  } = useWhatsappHook()

// DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? '#121212' : '#FFFFFF',
      }}
    >
      <Header icon={true} title="QR WHATSAPP" />
      <GenerateCard
        type="whatsapp"
        onClear={onClear}
        handleCreate={handleCreate}
        phone={phone}
        setPhone={setPhone}
        message={message}
        setMessage={setMessage}
      />
    </SafeAreaView>
  )
}

export default QrWhatsapp