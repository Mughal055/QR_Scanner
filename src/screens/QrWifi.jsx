import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useWifiHook from '../Hooks/useWifiHook'
import { useMMKVBoolean } from 'react-native-mmkv'

const QrWifi = () => {
  const {
    ssid, setSsid,
    password, setPassword,
    encryption, setEncryption,
    onClear, handleCreate,
  } = useWifiHook()

  // DARK MODE
    const [dark] = useMMKVBoolean('darkTheme');
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: dark ? '#121212' : '#FFFFFF',
        }}
      >
      <Header icon={true} title="QR WIFI" />
      <GenerateCard
        type="wifi"
        onClear={onClear}
        handleCreate={handleCreate}
        ssid={ssid}
        setSsid={setSsid}
        password={password}
        setPassword={setPassword}
        encryption={encryption}
        setEncryption={setEncryption}
      />
    </SafeAreaView>
  )
}

export default QrWifi