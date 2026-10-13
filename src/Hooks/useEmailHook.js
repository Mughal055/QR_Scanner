import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const useEmailHook = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const onClear = () => {
    setEmail('')
    setSubject('')
    setBody('')
  }

  const handleCreate = () => {
    const value = `mailto:${email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    navigation.navigate('QR', { qrData: value })
  }

  return { email, setEmail, subject, setSubject, body, setBody, onClear, handleCreate }
}

export default useEmailHook