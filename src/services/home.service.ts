import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/home/';

const getEmployeeDataByUserId = (userId: number) => {
   return axios.get(API_URL + 'employee/' + userId, { headers: AuthService.authHeader() });
};

const HomeService = {
  getEmployeeDataByUserId,
};

export default HomeService;