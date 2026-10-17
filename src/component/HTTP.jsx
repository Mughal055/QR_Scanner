import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useMMKVBoolean } from 'react-native-mmkv'                // DARK

const HTTP = ({icon,title,onPress}) => { 
  // DARK: Settings mein Dark Mode badalte hi ye button khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme')

  return (
    <View style={{backgroundColor: dark ? '#2a2a2a' : '#e0dddd',borderColor: dark ? '#444' : '#e0dddd',elevation:5,borderRadius:5,borderWidth:1,
        height:35,width:100,margin:10
    }}>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={onPress}>
        <Ionicons name={icon} size={20} color={dark ? '#fff' : '#000'} />
        <Text style={{margin:5,fontWeight:'bold', color: dark ? '#fff' : '#000'}}  >{title}</Text>
         </TouchableOpacity>
     </View>
  )
}

export default HTTP