import axios, { type AxiosResponse } from 'axios';
import AuthService from './auth.service';
import { API_URLS } from '../constants/api';
import type { Address } from '../interfaces/address';

// Interface for the user profile data returned from the API
export interface DetailedEmployeeData{
  empId: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  jobTitle: string;
  address: Address; 
}

const getProfileData = (userId: number): Promise<AxiosResponse<DetailedEmployeeData>> => {
  return axios.get(`${API_URLS.PROFILE_SERVICE_URL}employeeInfo/${userId}`, { headers: AuthService.authHeader() });
};

const ProfileService = {
  getProfileData,
};

export default ProfileService;