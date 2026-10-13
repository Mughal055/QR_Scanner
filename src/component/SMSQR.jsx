import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const SMSQR = ({ phone, setPhone, message, setMessage }) => {
  return (
    <View>
      <TextInput
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline={true}
        style={[styles.input, styles.multiline]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    marginBottom: 0,
    padding: 20,
    borderColor: '#9c9494',
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
})

export default SMSQR