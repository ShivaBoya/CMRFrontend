import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch all leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/leads");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to load leads");
    }
  }
);

// Create new lead
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/leads", payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to create lead");
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    upsertLead(state, action) {
      const idx = state.list.findIndex((l) => l.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
      else state.list.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchLeads.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchLeads.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(createLead.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      });
  },
});

export const { upsertLead } = leadsSlice.actions;
export default leadsSlice.reducer;
