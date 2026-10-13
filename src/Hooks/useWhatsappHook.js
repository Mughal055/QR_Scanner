import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const useWhatsappHook = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const onClear = () => {
    setPhone('')
    setMessage('')
  }

  const handleCreate = () => {
    // wa.me ko sirf digits chahiye (country code ke saath, + aur spaces ke baghair)
    const digits = phone.replace(/\D/g, '')
    const text = message.trim() ? `?text=${encodeURIComponent(message)}` : ''
    const value = `https://wa.me/${digits}${text}`
    navigation.navigate('QR', { qrData: value })
  }

  return { phone, setPhone, message, setMessage, onClear, handleCreate }
}

export default useWhatsappHook