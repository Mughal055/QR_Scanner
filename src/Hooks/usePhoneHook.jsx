import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const usePhoneHook = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('')

  const onClear = () => setPhone('')

  const handleCreate = () => {
    // spaces aur dashes hata do, sirf digits aur + rakho
    const cleaned = phone.replace(/[^\d+]/g, '')
    navigation.navigate('QR', { qrData: `tel:${cleaned}`, type: 'phone' })
  }

  return { phone, setPhone, onClear, handleCreate }
}

export default usePhoneHook