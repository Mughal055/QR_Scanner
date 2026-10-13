import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import URLQR from './URLQR'
import TEXTQR from './TEXTQR'
import EMAILQR from './EMAILQR'
import PHONEQR from './PHONEQR'
import CONTACTQR from './CONTACTQR'
import SMSQR from './SMSQR'
import VCARDQR from './VCARDQR'
import WIFIQR from './WIFIQR'
import WAPPQR from './WAPPQR'

const GenerateCard = ({
  vcard,
  type,
  onClear,
  handleCreate,
  input,
  setInput,
  // email aur contact
  email,
  setEmail,
  // email
  subject,
  setSubject,
  body,
  setBody,
  // contact aur sms
  name,
  setName,
  phone,
  setPhone,
  // sms
  message,
  setMessage,
  // wifi
  ssid,
  setSsid,
  password,
  setPassword,
  encryption,
  setEncryption,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {type === 'url' && <URLQR input={input} setInput={setInput} />}

        {type === 'text' && <TEXTQR input={input} setInput={setInput} />}

        {type === 'email' && (
          <EMAILQR
            email={email}
            setEmail={setEmail}
            subject={subject}
            setSubject={setSubject}
            body={body}
            setBody={setBody}
          />
        )}

        {type === 'phone' && <PHONEQR input={input} setInput={setInput} />}

        {type === 'contact' && (
          <CONTACTQR
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
          />
        )}

        {type === 'sms' && (
          <SMSQR
            phone={phone}
            setPhone={setPhone}
            message={message}
            setMessage={setMessage}
          />
        )}

        {type === 'whatsapp' && (
          <WAPPQR
            phone={phone}
            setPhone={setPhone}
            message={message}
            setMessage={setMessage}
          />
        )}

        {type === 'vcard' && <VCARDQR vcard={vcard} />}

        {type === 'wifi' && (
          <WIFIQR
            ssid={ssid}
            setSsid={setSsid}
            password={password}
            setPassword={setPassword}
            encryption={encryption}
            setEncryption={setEncryption}
          />
        )}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {/* Clear button */}
        <TouchableOpacity onPress={onClear} style={styles.card}>
          <Ionicons name="trash-bin" size={20} />
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>

        {/* Create button */}
        <TouchableOpacity onPress={handleCreate} style={styles.card}>
          <Ionicons name="qr-code-outline" size={20} />
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 120, // aakhri buttons ke neeche jagah, taake screen ke kinare se na lagen
  },
  container: {
    width: '80%',
    minHeight: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    elevation: 7,
    marginBottom: '5%',
  },
  card: {
    flexDirection: 'row',
    width: 100,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    marginHorizontal: 40,
  },
  btnText: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },
})

export default GenerateCard