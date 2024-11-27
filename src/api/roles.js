import axios from "axios";

const API_URL = "https://maddening-agreeable-slayer.glitch.me/roles";

export const fetchRoles = () => axios.get(API_URL);
export const addRole = (role) => axios.post(API_URL, role);
export const updateRole = (id, role) => axios.put(`${API_URL}/${id}`, role);
export const deleteRole = (id) => axios.delete(`${API_URL}/${id}`);
