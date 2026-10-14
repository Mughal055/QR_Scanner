import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const WAPPQR = ({ phone, setPhone, message, setMessage }) => {
  return (
    <View>
      <IconInput
        icon="logo-whatsapp"
        placeholder="Phone (with country code)"
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

export default WAPPQR