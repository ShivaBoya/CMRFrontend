import api from "../../api/axios";

export const LeadsAPI = {
  getAll: () => api.get("/leads"),
  create: (data) => api.post("/leads", data),
  getById: (id) => api.get(`/leads/${id}`),
};
