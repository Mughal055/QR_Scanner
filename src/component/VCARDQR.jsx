import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

const Field = ({ icon, placeholder, value, onChangeText, keyboardType, half }) => (
  <View style={[styles.box, half && styles.half]}>
    <Ionicons name={icon} size={22} color="#9c9494" style={styles.icon} />
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={keyboardType ? 'none' : 'sentences'}
      style={styles.input}
    />
  </View>
)

const VCARDQR = ({ vcard }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Field half icon="person" placeholder="First Name"
          value={vcard.first} onChangeText={vcard.setFirst} />
        <Field half icon="person" placeholder="Last Name"
          value={vcard.last} onChangeText={vcard.setLast} />
      </View>

      <View style={styles.row}>
        <Field half icon="phone-portrait-outline" placeholder="Mobile" keyboardType="phone-pad"
          value={vcard.mobile} onChangeText={vcard.setMobile} />
        <Field half icon="briefcase" placeholder="Work Phone" keyboardType="phone-pad"
          value={vcard.work} onChangeText={vcard.setWork} />
      </View>

      <Field icon="mail" placeholder="Email" keyboardType="email-address"
        value={vcard.email} onChangeText={vcard.setEmail} />

      <Field icon="location-outline" placeholder="Street"
        value={vcard.street} onChangeText={vcard.setStreet} />

      <View style={styles.row}>
        <Field half icon="business" placeholder="City"
          value={vcard.city} onChangeText={vcard.setCity} />
        <Field half icon="pricetag-outline" placeholder="Zip" keyboardType="numeric"
          value={vcard.zip} onChangeText={vcard.setZip} />
      </View>

      <Field icon="flag-outline" placeholder="State"
        value={vcard.state} onChangeText={vcard.setState} />

      <Field icon="earth-outline" placeholder="Country"
        value={vcard.country} onChangeText={vcard.setCountry} />

      <Field icon="globe-outline" placeholder="Website" keyboardType="url"
        value={vcard.website} onChangeText={vcard.setWebsite} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { padding: 14 },
  row: { flexDirection: 'row' },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#9c9494',
    marginHorizontal: 6,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  half: { flex: 1 },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 18, fontSize: 15 },
})

export default VCARDQR