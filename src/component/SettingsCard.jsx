import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

const SettingsCard = ({icon,title,desc,themebtn,onPress}) => {
    const [theme, setTheme] = useState(false)
  return (
   <View>
    <TouchableOpacity onPress={themebtn? ()=> setTheme(!theme):onPress} style={styles.card} >
    {/* CHANGED: flex:1 aur alignItems add, taake toggle card ke right end par jaye */}
    <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
      <Ionicons name={icon} size={25} style={{alignSelf:'center',}}/>
      {/*  */}
      {/* CHANGED: flex:1 add, yeh text ke baad ki saari jagah le leta hai */}
      <View style={{marginHorizontal:10,flex:1}}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
      </View>
      {/*  */}
      { themebtn && 
      <View style={{}}>
      {/* CHANGED: height/width/radius theek, marginHorizontal:30 aur alignContent hata diye, padding add */}
      <View style={{height:22,width:42,borderRadius:11,backgroundColor:'#d6d0d0',justifyContent:'center',alignSelf:'center',paddingHorizontal:2}}>
        <View style={ theme? styles.darktouch :styles.touch}></View>
      </View></View>}
      {/*  */}
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsCard
const styles = StyleSheet.create({
    card: {
        height: 70,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        elevation: 5,
        width:'80%',
        alignSelf:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    title:{
        fontWeight:'bold'
    },
    desc:{
        fontSize:12,
        color:'#757474'
    },
    // CHANGED: knob ab track ke andar poora aata hai (18), left par rehta hai
    touch:{
        width:18,
        height:18,
        backgroundColor:'#faf6f6',
        borderRadius:9,
        alignSelf:'flex-start',
        elevation:3
    },
    // CHANGED: knob right par jata hai
    darktouch:{
        width:18,
        height:18,
        backgroundColor:'#faf6f6',
        borderRadius:9,
        alignSelf:'flex-end',
        elevation:3
    }
  })