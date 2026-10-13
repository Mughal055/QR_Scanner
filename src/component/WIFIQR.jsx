import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

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

  return (
    <View>
      {/* Network name */}
      <View style={styles.inputBox}>
        <Ionicons name="wifi" size={24} color="#9c9494" style={styles.icon} />
        <TextInput
          placeholder="Network Name"
          value={ssid}
          onChangeText={setSsid}
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Password (None par chhup jata hai) */}
      {encryption !== 'nopass' && (
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={24} color="#9c9494" style={styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
      )}

      {/* Encryption type dropdown */}
      <View style={styles.row}>
        <Text style={styles.label}>Encryption Type:</Text>

        <View>
          <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)}>
            <Text style={styles.dropdownText}>{selected?.label}</Text>
            <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} />
          </TouchableOpacity>

          {open && (
            <View style={styles.list}>
              {OPTIONS.map(o => (
                <TouchableOpacity
                  key={o.value}
                  style={styles.item}
                  onPress={() => {
                    setEncryption(o.value)
                    setOpen(false)
                  }}>
                  <Text style={[styles.itemText, o.value === encryption && styles.itemActive]}>
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
  dropdownText: { fontSize: 16 },
  list: {
    width: 110,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  item: { paddingVertical: 10, paddingHorizontal: 8 },
  itemText: { fontSize: 16 },
  itemActive: { fontWeight: 'bold' },
})

export default WIFIQR