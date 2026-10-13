import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const useTextHook = () => {
  const navigation = useNavigation()
  const [text, setText] = useState('')

  const onClear = () => setText('')

  const handleCreate = () => {
    // text khali ho to default text, QR library khali value par error deti hai
    const value = text.trim() ? text : 'Hello'
    navigation.navigate('QR', { qrData: value })
  }

  return { text, setText, onClear, handleCreate }
}

export default useTextHook