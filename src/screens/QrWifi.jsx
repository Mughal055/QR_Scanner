import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import GenerateCard from '../component/GenerateCard'
import useWifiHook from '../Hooks/useWifiHook'

const QrWifi = () => {
  const {
    ssid, setSsid,
    password, setPassword,
    encryption, setEncryption,
    onClear, handleCreate,
  } = useWifiHook()

  return (
    <SafeAreaView>
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