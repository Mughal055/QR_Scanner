import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const EMAILQR = ({ email, setEmail, subject, setSubject, body, setBody }) => {
  return (
    <View>
      <TextInput
        placeholder="To"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline={true}
        style={[styles.input, styles.multiline]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
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

export default EMAILQR