import axios from "axios";

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setUser = async (params, onSuccess) => {
  try {
    await axios.post("https://jsonplaceholder.typicode.com/users", params);
    onSuccess();
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (userId, params, onSuccess) => {
  try {
    await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      params
    );
    onSuccess();
  } catch (error) {
    console.log(error);
  }
};
