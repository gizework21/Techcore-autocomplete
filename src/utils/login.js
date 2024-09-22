// api.js
import axios from "axios";
import { BASE_URL } from "../api/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/main/v1/account/login?populate=detail`,
      {
        email,
        password,
      }
    );
    return response.data.data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
