import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'
import URLQR from './URLQR'
import Header from './Header'
import TEXTQR from './TEXTQR'
import useGenerateHook from '../Hooks/useGenerateHook'

const GenerateCard = ({ type,onClear, onCreate, input, setInput  }) => {
  const navigation = useNavigation()

  const handleCreate = () => {
    const value = input ?input : 'https://www.google.com/'
    onCreate()
    // state async update hoti hai, isliye seedha current input bhej rahe hain
    navigation.navigate('QR', { qrData: value })
  }

  return (
    <>
      <Header icon={true} title={'QR URL'} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
            {/*  */}
          {type === 'url' && <URLQR input={input} setInput={setInput} />}
          {type === 'text' && <TEXTQR input={input} setInput={setInput}/>}
          {/*  */}
        </View>

        <View style={{ flexDirection: 'row' }}>
          {/* Clear button */}
          <TouchableOpacity onPress={onClear} style={styles.card}>
            <Ionicons name="trash-bin" size={20} />
            <Text style={styles.btnText}>Clear</Text>
          </TouchableOpacity>

          {/* Create button */}
          <TouchableOpacity style={styles.card} onPress={handleCreate}>
            <Ionicons name="qr-code-outline" size={20} />
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    minHeight: 120,
    maxHeight: '100%',
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