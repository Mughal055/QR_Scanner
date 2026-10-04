import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Header from './component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const History = () => {
    const [ActiveTab, setActiveTab] = useState(true)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title={'History'} />

            {/*  scanner Content */}
            
            <View style={{backgroundColor:'red'}}>
                {ActiveTab &&<View>
                <Text>edit</Text>
                <Text>edit</Text>
                <Text>edit</Text>
                <Text>edit</Text>
            </View>}
            </View>

           {/*  Generated Content */}

            <View style={{backgroundColor:'blue'}}>
                {!ActiveTab &&<View>
                <Text>edit</Text>
                <Text>edit</Text>
                <Text>edit</Text>
                <Text>edit</Text>
            </View>}
            </View>

            {/* toggle btn */}

            <View style={{flex:1,justifyContent:'flex-end',marginVertical:15}}>
            <View style={ActiveTab?{flexDirection:'row',justifyContent:'center'} : {flexDirection:'row-reverse',justifyContent:'center'}}>
            <View style={ styles.activeView}/>
            <TouchableOpacity onPress={()=>setActiveTab(!ActiveTab)}>
            <View style={ styles.unActiveView}/>
            </TouchableOpacity>
            </View>

            {/* toggle text */}
            
            <View >
                {ActiveTab &&<Text style={styles.text}>Scanned History</Text>}
                 {!ActiveTab &&<Text style={styles.text}>Generated History</Text>}
            </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    activeView:{borderColor:'#000',borderWidth:2,borderRadius:15,margin:5,padding:2,width:32,height:17},
    unActiveView:{borderColor:'#6e6c6c',borderWidth:2,borderRadius:50,margin:5,padding:2,width:17,height:17},
    mainView:{flexDirection:'row'},
    text:{textAlign:'center',fontWeight:'bold'}
})
export default History