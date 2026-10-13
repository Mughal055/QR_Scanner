import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GenerateCard from '../component/GenerateCard'
import useTextHook from '../Hooks/useTextHook'
import Header from '../component/Header'

const QRtext = () => {
  const { text, setText, onClear, handleCreate } = useTextHook()

  return (
    <SafeAreaView>
      <Header icon={true} title={'QR TEXT'} />
      <GenerateCard
        type="text"
        title="QR TEXT"
        onClear={onClear}
        handleCreate={handleCreate}
        input={text}
        setInput={setText}
      />
    </SafeAreaView>
  )
}

export default QRtext