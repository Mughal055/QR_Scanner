import { View, Text ,StyleSheet, TouchableOpacity,} from 'react-native'
import React,{useEffect,useMemo,useRef,useState,useCallback} from 'react'
import { Camera, useCameraDevice, useCameraPermission,usePhotoOutput } from 'react-native-vision-camera'
import Header from '../component/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@react-native-vector-icons/ionicons'
import Slider from '@react-native-community/slider'
import { useBarcodeScannerOutput, } from 'react-native-vision-camera-barcode-scanner'
import { useNavigation,useFocusEffect,useIsFocused } from '@react-navigation/native'
import { addScan } from '../Database/Models'


const BARCODE_FORMATES = ['qr-code']
const QrScanner = () => {
    // 
    const isFocused = useIsFocused()
// 
    useFocusEffect(
    useCallback(() => {
        Lock.current = false
    }, [])
)
// 
    const navigation = useNavigation()
   // 
    const Lock = useRef(false)
    const photoOutput = usePhotoOutput()
    // 
    const [Flash, setFlash] = useState(false)
    const [Front, setFront] = useState(false)
    const [Stop, setStop] = useState(true)
    const [scale, setScale] = useState(1)
    const [isStarted, setIsStarted] = useState(false)
    // 
    const device = useCameraDevice(Front? 'front' : 'back')
    const {hasPermission,requestPermission} = useCameraPermission()
    // 
    
    const codeScanner = useBarcodeScannerOutput({
        barcodeFormats: BARCODE_FORMATES,
        
        onBarcodeScanned:async (barcodes)=>{
            if(Lock.current) return
            if(barcodes.length > 0){
                Lock.current = true
          const ScannedRawValue = (barcodes[0].rawValue)
          console.log(barcodes[0].rawValue);
         const createdAt = new Date().toISOString()
          //
            
                try {
                    await addScan(ScannedRawValue,createdAt)
                } catch (error) {
                    console.log(error);
                    
                }
            
        //   
          let photoPath = null
          try {
            const photo = await photoOutput.capturePhotoToFile({},{})
            photoPath = photo.filePath
          console.log('Pathhh',photoPath);
          } catch (error) {
            console.log(error);
          }
          navigation.navigate('ScanDone',{item: {
            content : ScannedRawValue,
            created_at : createdAt,
           image: photoPath,
           
            }})
            
           
        }}
    })
    //
    const output = useMemo(()=> codeScanner && photoOutput?[codeScanner,photoOutput]:[],[codeScanner,photoOutput])
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
      <Camera  device={device} isActive={Stop && isFocused} style={StyleSheet.absoluteFill} 
      zoom={ isStarted? scale : undefined} 
      torchMode={isStarted && device?.hasTorch?(Flash? 'on':'off'): undefined}
       onStarted={()=> {setIsStarted(true)
         console.log('hii')}
       } 
       onError={(e) => console.log('Camera error:', e?.message)}
      onStopped={()=> setIsStarted(false)}
      outputs={output}/>}
    </View>
    {/*  buttons */}
    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginTop:60}}>
        {/* flash button */}
    <View>
    <View style={styles.card}>
        <TouchableOpacity onPress={()=>setFlash(!Flash) } >
            <Ionicons name={Flash? 'flash': 'flash-off'} size={25}/>
            </TouchableOpacity>
            
    </View>
    <Text style={styles.text}>{Flash? 'On': 'Off'}</Text>
    </View>
    {/* front button */}
    <View>
    <View style={styles.card}>
        <TouchableOpacity onPress={()=> {setFront(!Front)
            setFlash(false)
        setIsStarted(false) 
        }}>
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
        value={scale} onSlidingComplete={(val)=> setScale(val)} minimumValue={device?.minZoom?? 1} maximumValue={device?.maxZoom?? 5} 
        minimumTrackTintColor='#000' thumbTintColor='#000' maximumTrackTintColor='#3d3b3b' 
        />
    </View>
    <Text style={styles.zoomTitle}>Zoom Scale</Text>
    {/* // */}
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