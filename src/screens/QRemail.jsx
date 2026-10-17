
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMMKVBoolean } from 'react-native-mmkv';

import GenerateCard from '../component/GenerateCard';
import useEmailHook from '../Hooks/useEmailHook';
import Header from '../component/Header';

const QRemail = () => {
  const {
    email,
    setEmail,
    subject,
    setSubject,
    body,
    setBody,
    onClear,
    handleCreate,
  } = useEmailHook();

  // DARK MODE
  const [dark] = useMMKVBoolean('darkTheme');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: dark ? '#121212' : '#FFFFFF',
      }}
    >
      <Header icon={true} title="QR EMAIL" />

      <GenerateCard
        type="email"
        title="QR EMAIL"
        onClear={onClear}
        handleCreate={handleCreate}
        email={email}
        setEmail={setEmail}
        subject={subject}
        setSubject={setSubject}
        body={body}
        setBody={setBody}
        dark={dark}
      />
    </SafeAreaView>
  );
};

export default QRemail;
