import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const collection = "restaurant";
const api = "https://api.veaconta.com";

const updateRestaurant = async ({ id, data }) => {
  try {
    const restaurant = await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        id,
        data,
      }),
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => data.json());
    return restaurant;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createRestaurant = async ({ data }) => {
  try {
    const uuid = uuidv4();
    data.uuid = uuid;
    const restaurant = await fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        data,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => data.json());
    return restaurant;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getRestaurant = async ({ id }) => {
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      id,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res[0];
    });
};

const getUserRestaurants = async () => {
  const where = [
    { field: "owner", operator: "==", value: store.state.account.id },
  ];
  return await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res;
    });
};

const getRestaurants = async ({ id, where }) => {
  return await fetch(`${api}/firebase/search`, {
    body: JSON.stringify({
      collection,
      where,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return res;
    });
};

const restaurantSetOpen = async () => {
  await fetch(`${api}/firebase`, {
    body: JSON.stringify({
      collection,
      id: store.state.restaurant.id,
      data: { isOpen: true },
    }),
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  }).then((data) => data.json());
};

const restaurantSetClosed = async () => {
  await fetch(`${api}/firebase`, {
    body: JSON.stringify({
      collection,
      id: store.state.restaurant.id,
      data: { isOpen: false },
    }),
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  }).then((data) => data.json());
};

export {
  updateRestaurant,
  getRestaurants,
  getUserRestaurants,
  restaurantSetClosed,
  restaurantSetOpen,
  createRestaurant,
  getRestaurant,
};
