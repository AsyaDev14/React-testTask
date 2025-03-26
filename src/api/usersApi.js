import axios from "axios";

export const localUserList = JSON.parse(localStorage.getItem("users"));


const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setUser = async (params, onSuccess) => {
  try {
    await axios.post(BASE_URL, params);
    onSuccess();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (userId, params, onSuccess) => {
  try {
    await axios.put(
      `${BASE_URL}/${userId}`,
      params
    );
    onSuccess();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/${userId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
