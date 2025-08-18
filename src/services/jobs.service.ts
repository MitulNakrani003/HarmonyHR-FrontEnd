import axios, { type AxiosResponse } from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/jobs/';

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

// 2. Keep the existing Job interface that your components use. No changes needed here.
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

// 3. Update the service function to fetch, transform, and return the data
const getAllJobs = (): Promise<AxiosResponse<Job[]>> => {
  return axios.get<ApiJob[]>(API_URL, { headers: AuthService.authHeader() })
    .then(response => {
      // Map the raw API data to the Job structure used by the frontend
      const transformedJobs: Job[] = response.data.map(apiJob => ({
        id: apiJob.jobId,
        position: apiJob.jobTitle,
        datePosted: apiJob.postedOn,
        location: `${apiJob.city}, ${apiJob.state}`, // Combine city and state
        department: apiJob.departmentTitle,
        minExperience: apiJob.minimumExperience,
        maxExperience: apiJob.maximumExperience,
        description: apiJob.jobDescription,
      }));

      // Return a new response object that looks like the original, but with the transformed data
      return {
        ...response,
        data: transformedJobs,
      };
    });
};

const JobsService = {
  getAllJobs,
};

export default JobsService;