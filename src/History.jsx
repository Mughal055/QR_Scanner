import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import Header from './component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScanHistoryCard from './component/ScanHistoryCard'
import { useFocusEffect } from '@react-navigation/native'
import { getScan, getGenerate, delGenerate, delScan } from './Database/Models'        // NEW

const History = () => {
    const [ActiveTab, setActiveTab] = useState(true)
    const [scan, setScan] = useState([])
    const [items, setItems] = useState([])                                   // NEW: generate ki list

    // NEW: generate list dobara load karne ka function
    const loadGenerate = async () => {
        try {
            setItems(await getGenerate())
        } catch (e) {
            console.log(e)
        }
    }
    
    // 
    const loadScan = async () => {
    try {
        setScan(await getScan())
    } catch (e) {
        console.log(e)
    }
}

    // screen par aate hi dono lists load hoti hain
    useFocusEffect(
        useCallback(() => {
            loadScan()
            loadGenerate()                                                   // NEW
        }, [])
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
                    ListEmptyComponent={<Text style={styles.text}>There is no scan history</Text>}
                    renderItem={({ item }) => <ScanHistoryCard item={item} onDelete={async () => {
            await delScan(item.id)  
            loadScan() // database se hatao
                        // list dobara lo, card chala jata hai
        }}/>}
                />
            )}

            {/*  Generated Content */}
            {!ActiveTab && (
    <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        ListEmptyComponent={<Text style={styles.text}>There is no generate history</Text>}
        renderItem={({ item }) => (
    <ScanHistoryCard
        item={item}
        showQr
        onDelete={async () => {
            await delGenerate(item.id)
            loadGenerate()
        }}
    />
)}
    />
)}

            {/* toggle btn */}
            <View style={{ justifyContent: 'flex-end', marginVertical: 15 }}>
                <View style={ActiveTab ? { flexDirection: 'row', justifyContent: 'center' } : { flexDirection: 'row-reverse', justifyContent: 'center' }}>
                    <View style={styles.activeView} />
                    <TouchableOpacity onPress={() => setActiveTab(!ActiveTab)}>
                        <View style={styles.unActiveView} />
                    </TouchableOpacity>
                </View>

                {/* toggle text */}
                <View >
                    {ActiveTab && <Text style={styles.text}>Scanned History</Text>}
                    {!ActiveTab && <Text style={styles.text}>Generated History</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    activeView: { borderColor: '#000', borderWidth: 2, borderRadius: 15, margin: 5, padding: 2, width: 32, height: 17 },
    unActiveView: { borderColor: '#6e6c6c', borderWidth: 2, borderRadius: 50, margin: 5, padding: 2, width: 17, height: 17 },
    mainView: { flexDirection: 'row' },
    text: { textAlign: 'center', fontWeight: 'bold' }
})
export default History