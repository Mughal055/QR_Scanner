import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const SMSQR = ({ phone, setPhone, message, setMessage }) => {
  return (
    <View>
      <IconInput
        icon="call-outline"
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <IconInput
        icon="chatbox-ellipses-outline"
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        last
      />
    </View>
  )
}

export default SMSQR