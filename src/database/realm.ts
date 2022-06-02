import Realm from "realm";
import { OrderSchema } from "./Schemas/OrderSchema";

export const getRealm = async () => // get the instance to handle the database
  await Realm.open({
    path: "decode-app", // database name
    schema: [OrderSchema], // all schemas to create in the database
    schemaVersion: 3,//
  });
