
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVBoolean } from 'react-native-mmkv';

import Header from '../component/Header';
import GenerateCard from '../component/GenerateCard';
import useContactHook from '../Hooks/useContactHook';

const QrContact = () => {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    onClear,
    handleCreate,
  } = useContactHook();

  // DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? '#121212' : '#FFFFFF',
      }}
    >
      <Header icon={true} title="QR CONTACT" />

      <GenerateCard
        type="contact"
        onClear={onClear}
        handleCreate={handleCreate}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        dark={dark}
      />
    </SafeAreaView>
  );
};

export default QrContact;
