import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GenerateCard from '../component/GenerateCard'
import useGenerateHook from '../Hooks/useGenerateHook'

const QRurl = () => {
  // Hook sirf yahan call hoga, baqi components ko props milenge
  const { onClear, onCreate, qrData, input, setInput } = useGenerateHook()

  return (
    <SafeAreaView>
      <GenerateCard
        type='url'
        onClear={onClear}
        onCreate={onCreate}
        qrData={qrData}
        input={input}
        setInput={setInput}
      />
    </SafeAreaView>
  )
}

export default QRurl