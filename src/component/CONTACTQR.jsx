import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const CONTACTQR = ({ name, setName, phone, setPhone, email, setEmail }) => {
  return (
    <View>
      <IconInput
        icon="person-outline"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <IconInput
        icon="call-outline"
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <IconInput
        icon="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        last
      />
    </View>
  )
}

export default CONTACTQR