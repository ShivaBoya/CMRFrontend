import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import jwtDecode from "jwt-decode";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      const user = jwtDecode(token);

      localStorage.setItem("token", token);

      return { token, user };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  }
);
