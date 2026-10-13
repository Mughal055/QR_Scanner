import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const PHONEQR = ({ input, setInput }) => {
  return (
    <View>
      <TextInput
        placeholder="Phone"
        value={input}
        onChangeText={setInput}
        keyboardType="phone-pad"
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    padding: 20,
    borderColor: '#9c9494',
  },
})

export default PHONEQR