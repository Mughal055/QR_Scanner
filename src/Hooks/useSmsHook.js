import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const useSmsHook = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const onClear = () => {
    setPhone('')
    setMessage('')
  }

  const handleCreate = () => {
    // spaces aur dashes hata do, sirf digits aur + rakho
    const cleanedPhone = phone.replace(/[^\d+]/g, '')
    const value = `SMSTO:${cleanedPhone}:${message}`
    navigation.navigate('QR', { qrData: value })
  }

  return { phone, setPhone, message, setMessage, onClear, handleCreate }
}

export default useSmsHook