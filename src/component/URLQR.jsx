import { View, TextInput } from 'react-native'
import React from 'react'
import HTTP from './HTTP'
import { useMMKVBoolean } from 'react-native-mmkv'                // DARK

const PREFIXES = [
  { title: 'http://', icon: 'podium-outline' },
  { title: 'https://', icon: 'lock-closed-outline' },
  { title: 'www.', icon: 'card-outline' },
  { title: '.com', icon: 'business-outline' },
]

const URLQR = ({ input, setInput }) => {
  // DARK: Settings mein Dark Mode badalte hi ye input khud update ho jata hai
  const [dark] = useMMKVBoolean('darkTheme')

  return (
    <View>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        {PREFIXES.map(item => (
          <HTTP
            key={item.title}
            title={item.title}
            icon={item.icon}
            onPress={() => setInput(item.title + input)}
          />
        ))}
      </View>

      <View>
        <TextInput
          placeholder="Enter URL"
          placeholderTextColor={dark ? '#8a8a8a' : '#9c9494'}   // DARK
          value={input}
          onChangeText={setInput}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            margin: 20,
            padding: 20,
            borderColor: '#9c9494',
            color: dark ? '#fff' : '#000',                      // DARK: likha hua text
          }}
        />
      </View>
    </View>
  )
}

export default URLQR