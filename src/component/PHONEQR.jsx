import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const PHONEQR = ({ input, setInput }) => {
  return (
    <View>
      <IconInput
        icon="call-outline"
        placeholder="Phone"
        value={input}
        onChangeText={setInput}
        keyboardType="phone-pad"
        last
      />
    </View>
  )
}

export default PHONEQR