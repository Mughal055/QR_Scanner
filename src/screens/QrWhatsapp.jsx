import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useWhatsappHook from '../Hooks/useWhatsappHook'

const QrWhatsapp = () => {
  const {
    phone, setPhone,
    message, setMessage,
    onClear, handleCreate,
  } = useWhatsappHook()

  return (
    <SafeAreaView>
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