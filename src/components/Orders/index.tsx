import React, { useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Load } from "../Load";
import { Filters } from "../Filters";
import { Order, OrderProps } from "../Order";

import { Container, Header, Title, Counter } from "./styles";
import { getRealm } from "../../database/realm";

export function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [status, setStatus] = useState("open");

  async function fetchOrders() {
    setIsLoading(true); // enable the loading
    const realm = await getRealm(); // get the realm instance
    try {
      const response = realm
        .objects<OrderProps[]>("Order")
        .filtered(`status = '${status}'`)
        .sorted("created_at")
        .toJSON();
      setOrders(response);
    } catch {
      Alert.alert("Error", "Was not possible to fetch the orders");
    } finally {
      realm.close(); // close the realm instance
      setIsLoading(false);
    }
  }

  async function updateOder(id: string) {
    const realm = await getRealm();
    try {
      const orderSelected = realm
        .objects<OrderProps>("Order")
        .filtered(`_id = '${id}'`)[0];

      realm.write(() => {
        // transaction read/write
        orderSelected.status =
          orderSelected.status === "open" ? "closed" : "open";
      });
      Alert.alert(`Order ${orderSelected.status}`);
      fetchOrders();
    } catch {
      Alert.alert("Error", "Was not possible to update the order!"); // Notification
    }
  }

  function handleOrderUpdate(id: string) {
    Alert.alert("Ticket", "Do you want to update the order?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => updateOder(id),
      },
    ]);
  }
  // return to home page
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [status])
  );

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title>{status === "open" ? "Open tickets" : "Closed tickets"}</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOrderUpdate(item._id)} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      )}
    </Container>
  );
}
