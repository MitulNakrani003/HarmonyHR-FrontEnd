import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (
  username: string,
  email: string,
  password: string,
  accessRights: string // Changed from string[]
) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    accessRights
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const getRoles = () => {
  return axios.get(API_URL + "roles");
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authHeader = () => {
  const user = getCurrentUser();

  if (user?.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  authHeader,
  getRoles
};

export default AuthService;