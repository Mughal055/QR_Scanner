import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking,
    Share,
    ToastAndroid,
    StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import Clipboard from '@react-native-clipboard/clipboard'

const ScanHistoryCard = ({ item }) => {
    const [DropDown, setDropDown] = useState(false)

    // hooks ke baad hi return karein (hooks ka order na bigde)
    if (!item) return null

    const date = item.created_at ? new Date(item.created_at) : new Date()
    const isUrl = /^https?:\/\//i.test(item.content ?? '')

    // ---------- Open ----------
    const Open = async () => {
        if (!isUrl) {
            ToastAndroid.show('Yeh link nahi hai', ToastAndroid.SHORT)
            return
        }
        try {
            await Linking.openURL(item.content)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Link open nahi ho saka', ToastAndroid.SHORT)
        }
    }

    // ---------- Share ----------
    const send = async () => {
        try {
            await Share.share({ message: item.content ?? '' })
        } catch (err) {
            console.log(err)
        }
    }

    // ---------- Copy ----------
    const Copy = () => {
        Clipboard.setString(item.content ?? '')
        ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    }

    return (
        <View>
            {/* Scan ki photo (sirf tab dikhegi jab path mila ho) */}
            {item.image ? (
                <View style={styles.image}>
                    <Image
                        source={{ uri: `file://${item.image}` }}
                        style={{ height: 150, width: 150 }}
                    />
                </View>
            ) : null}

            <View style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}>
                {/* Upar wali row */}
                <View style={DropDown ? styles.bordercard : styles.card}>
                    <Ionicons
                        name={isUrl ? 'link' : 'text'}
                        size={25}
                        color={'#706d6d'}
                    />

                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#706d6d' }}>
                            {isUrl ? 'URL' : 'Text'}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.dateTime}>{date.toLocaleDateString()}</Text>
                            <Text style={styles.dateTime}>
                                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setDropDown(!DropDown)}>
                        <Ionicons
                            name={DropDown ? 'chevron-up' : 'chevron-down'}
                            size={25}
                            color={'#706d6d'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Dropdown */}
                {DropDown && (
                    <View style={styles.dropcard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{isUrl ? 'URL:: ' : 'Text:: '}</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ flex: 1 }}
                            >
                                <Text selectable>{item.content}</Text>
                            </ScrollView>
                        </View>

                        {/* Open / Copy / Share buttons */}
                        <View style={styles.buttonsRow}>
                            <View>
                                <View style={styles.iconCard}>
                                    <TouchableOpacity onPress={Open}>
                                        <Ionicons name='open-outline' size={25} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Open</Text>
                            </View>

                            <View>
                                <View style={styles.iconCard}>
                                    <TouchableOpacity onPress={Copy}>
                                        <Ionicons name='copy-outline' size={25} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Copy</Text>
                            </View>

                            <View>
                                <View style={styles.iconCard}>
                                    <TouchableOpacity onPress={send}>
                                        <Ionicons name='share-social' size={25} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text}>Share</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 75,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 7,
    },
    bordercard: {
        height: 75,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 7,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    dropcard: {
        padding: 15,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#E5E5E5',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
    },
    buttonsRow: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'center',
    },
    dateTime: {
        color: '#7e7a7a',
        fontSize: 15,
        paddingRight: 2,
    },
    iconCard: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        elevation: 7,
        marginHorizontal: 10,
    },
    text: {
        marginTop: 8,
        textAlign: 'center',
    },
    image: {
        marginVertical: 20,
        alignSelf: 'center',
        height: 170,
        width: 170,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    },
})

export default ScanHistoryCard