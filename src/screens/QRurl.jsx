import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GenerateCard from '../component/GenerateCard'
import useGenerateHook from '../Hooks/useGenerateHook'
import Header from '../component/Header'
import { useMMKVBoolean } from 'react-native-mmkv'

const QRurl = () => {
  // Hook sirf yahan call hoga, baqi components ko props milenge
  const { onClear, handleCreate, qrData, input, setInput } = useGenerateHook()

 // DARK MODE
   const [dark] = useMMKVBoolean('darkTheme');
 
   return (
     <SafeAreaView
       style={{
         flex: 1,
         backgroundColor: dark ? '#121212' : '#FFFFFF',
       }}
     >
      <Header icon={true} title={'QR URL'} />
      <GenerateCard
        type='url'
        onClear={onClear}
        handleCreate={handleCreate}
        qrData={qrData}
        input={input}
        setInput={setInput}
      />
    </SafeAreaView>
  )
}

export default QRurl