import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useContactHook from '../Hooks/useContactHook'

const QrContact = () => {
  const {
    name, setName,
    phone, setPhone,
    email, setEmail,
    onClear, handleCreate,
  } = useContactHook()

  return (
    <SafeAreaView>
      <Header icon={true} title="QR CONTACT" />
      <GenerateCard
        type="contact"
        onClear={onClear}
        handleCreate={handleCreate}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
      />
    </SafeAreaView>
  )
}

export default QrContact