import { View, Text } from 'react-native'
import React,{useState} from 'react'
import QRCode from 'react-native-qrcode-svg'

 const useGenerateHook = () => {
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

   return {onClear,qrData,setqrData,input,setInput,onCreate,}
  
}
export default useGenerateHook