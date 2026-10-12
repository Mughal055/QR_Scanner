import { View, Text ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import useGenerateHook from '../Hooks/useGenerateHook'


const HTTP = ({icon,title,onPress}) => { 
  return (
    <View style={{backgroundColor:'#e0dddd',borderColor:'#e0dddd',elevation:5,borderRadius:5,borderWidth:1,
        height:35,width:100,margin:10
    }}>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={onPress}>
        <Ionicons name={icon} size={20} />
        <Text style={{margin:5,fontWeight:'bold'}}  >{title}</Text>
         </TouchableOpacity>
     </View>
  )
}

export default HTTP