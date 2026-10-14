import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Modal,
    Linking,
    Share,
    ToastAndroid,
    StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import Clipboard from '@react-native-clipboard/clipboard'
import QRCode from 'react-native-qrcode-svg'

// type ke hisaab se icon
const ICONS = {
    url: 'link',
    text: 'text',
    email: 'mail',
    phone: 'call',
    sms: 'chatbox-ellipses',
    whatsapp: 'logo-whatsapp',
    wifi: 'wifi',
    contact: 'person',
    vcard: 'id-card',
}

// Open dabane par kaunsa link kholna hai (null matlab open nahi ho sakta)
const getOpenLink = (type, value) => {
    if (type === 'url') {
        return /^https?:\/\//i.test(value) ? value : `https://${value}`
    }
    if (type === 'email' || type === 'phone' || type === 'whatsapp') {
        return value // mailto:, tel:, https://wa.me/ pehle se link hain
    }
    if (type === 'sms') {
        // SMSTO:number:message  ->  sms:number?body=message
        const [, number = '', ...rest] = value.split(':')
        const message = rest.join(':')
        return `sms:${number}${message ? `?body=${encodeURIComponent(message)}` : ''}`
    }
    return null // text, wifi, contact, vcard
}

const ScanHistoryCard = ({ item, onDelete, showQr }) => {
    const [DropDown, setDropDown] = useState(false)
    const [qrOpen, setQrOpen] = useState(false) // QR popup

    // hooks ke baad hi return karein (hooks ka order na bigde)
    if (!item) return null

    // scan mein 'content' hota hai, generate mein 'value'
    const value = item.value ?? item.content ?? ''
    const isUrl = /^https?:\/\//i.test(value)
    // generate mein type column se, scan mein andaza (URL ya Text)
    const type = item.type ?? (isUrl ? 'url' : 'text')
    const date = item.created_at ? new Date(item.created_at) : new Date()
    const openLink = getOpenLink(type, value)

    // ---------- Open ----------
    const Open = async () => {
        if (!openLink) {
            ToastAndroid.show('Yeh open nahi ho sakta', ToastAndroid.SHORT)
            return
        }
        try {
            await Linking.openURL(openLink)
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Open nahi ho saka', ToastAndroid.SHORT)
        }
    }

    // ---------- Share ----------
    const send = async () => {
        try {
            await Share.share({ message: value })
        } catch (err) {
            console.log(err)
        }
    }

    // ---------- Copy ----------
    const Copy = () => {
        Clipboard.setString(value)
        ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    }

    return (
        <View>
            <View style={{ width: 300, alignSelf: 'center', marginVertical: 10 }}>
                {/* Upar wali row */}
                <View style={DropDown ? styles.bordercard : styles.card}>
                    <Ionicons
                        name={ICONS[type] ?? 'text'}
                        size={25}
                        color={'#706d6d'}
                    />

                    <View>
                        <Text style={{ fontWeight: 'bold', color: '#706d6d' }}>
                            {type.toUpperCase()}
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
                            <Text style={{ fontWeight: 'bold' }}>{type.toUpperCase()}:: </Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ flex: 1 }}
                            >
                                <Text selectable>{value}</Text>
                            </ScrollView>
                        </View>

                        {/* Open / Copy / Share / QR / Delete buttons */}
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

                            {/* QR button: sirf generate mein (showQr) */}
                            {showQr && (
                                <View>
                                    <View style={styles.iconCard}>
                                        <TouchableOpacity onPress={() => setQrOpen(true)}>
                                            <Ionicons name='qr-code-outline' size={25} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.text}>QR</Text>
                                </View>
                            )}

                            {/* Delete button: sirf jab onDelete mile */}
                            {onDelete && (
                                <View>
                                    <View style={styles.iconCard}>
                                        <TouchableOpacity onPress={onDelete}>
                                            <Ionicons name='trash-outline' size={25} color='#c0392b' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.text}>Delete</Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>

            {/* QR popup */}
            <Modal
                visible={qrOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setQrOpen(false)}>
                {/* andhera background, is par tap karne se band ho jata hai */}
                <Pressable style={styles.overlay} onPress={() => setQrOpen(false)}>
                    {/* andar wale box par tap se band na ho */}
                    <Pressable style={styles.popup} onPress={() => {}}>
                        <QRCode value={value || ' '} size={220} />
                        <Text style={styles.popupType}>{type.toUpperCase()}</Text>
                    </Pressable>
                </Pressable>
            </Modal>
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
        flexWrap: 'wrap', // 5 buttons ek row mein na aayein to neeche chale jayen
        marginVertical: 20,
        justifyContent: 'center',
    },
    dateTime: {
        color: '#7e7a7a',
        fontSize: 15,
        paddingRight: 2,
    },
    iconCard: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
        elevation: 7,
        marginHorizontal: 4,
        marginBottom: 4,
    },
    text: {
        marginTop: 4,
        marginBottom: 8,
        textAlign: 'center',
    },

    // QR popup
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
    },
    popupType: {
        marginTop: 16,
        fontWeight: 'bold',
        color: '#706d6d',
    },
})

export default ScanHistoryCard