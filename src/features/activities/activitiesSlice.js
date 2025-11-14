import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch all activities for a lead
export const fetchActivitiesByLead = createAsyncThunk(
  "activities/fetchByLead",
  async (leadId, thunkAPI) => {
    try {
      const res = await api.get(`/leads/${leadId}/activities`);
      return { leadId, activities: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load activities");
    }
  }
);

// Add a new activity to a lead
export const addActivity = createAsyncThunk(
  "activities/addActivity",
  async ({ leadId, content }, thunkAPI) => {
    try {
      const res = await api.post(`/leads/${leadId}/activities`, {
        content,
        type: "note",
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add activity");
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    byLead: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivitiesByLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivitiesByLead.fulfilled, (state, action) => {
        state.loading = false;
        state.byLead[action.payload.leadId] = action.payload.activities;
      })
      .addCase(fetchActivitiesByLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        const leadId = action.payload.leadId;
        if (!state.byLead[leadId]) state.byLead[leadId] = [];
        state.byLead[leadId].push(action.payload);
      });
  },
});
export default activitiesSlice.reducer;
