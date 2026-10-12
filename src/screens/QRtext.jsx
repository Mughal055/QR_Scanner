import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GenerateCard from '../component/GenerateCard'
import useGenerateHook from '../Hooks/useGenerateHook'

const QRtext = () => {
    const { onClear, onCreate, qrData, input, setInput } = useGenerateHook()
  return (
    <SafeAreaView>
      <GenerateCard
      type='text'
      onClear={onClear}
        onCreate={onCreate}
        qrData={qrData}
        input={input}
        setInput={setInput}  />
    </SafeAreaView>
  )
}

export default QRtext