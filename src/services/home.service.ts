import axios from 'axios';
import AuthService from './auth.service';
import { API_URLS } from '../constants/api';

const getEmployeeDataByUserId = (userId: number) => {
  return axios.get(API_URLS.HOME_SERVICE_URL + 'userInfo/' + userId, { headers: AuthService.authHeader() });
};

const HomeService = {
  getEmployeeDataByUserId,
};

export default HomeService;