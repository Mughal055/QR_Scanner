import { View, TextInput } from 'react-native'
import React from 'react'
import HTTP from './HTTP'

const PREFIXES = [
  { title: 'http://', icon: 'podium-outline' },
  { title: 'https://', icon: 'lock-closed-outline' },
  { title: 'www.', icon: 'card-outline' },
  { title: '.com', icon: 'business-outline' },
]

const URLQR = ({ input, setInput }) => {
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
          value={input}
          onChangeText={setInput}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            margin: 20,
            padding: 20,
            borderColor: '#9c9494',
          }}
        />
      </View>
    </View>
  )
}

export default URLQR