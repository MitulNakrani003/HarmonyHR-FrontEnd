import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

// Define an interface for the user object stored in localStorage
interface User {
  token: string;
  userId: number;
  username: string;
  roles: string[];
}

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
      // The response data should contain the token and user details including userId
      if (response.data.token && response.data.userId) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const getRoles = () => {
  return axios.get(API_URL + "roles");
};

const logout = () => {
  // This function already clears the entire user object, including the userId
  localStorage.removeItem("user");
};

const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr) as User;
    } catch (e) {
      console.error("Could not parse user from localStorage", e);
      return null;
    }
  }
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