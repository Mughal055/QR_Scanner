import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TEXTQR = ({input,setInput}) => {
  return (
    <View style={{borderRadius:6,borderColor:'#a3a1a1',borderWidth:2,margin:20,padding:60}}>
      <TextInput  placeholder='Text' value={input} onChangeText={setInput} multiline={true} />
    </View>
  )
}

export default TEXTQR