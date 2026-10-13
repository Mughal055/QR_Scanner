import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// WiFi QR mein ; , : \ " special hain, in se pehle \ lagana parta hai
const esc = s => (s || '').replace(/([\\;,:"])/g, '\\$1')

const useWifiHook = () => {
  const navigation = useNavigation()
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA') // WPA, WEP ya nopass

  const onClear = () => {
    setSsid('')
    setPassword('')
    setEncryption('WPA')
  }

  const handleCreate = () => {
    const name = esc(ssid.trim())
    const value =
      encryption === 'nopass'
        ? `WIFI:T:nopass;S:${name};;`
        : `WIFI:T:${encryption};S:${name};P:${esc(password)};;`
    navigation.navigate('QR', { qrData: value })
  }

  return {
    ssid, setSsid,
    password, setPassword,
    encryption, setEncryption,
    onClear, handleCreate,
  }
}

export default useWifiHook