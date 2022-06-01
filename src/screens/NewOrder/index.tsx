import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, Title, Form } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { IconButton } from '../../components/IconButton';

export function NewOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <Title>New Ticket</Title>
        <IconButton icon="chevron-left" onPress={handleBack} />
      </Header>

      <Form>
        <Input
          placeholder="Patrimony ID"
          onChangeText={setPatrimony}
        />

        <Input
          placeholder="Equipment"
          onChangeText={setEquipment}
        />

        <TextArea
          placeholder="Description"
          autoCorrect={false}
          onChangeText={setDescription}
        />
      </Form>

      <Button
        title="Send New Ticket"
        isLoading={isLoading}
      />
    </Container>
  );
}