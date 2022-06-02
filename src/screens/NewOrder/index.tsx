import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {getRealm} from '../../database/realm';
import { Container, Header, Title, Form } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { IconButton } from '../../components/IconButton';
import { Alert } from 'react-native';

export function NewOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNewOrderRegister(){
 const realm = await getRealm();
 try{
   setIsLoading(true);

    realm.write(() => { // To start a write transaction -  arrow function
    const created = realm.create('Order', { // insert the following data into our collection
        _id: uuid.v4(), // insert a unique id
        patrimony, // the values
        equipment,
        description,
        status: 'open',
        created_at: new Date(),
      });
      console.log(created);
    });
    Alert.alert('New Ticket', 'A new ticket has been created'); //Notification
    handleBack();
 }catch{
 Alert.alert('New Ticket', ' Was not possible to create a new ticket');//Notification
 }
 finally{
    setIsLoading(false);
    realm.close(); //close the instance
 }
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
        onPress={handleNewOrderRegister}
      />
    </Container>
  );
}