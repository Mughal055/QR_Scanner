import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GenerateCard from '../component/GenerateCard'
import useTextHook from '../Hooks/useTextHook'
import Header from '../component/Header'
import { useMMKVBoolean } from 'react-native-mmkv'

const QRtext = () => {
  const { text, setText, onClear, handleCreate } = useTextHook()
// DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? '#121212' : '#FFFFFF',
      }}
    >
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