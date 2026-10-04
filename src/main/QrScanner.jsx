import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import Header from '../component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@react-native-vector-icons/ionicons'
import Slider from '@react-native-community/slider'


const QrScanner = () => {
    // 
    const [Flash, setFlash] = useState(false)
    const [Front, setFront] = useState(false)
    const [Stop, setStop] = useState(false)
    const [scale, setScale] = useState(1)
    // 
    const device = useCameraDevice(Front? 'front' : 'back')
    const {hasPermission,requestPermission} = useCameraPermission()
    // 
    useEffect(() => {
      if (!hasPermission){ //haspermission true false      agr false h tou request permission tm popup dikhao
        requestPermission() //  request popup dikhata  
    }
    }, [hasPermission])
    
    
  return (
    <SafeAreaView style={{flex:1}}>
        <Header title={'QR SCANNING'} />
        {/*  */}
    <View style={{width:'80%',aspectRatio:1,alignSelf:'center',marginTop:50}}>
        {hasPermission &&
      <Camera device={device} isActive={Stop} style={StyleSheet.absoluteFill} zoom={scale} torchMode={Flash? 'off':'on'} />}
    </View>
    {/*  buttons */}
    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:60}}>
        {/* flash button */}
    <View>
    <View style={styles.card}>
        <TouchableOpacity onPress={()=> setFlash(!Flash)}>
            <Ionicons name={Flash? 'flash-off': 'flash'} size={25}/>
            </TouchableOpacity>
            
    </View>
    <Text style={styles.text}>{Flash? 'Off': 'On'}</Text>
    </View>
    {/* front button */}
    <View>
    <View style={styles.card}>
        <TouchableOpacity onPress={()=> setFront(!Front)}>
            <Ionicons name={Front? 'camera': 'camera-reverse'} size={25}/>
            </TouchableOpacity>
            
    </View>
    <Text style={styles.text}>{Front? 'Back': 'Front'}</Text>
    </View>
    {/*  */}
     {/* Stop button */}
    <View>
    <View style={styles.card}>
        <TouchableOpacity onPress={()=> setStop(!Stop)}>
            <Ionicons name={Stop? 'stop': 'play'} size={25}/>
            </TouchableOpacity>
            
    </View>
    <Text style={styles.text}>{Stop? 'Stop': 'Start'}</Text>
    </View>
    {/*  */}
    </View>
    {/* Zoom */}
    <View style={styles.zoom}>
        <Slider
        value={scale} onValueChange={(val)=> setScale(val)} minimumValue={device?.minZoom?? 1} maximumValue={device?.maxZoom?? 5} 
        minimumTrackTintColor='#000' thumbTintColor='#000' maximumTrackTintColor='#3d3b3b' 
        />
    </View>
    <Text style={styles.zoomTitle}>Zoom Scale</Text>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    card:{
        width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8},
    text:{
       marginTop:8,
       marginLeft:18
    },
    zoom:{
     width: '76%',
    height: '6%',
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 7, // Android shadow
    shadowColor: '#000', // iOS shadow
    // shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginVertical:20
},
zoomTitle:{
    fontSize: 15,
    letterSpacing: 2,
    color: '#000',
    textAlign:'center',

}
    
})
export default QrScanner