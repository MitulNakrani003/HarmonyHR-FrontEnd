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

// New function to delete one or more jobs by their IDs
const deleteJobsByIds = (jobIds: number[]): Promise<AxiosResponse<void>> => {
  // The backend likely expects a DELETE request with the IDs in the request body.
  // Adjust if your API expects them as query parameters.
  return axios.delete(`${API_URL}delete`, {
    headers: AuthService.authHeader(),
    data: { jobIds }, // Send IDs in the request body
  });
};

const JobsService = {
  getAllJobs,
  getJobById,
  deleteJobsByIds, // Add the new function
};

export default JobsService;