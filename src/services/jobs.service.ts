import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/jobs/';

// Define the structure of a Job object
export interface Job {
  id: number;
  position: string;
  datePosted: string; // ISO 8601 format e.g., "2025-08-15T10:00:00Z"
  location: string;
  department: string;
  minExperience: number;
  maxExperience: number;
  description: string;
}

// Mock data for demonstration purposes
const mockJobs: Job[] = [
  {
    id: 1,
    position: 'Senior Frontend Developer',
    datePosted: '2025-08-10T09:00:00Z',
    location: 'New York, NY (Remote)',
    department: 'Engineering',
    minExperience: 5,
    maxExperience: 8,
    description: 'Lead the development of our next-generation user interfaces using React and TypeScript.'
  },
  {
    id: 2,
    position: 'HR Generalist',
    datePosted: '2025-08-05T14:30:00Z',
    location: 'San Francisco, CA',
    department: 'Human Resources',
    minExperience: 2,
    maxExperience: 4,
    description: 'Support the HR department in various functions including recruitment, onboarding, and employee relations.'
  },
  {
    id: 3,
    position: 'Product Manager',
    datePosted: '2025-07-28T11:00:00Z',
    location: 'Austin, TX',
    department: 'Product',
    minExperience: 4,
    maxExperience: 7,
    description: 'Define product vision, strategy, and roadmap for our core HR platform.'
  },
  {
    id: 4,
    position: 'Senior Frontend Developer',
    datePosted: '2025-08-10T09:00:00Z',
    location: 'New York, NY (Remote)',
    department: 'Engineering',
    minExperience: 5,
    maxExperience: 8,
    description: 'Lead the development of our next-generation user interfaces using React and TypeScript.'
  },
  {
    id: 5,
    position: 'HR Generalist',
    datePosted: '2025-08-05T14:30:00Z',
    location: 'San Francisco, CA',
    department: 'Human Resources',
    minExperience: 2,
    maxExperience: 4,
    description: 'Support the HR department in various functions including recruitment, onboarding, and employee relations.'
  },
  {
    id: 6,
    position: 'Product Manager',
    datePosted: '2025-07-28T11:00:00Z',
    location: 'Austin, TX',
    department: 'Product',
    minExperience: 4,
    maxExperience: 7,
    description: 'Define product vision, strategy, and roadmap for our core HR platform.'
  }
];

// Function to get all job listings
const getAllJobs = (): Promise<{ data: Job[] }> => {
  // In a real application, you would replace this with an API call.
  // For example: return axios.get(API_URL, { headers: AuthService.authHeader() });
  return Promise.resolve({ data: mockJobs });
};

const JobsService = {
  getAllJobs,
};

export default JobsService;