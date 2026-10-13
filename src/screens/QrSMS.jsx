import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useSmsHook from '../Hooks/useSmsHook'

const QrSMS = () => {
  const {
    phone, setPhone,
    message, setMessage,
    onClear, handleCreate,
  } = useSmsHook()

  return (
    <SafeAreaView>
      <Header icon={true} title="QR SMS" />
      <GenerateCard
        type="sms"
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

export default QrSMS