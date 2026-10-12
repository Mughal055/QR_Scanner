import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList } from 'react-native'
import React,{useState} from 'react'
import Header from './component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScanHistoryCard from './component/ScanHistoryCard'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { getScan } from './Database/Models'

const History = () => {
    const [ActiveTab, setActiveTab] = useState(true)
    const [scan, setScan] = useState([])
    // 
    useFocusEffect(
        useCallback(()=>{
            getScan().then(setScan).catch(console.log)
        },[])
    )
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={'History'} />

            {/*  scanner Content */}
            
            
                {ActiveTab && (
                <FlatList
                    style={{ flex: 1 }}
                    data={scan}
                    keyExtractor={(item) => String(item.id)}
                    ListEmptyComponent={<Text style={styles.text}>Abhi koi scan nahi hai</Text>}
                    renderItem={({ item }) => <ScanHistoryCard item={item} />}
                />
            )}
            

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

            <View style={{justifyContent:'flex-end',marginVertical:15}}>
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