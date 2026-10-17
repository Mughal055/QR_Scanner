import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useMMKVBoolean } from 'react-native-mmkv'                // DARK

// Icon wala input, har screen mein yahi use hoga (WiFi aur VCard jaisa design)
const IconInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  multiline = false,
  last = false, // aakhri input ke neeche extra gap
}) => {
  // DARK: Settings mein Dark Mode badalte hi ye input khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme')

  return (
    <View
      style={[
        styles.box,
        multiline && styles.boxMultiline,
        last && styles.last,
      ]}>
      <Ionicons
        name={icon}
        size={24}
        color="#9c9494"
        style={[styles.icon, multiline && styles.iconMultiline]}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={dark ? '#8a8a8a' : '#9c9494'}       // DARK
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType ? 'none' : 'sentences'}
        multiline={multiline}
        style={[styles.input, dark && styles.inputDark, multiline && styles.inputMultiline]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#9c9494',
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  boxMultiline: { alignItems: 'flex-start' },
  last: { marginBottom: 20 },
  icon: { marginRight: 10 },
  iconMultiline: { marginTop: 18 },
  input: { flex: 1, paddingVertical: 20, fontSize: 16, color: '#000' },
  // DARK: dark mein likha hua text safed
  inputDark: { color: '#fff' },
  inputMultiline: { minHeight: 100, textAlignVertical: 'top' },
})

export default IconInput