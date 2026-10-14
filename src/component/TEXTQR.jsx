import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const TEXTQR = ({ input, setInput }) => {
  return (
    <View>
      <IconInput
        icon="text"
        placeholder="Text"
        value={input}
        onChangeText={setInput}
        multiline
        last
      />
    </View>
  )
}

export default TEXTQR