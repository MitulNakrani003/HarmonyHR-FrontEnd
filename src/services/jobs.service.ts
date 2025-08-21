import axios, { type AxiosResponse } from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/jobs/';

// Interface for the raw job list from the API
interface ApiJob {
  jobId: number;
  jobTitle: string;
  postedOn: string;
  jobDescription: string;
  isActive: boolean;
  jobAddress: string;
  city: string;
  state: string;
  minimumExperience: number;
  maximumExperience: number;
  departmentTitle: string;
}

// Interface for the raw detailed job data from the API
export interface ApiJobDetail extends ApiJob {
  compensation: number;
  hiringManagerName: string;
  hiringManagerEmail: string;
  postedByName: string;
  postedByEmail: string;
  departmentDescription: string;
}

// Frontend interface for a job in a list
export interface Job {
  id: number;
  position: string;
  datePosted: string;
  location: string;
  department: string;
  minExperience: number;
  maxExperience: number;
  description: string;
}

// Frontend interface for the detailed job view
export interface JobDetail extends Job {
  compensation: string;
  hiringManager: string;
  postedBy: string;
  fullAddress: string;
  departmentDescription: string;
}

// Interface for the data payload when creating a new job
export interface NewJobPayload {
  jobTitle: string;
  jobDescription: string;
  departmentTitle: string;
  minimumExperience: number;
  maximumExperience: number;
  compensation: number;
  jobAddress: string;
  city: string;
  state: string;
  hiringManagerName: string;
  hiringManagerEmail: string;
}

// New interface for hiring manager data
export interface HiringManager {
  empId: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Function to get all job listings (remains the same)
const getAllJobs = (): Promise<AxiosResponse<Job[]>> => {
  return axios.get<ApiJob[]>(API_URL, { headers: AuthService.authHeader() })
    .then(response => {
      const transformedJobs: Job[] = response.data.map(apiJob => ({
        id: apiJob.jobId,
        position: apiJob.jobTitle,
        datePosted: apiJob.postedOn,
        location: `${apiJob.city}, ${apiJob.state}`,
        department: apiJob.departmentTitle,
        minExperience: apiJob.minimumExperience,
        maxExperience: apiJob.maximumExperience,
        description: apiJob.jobDescription,
      }));
      return { ...response, data: transformedJobs };
    });
};

// UPDATED: Fetches and transforms detailed data for a single job from the API
const getJobById = (id: number): Promise<AxiosResponse<JobDetail>> => {
  return axios.get<ApiJobDetail>(`${API_URL}${id}`, { headers: AuthService.authHeader() })
    .then(response => {
      const apiDetail = response.data;

      // Transform the raw API data into the structure the frontend components expect
      const transformedJobDetail: JobDetail = {
        id: apiDetail.jobId,
        position: apiDetail.jobTitle,
        datePosted: apiDetail.postedOn,
        location: `${apiDetail.city}, ${apiDetail.state}`,
        department: apiDetail.departmentTitle,
        minExperience: apiDetail.minimumExperience,
        maxExperience: apiDetail.maximumExperience,
        description: apiDetail.jobDescription,
        // New detailed fields
        compensation: `$${apiDetail.compensation.toLocaleString()}`, // Format compensation as currency
        hiringManager: `${apiDetail.hiringManagerName} (${apiDetail.hiringManagerEmail})`,
        postedBy: `${apiDetail.postedByName} (${apiDetail.postedByEmail})`,
        fullAddress: `${apiDetail.jobAddress}, ${apiDetail.city}, ${apiDetail.state}`,
        departmentDescription: apiDetail.departmentDescription,
      };

      // Return a new response object with the transformed data
      return {
        ...response,
        data: transformedJobDetail,
      };
    });
};

// New function to add a job
const addJob = (jobData: NewJobPayload): Promise<AxiosResponse<ApiJob>> => {
  return axios.post(API_URL, jobData, {
    headers: AuthService.authHeader(),
  });
};

// New function to fetch hiring managers
const getHiringManagers = (): Promise<AxiosResponse<HiringManager[]>> => {
  const API_BASE_URL = "http://localhost:8080/api/employee/"; 
  return axios.get(`${API_BASE_URL}hiringmanagers`, {
    headers: AuthService.authHeader(),
  });
};

// Function to deactivate jobs by IDs
const deactivateJobsByIds = (jobIds: number[]): Promise<AxiosResponse<string>> => {
  return axios.put(`${API_URL}deactivate`, jobIds, {
    headers: AuthService.authHeader(),
  });
};

const JobsService = {
  getAllJobs,
  getJobById,
  addJob,
  getHiringManagers, // Add the new function
  deleteJobsByIds: deactivateJobsByIds,
};

export default JobsService;