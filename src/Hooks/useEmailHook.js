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

    navigation.navigate('QR', {
      qrData: value,                          // QR banane ke liye
      type: 'email',                          // history ki qism
      title: email.trim() || 'Email',         // history list ka naam
      fields: { email, subject, body },       // asal fields, baad mein wapas nikalne ke liye
    })
  }

  return { email, setEmail, subject, setSubject, body, setBody, onClear, handleCreate }
}

export default useEmailHook