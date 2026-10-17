import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useMMKVBoolean } from 'react-native-mmkv'                // DARK

const OPTIONS = [
  { label: 'WPA', value: 'WPA' },
  { label: 'WEP', value: 'WEP' },
  { label: 'None', value: 'nopass' },
]

const WIFIQR = ({
  ssid, setSsid,
  password, setPassword,
  encryption, setEncryption,
}) => {
  const [open, setOpen] = useState(false)
  const selected = OPTIONS.find(o => o.value === encryption)
  // DARK: Settings mein Dark Mode badalte hi ye khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme')
  const textColor = dark ? '#fff' : '#000'
  const placeholderColor = dark ? '#8a8a8a' : '#9c9494'

  return (
    <View>
      {/* Network name */}
      <View style={styles.inputBox}>
        <Ionicons name="wifi" size={24} color="#9c9494" style={styles.icon} />
        <TextInput
          placeholder="Network Name"
          placeholderTextColor={placeholderColor}
          value={ssid}
          onChangeText={setSsid}
          autoCapitalize="none"
          style={[styles.input, { color: textColor }]}
        />
      </View>

      {/* Password (None par chhup jata hai) */}
      {encryption !== 'nopass' && (
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={24} color="#9c9494" style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={placeholderColor}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            style={[styles.input, { color: textColor }]}
          />
        </View>
      )}

      {/* Encryption type dropdown */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Encryption Type:</Text>

        <View>
          <TouchableOpacity style={[styles.dropdown, dark && styles.dropdownDark]} onPress={() => setOpen(!open)}>
            <Text style={[styles.dropdownText, { color: textColor }]}>{selected?.label}</Text>
            <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={textColor} />
          </TouchableOpacity>

          {open && (
            <View style={[styles.list, dark && styles.listDark]}>
              {OPTIONS.map(o => (
                <TouchableOpacity
                  key={o.value}
                  style={styles.item}
                  onPress={() => {
                    setEncryption(o.value)
                    setOpen(false)
                  }}>
                  <Text style={[styles.itemText, { color: textColor }, o.value === encryption && styles.itemActive]}>
                    {o.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#9c9494',
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 20, fontSize: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
  label: { fontSize: 16, marginRight: 8, marginTop: 8 },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 110,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
  },
  // DARK: dropdown ke neeche ki line
  dropdownDark: { borderBottomColor: '#555' },
  dropdownText: { fontSize: 16 },
  list: {
    width: 110,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  // DARK: khuli hui list
  listDark: { backgroundColor: '#2a2a2a', borderColor: '#444' },
  item: { paddingVertical: 10, paddingHorizontal: 8 },
  itemText: { fontSize: 16 },
  itemActive: { fontWeight: 'bold' },
})

export default WIFIQR