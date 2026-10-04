import { createNativeStackNavigator } from '@react-navigation/native-stack'
import QrContact from '../screens/QrContact'
import QRemail from '../screens/QRemail'
import QrPhone from '../screens/QrPhone'
import QrSMS from '../screens/QrSMS'
import QRtext from '../screens/QRtext'
import QrVcard from '../screens/QrVcard'
import QrWhatsapp from '../screens/QrWhatsapp'
import QrWifi from '../screens/QrWifi'
import QRurl from '../screens/QRurl'
import Home from '../Home'
import QrScanner from '../main/QrScanner'
import QrGenerator from '../main/QrGenerator'
import Settings from '../Settings'
import History from '../History'

const Index = () => {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='QrContact' component={QrContact} />
        <Stack.Screen name='QRemail' component={QRemail} />
        <Stack.Screen name='QrPhone' component={QrPhone} />
        <Stack.Screen name='QrSMS' component={QrSMS} />
        <Stack.Screen name='QRtext' component={QRtext} />
        <Stack.Screen name='QRurl' component={QRurl} />
        <Stack.Screen name='QrVcard' component={QrVcard} />
        <Stack.Screen name='QrWhatsapp' component={QrWhatsapp} />
        <Stack.Screen name='QrWifi' component={QrWifi} />
         <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

export default Index