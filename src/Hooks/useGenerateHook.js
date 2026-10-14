import { View, Text } from 'react-native'
import React,{useState} from 'react'
import QRCode from 'react-native-qrcode-svg'
import { useNavigation } from '@react-navigation/native'

 const useGenerateHook = () => {
  const navigation = useNavigation()
     const [input, setInput] = useState('')
     const [qrData, setqrData] = useState('https://www.google.com/')
    // 
    const onClear=()=>{
        setInput('')
        setqrData('')
    }
    // 
    const onCreate =()=>{
      setqrData(input)
    }

    const handleCreate=()=>{
       const value = input ?input : 'https://www.google.com/'
    onCreate()
    // state async update hoti hai, isliye seedha current input bhej rahe hain
    navigation.navigate('QR', { qrData: value, type: 'uri' })
    }

   return {onClear,qrData,setqrData,input,setInput,handleCreate}
  
}
export default useGenerateHook