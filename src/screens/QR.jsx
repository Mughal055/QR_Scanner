
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';

import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header';
import Ionicons from '@react-native-vector-icons/ionicons';
import { addGenerate } from '../Database/Models';
import { useMMKVBoolean } from 'react-native-mmkv';

const QR = () => {
  const route = useRoute();
  const { qrData, type } = route.params ?? {};

  const [saved, setSaved] = useState(false);

  // DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  const colors = {
    background: dark ? '#121212' : '#FFFFFF',
    card: dark ? '#1E1E1E' : '#FFFFFF',
    text: dark ? '#FFFFFF' : '#000000',
    border: dark ? '#383838' : '#E5E5E5',
    icon: dark ? '#FFFFFF' : '#000000',
  };

  const send = async () => {
    try {
      await Share.share({ message: qrData || '' });
    } catch (err) {
      console.log(err);
    }
  };

  const save = async () => {
    if (saved) return;

    try {
      await addGenerate(qrData, type);
      setSaved(true);
    } catch (err) {
      console.log('save error', err);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>

      <Header icon={true} title={'QR GENERATED'} />

      <View style={styles.content}>

        {/* QR CODE */}
        <View
          style={[
            styles.qrCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}>
          <QRCode
            value={qrData || ' '}
            size={250}
            backgroundColor="#FFFFFF"
            color="#000000"
          />
        </View>

        {/* SHARE AND SAVE BUTTONS */}
        <View style={styles.buttons}>

          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={send}>

            <Ionicons
              name="share-social"
              size={20}
              color={colors.icon}
            />

            <Text style={[styles.btnText, { color: colors.text }]}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={save}>

            <Ionicons
              name={saved ? 'checkmark' : 'save'}
              size={20}
              color={colors.icon}
            />

            <Text style={[styles.btnText, { color: colors.text }]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },

  qrCard: {
    borderWidth: 1,
    elevation: 7,
    padding: 10,
  },

  buttons: {
    flexDirection: 'row',
    marginVertical: 30,
  },

  btnText: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },

  card: {
    flexDirection: 'row',
    width: 100,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    marginHorizontal: 20,
  },
});

export default QR;
