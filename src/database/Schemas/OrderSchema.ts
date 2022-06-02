export const OrderSchema = {
  name: "Order",
  properties: {
    _id: "string",
     // RealmDB uses his own id property so we gonna use an underline id to handle our own id
    patrimony: "string",
    equipment: "string",
    description: "string",
    status: "string",
    created_at: "date",
  },

  primaryKey: "_id", // from my properties id is the primary key
};
