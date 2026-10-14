import { View } from 'react-native'
import React from 'react'
import IconInput from './IconInput'

const EMAILQR = ({ email, setEmail, subject, setSubject, body, setBody }) => {
  return (
    <View>
      <IconInput
        icon="at"
        placeholder="To"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <IconInput
        icon="mail-outline"
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <IconInput
        icon="chatbox-outline"
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        last
      />
    </View>
  )
}

export default EMAILQR