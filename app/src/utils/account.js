import { v4 as uuidv4 } from "uuid";
import store from "@/store";

const collection = "account";
const api = "https://api.veaconta.com";

const updateAccount = async ({ id, data }) => {
  try {
    await fetch(`${api}/firebase`, {
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
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createAccount = async ({ data, setStore = true }) => {
  try {
    const uuid = uuidv4();
    data.uuid = uuid;
    fetch(`${api}/firebase`, {
      body: JSON.stringify({
        collection,
        data,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (setStore) getAccount({ id: res.data.id });
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getAccount = async ({ id, setStore = true }) => {
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
      if (setStore) store.commit("setAccount", res[0]);
      return res[0];
    });
};

const accountExists = async ({ owner }) => {
  const accountExist = await fetch(`${api}/firebase/get`, {
    body: JSON.stringify({
      collection,
      where: [{ field: "owner", operator: "==", value: owner }],
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((res) => {
      return !res.empty;
    });
  return accountExist;
};

const loginAccount = async ({ id }) => {
  try {
    console.log(id);
    await fetch(`${api}/firebase/get`, {
      body: JSON.stringify({
        collection,
        where: [{ field: "owner", operator: "==", value: id }],
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        store.commit("setAccount", res[0]);
      });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const getAccountByEmail = async ({ email }) => {
  try {
    const account = await fetch(`${api}/firebase/get`, {
      body: JSON.stringify({
        collection,
        where: [{ field: "email", operator: "==", value: email }],
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => data.json());
    return account;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export {
  accountExists,
  getAccountByEmail,
  updateAccount,
  createAccount,
  getAccount,
  loginAccount,
};
