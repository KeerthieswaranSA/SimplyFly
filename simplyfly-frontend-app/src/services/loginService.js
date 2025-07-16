import axios from "axios";

const API_BASE = "https://localhost:7134/api";

export const register = async (data) => {
  const res = await axios.post("https://localhost:7134/api/Auth/register", data);
  return res.data;
};


export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE}/Auth/login`, {
    email: username,
    password,
  });

  const { token, role, fullName: user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("username", user);

  return { token, role, username: user };
};

export const logout = () => {
  localStorage.clear();
};
