import { View, Text ,StyleSheet, TouchableOpacity, Share} from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../component/Header'
import Ionicons from '@react-native-vector-icons/ionicons'

const QR = () => {
  const route = useRoute()
  const {qrData} = route.params ?? {}
  // 
  const send=async()=>{
    try {
      await Share.share({message: qrData || ''})
    } catch (err) {
      console.log(err);
      
    }
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <Header icon={true} title={'QR GENERATED'} />
    <View style={{justifyContent:'center',alignItems:'center',marginVertical:50}}>
      {/*  */}
      <View style={{borderWidth: 1,borderColor: '#E5E5E5', backgroundColor: '#fff',elevation: 7,padding:10}}>
      <QRCode value={qrData} size={250} style={{}} /></View>
      {/*  */}
      <View style={{flexDirection:'row',marginVertical:30}}> 
      <TouchableOpacity style={styles.card} onPress={send}>
            <Ionicons name="share-social" size={20} />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={styles.card}>
            <Ionicons name="save" size={20} />
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity></View>
          {/*  */}
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  btnText: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15
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
})

export default QR