import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CONTACTQR = ({ name, setName, phone, setPhone, email, setEmail }) => {
  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, styles.last]}
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
  last: {
    marginBottom: 20,
  },
})

export default CONTACTQR