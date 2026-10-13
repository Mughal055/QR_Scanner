import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// MECARD mein ; , : \ special hain, in se pehle \ lagana parta hai
const esc = s => (s || '').replace(/([\\;,:])/g, '\\$1')

const useContactHook = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const onClear = () => {
    setName('')
    setPhone('')
    setEmail('')
  }

  const handleCreate = () => {
    const cleanedPhone = phone.replace(/[^\d+]/g, '')
    const value = `MECARD:N:${esc(name.trim())};TEL:${cleanedPhone};EMAIL:${email.trim()};;`
    navigation.navigate('QR', { qrData: value })
  }

  return { name, setName, phone, setPhone, email, setEmail, onClear, handleCreate }
}

export default useContactHook