import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

// vCard mein \ ; , aur new line special hain
const esc = s =>
  (s || '').trim().replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n')

const digits = s => (s || '').replace(/[^\d+]/g, '')

const useVcardHook = () => {
  const navigation = useNavigation()

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [mobile, setMobile] = useState('')
  const [work, setWork] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [website, setWebsite] = useState('')

  const onClear = () => {
    setFirst('')
    setLast('')
    setMobile('')
    setWork('')
    setEmail('')
    setStreet('')
    setCity('')
    setZip('')
    setState('')
    setCountry('')
    setWebsite('')
  }

  const handleCreate = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${esc(last)};${esc(first)}`,
      `FN:${`${esc(first)} ${esc(last)}`.trim()}`,
      mobile && `TEL;TYPE=CELL:${digits(mobile)}`,
      work && `TEL;TYPE=WORK,VOICE:${digits(work)}`,
      email && `EMAIL:${email.trim()}`,
      (street || city || state || zip || country) &&
        `ADR;TYPE=WORK:;;${esc(street)};${esc(city)};${esc(state)};${esc(zip)};${esc(country)}`,
      website && `URL:${website.trim()}`,
      'END:VCARD',
    ].filter(Boolean) // khali fields ki lines hata do

    navigation.navigate('QR', { qrData: lines.join('\n') })
  }

  return {
    first, setFirst,
    last, setLast,
    mobile, setMobile,
    work, setWork,
    email, setEmail,
    street, setStreet,
    city, setCity,
    zip, setZip,
    state, setState,
    country, setCountry,
    website, setWebsite,
    onClear,
    handleCreate,
  }
}

export default useVcardHook