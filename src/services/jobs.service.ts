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

// Define the structure for the detailed job data from the API
export interface JobDetail extends Job {
  compensation: string;
  hiringManager: string;
  postedBy: string;
  fullAddress: string;
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

// MOCK FUNCTION: This simulates fetching detailed data for a single job.
// Replace this with a real API call to /api/jobs/{id}
const getJobById = (id: number): Promise<{ data: JobDetail }> => {
  console.log(`Fetching job with ID: ${id}`);
  // This is mock data. In a real app, you'd fetch and transform the data.
  const mockDetail: JobDetail = {
    id: id,
    position: 'Senior Frontend Developer',
    datePosted: '2025-08-10T09:00:00Z',
    location: 'New York, NY (Remote)',
    department: 'Engineering',
    minExperience: 5,
    maxExperience: 8,
    description: 'Lead the development of our next-generation user interfaces using React and TypeScript. You will be responsible for architecting and building complex, scalable, and high-performance web applications. This role requires a deep understanding of the React ecosystem, state management, and modern frontend build pipelines.',
    compensation: '$120,000 - $160,000 per year, plus stock options',
    hiringManager: 'Jane Doe, Engineering Manager',
    postedBy: 'John Smith, HR Recruiter',
    fullAddress: '123 Tech Avenue, New York, NY 10001'
  };
  return Promise.resolve({ data: mockDetail });
  // REAL API CALL EXAMPLE:
  // return axios.get<JobDetail>(`${API_URL}/${id}`, { headers: AuthService.authHeader() });
};


const JobsService = {
  getAllJobs,
  getJobById, // Add the new function to the exported service
};

export default JobsService;