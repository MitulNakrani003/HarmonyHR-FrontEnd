import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JobsService, { type NewJobPayload, type HiringManager, type Department } from '../../services/jobs.service';
import AuthService from '../../services/auth.service';
import SuccessPopup from '../SuccessPopup'; // 1. Import the popup component

// Define a more specific type for the form data state
interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  departmentId: number | null;
  minimumExperience: number;
  maximumExperience: number;
  compensation: number;
  jobAddress: string;
  city: string;
  state: string;
  hiringManagerId: number | null;
}

const AddJobForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: '',
    jobDescription: '',
    departmentId: null,
    minimumExperience: 0,
    maximumExperience: 0,
    compensation: 0,
    jobAddress: '',
    city: '',
    state: '',
    hiringManagerId: null,
  });
  
  // State for department dropdown
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);

  // State for the hiring manager dropdown
  const [managers, setManagers] = useState<HiringManager[]>([]);
  const [managerSearch, setManagerSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // 2. Add state for popup visibility
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch managers and departments on component mount
  useEffect(() => {
    JobsService.getHiringManagers()
      .then(response => setManagers(response.data))
      .catch(() => setError("Could not load hiring managers."));
    
    JobsService.getDepartments()
      .then(response => setDepartments(response.data))
      .catch(() => setError("Could not load departments."));
  }, []);

  // Effect to close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target as Node)) {
        setIsDepartmentDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, departmentDropdownRef]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDepartmentSelect = (department: Department) => {
    setFormData(prev => ({ ...prev, departmentId: department.departmentId }));
    setDepartmentSearch(department.departmentTitle);
    setIsDepartmentDropdownOpen(false);
  };

  const handleManagerSelect = (manager: HiringManager) => {
    const fullName = `${manager.firstName} ${manager.lastName}`;
    setFormData(prev => ({ ...prev, hiringManagerId: manager.empId }));
    setManagerSearch(`${fullName} (${manager.email})`);
    setIsDropdownOpen(false);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required.";
    if (!formData.departmentId) errors.departmentTitle = "Please select a department from the list.";
    if (!formData.jobDescription.trim()) errors.jobDescription = "Job description is required.";
    
    const minExp = Number(formData.minimumExperience);
    const maxExp = Number(formData.maximumExperience);

    if (minExp <= 0) errors.minimumExperience = "Min experience must be greater than 0.";
    if (maxExp < minExp) errors.maximumExperience = "Max experience cannot be less than min experience.";
    
    if (Number(formData.compensation) <= 0) errors.compensation = "Compensation must be a positive number.";

    if (!formData.jobAddress.trim()) errors.jobAddress = "Address is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.state.trim()) errors.state = "State is required.";

    if (!formData.hiringManagerId) errors.hiringManager = "Please select a hiring manager from the list.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser?.userId) {
      setError("You must be logged in to create a job.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous messages

    const payload: NewJobPayload = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      departmentId: formData.departmentId!,
      minimumExperience: Number(formData.minimumExperience),
      maximumExperience: Number(formData.maximumExperience),
      compensation: Number(formData.compensation),
      jobAddress: formData.jobAddress,
      city: formData.city,
      state: formData.state,
      hiringManagerId: formData.hiringManagerId!,
      postedByUserId: currentUser.userId,
    };

    JobsService.addJob(payload)
      .then(() => {
        // 3. On success, set the message and open the popup
        setIsLoading(false);
        setSuccessMessage("Job has been created successfully!");
        setIsSuccessPopupOpen(true);
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || 'Failed to create job.';
        setError(errorMessage);
        setIsLoading(false);
      });
  };

  const handleAcknowledgeSuccess = () => {
    setIsSuccessPopupOpen(false);
    navigate('/jobs'); // Navigate after the user acknowledges the popup
  };

  const filteredDepartments = departments.filter(d =>
    d.departmentTitle.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const filteredManagers = managers.filter(m =>
    `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(managerSearch.toLowerCase())
  );

  return (
    <> {/* 4. Wrap the form and popup in a fragment */}
      <form onSubmit={handleSubmit} className="add-job-form" noValidate>
        {error && <div className="alert alert-danger">{error}</div>}
        {/* The inline success message is removed from here */}

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="jobTitle" className="form-label">Job Title</label>
            <input type="text" id="jobTitle" name="jobTitle" className={`form-control ${formErrors.jobTitle ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.jobTitle && <div className="invalid-feedback">{formErrors.jobTitle}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="departmentTitle" className="form-label">Department</label>
            <div className="searchable-dropdown" ref={departmentDropdownRef}>
              <input
                type="text"
                id="departmentTitle"
                name="departmentTitle"
                className={`form-control ${formErrors.departmentTitle ? 'is-invalid' : ''}`}
                value={departmentSearch}
                onChange={(e) => {
                  setDepartmentSearch(e.target.value);
                  setIsDepartmentDropdownOpen(true);
                  if (formData.departmentId) {
                    setFormData(prev => ({...prev, departmentId: null}));
                  }
                }}
                onFocus={() => setIsDepartmentDropdownOpen(true)}
                placeholder="Search for a department..."
                autoComplete="off"
                required
              />
              {isDepartmentDropdownOpen && (
                <div className="dropdown-menu show">
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map(dept => (
                      <button
                        key={dept.departmentId}
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleDepartmentSelect(dept)}
                      >
                        {dept.departmentTitle}
                      </button>
                    ))
                  ) : (
                    <span className="dropdown-item-text">No departments found</span>
                  )}
                </div>
              )}
            </div>
            {formErrors.departmentTitle && <div className="invalid-feedback d-block">{formErrors.departmentTitle}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">Job Description</label>
          <textarea id="jobDescription" name="jobDescription" className={`form-control ${formErrors.jobDescription ? 'is-invalid' : ''}`} rows={5} onChange={handleChange} required></textarea>
          {formErrors.jobDescription && <div className="invalid-feedback">{formErrors.jobDescription}</div>}
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="minimumExperience" className="form-label">Min Experience (Years)</label>
            <input type="number" id="minimumExperience" name="minimumExperience" className={`form-control ${formErrors.minimumExperience ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.minimumExperience && <div className="invalid-feedback">{formErrors.minimumExperience}</div>}
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="maximumExperience" className="form-label">Max Experience (Years)</label>
            <input type="number" id="maximumExperience" name="maximumExperience" className={`form-control ${formErrors.maximumExperience ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.maximumExperience && <div className="invalid-feedback">{formErrors.maximumExperience}</div>}
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="compensation" className="form-label">Yearly Compensation ($)</label>
            <input type="number" id="compensation" name="compensation" className={`form-control ${formErrors.compensation ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.compensation && <div className="invalid-feedback">{formErrors.compensation}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="jobAddress" className="form-label">Address</label>
            <input type="text" id="jobAddress" name="jobAddress" className={`form-control ${formErrors.jobAddress ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.jobAddress && <div className="invalid-feedback">{formErrors.jobAddress}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" id="city" name="city" className={`form-control ${formErrors.city ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" id="state" name="state" className={`form-control ${formErrors.state ? 'is-invalid' : ''}`} onChange={handleChange} required />
            {formErrors.state && <div className="invalid-feedback">{formErrors.state}</div>}
          </div>
        </div>

        {/* Replaced two fields with one searchable dropdown */}
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="hiringManager" className="form-label">Hiring Manager</label>
            <div className="searchable-dropdown" ref={dropdownRef}>
              <input
                type="text"
                id="hiringManager"
                name="hiringManager"
                className={`form-control ${formErrors.hiringManager ? 'is-invalid' : ''}`}
                value={managerSearch}
                onChange={(e) => {
                  setManagerSearch(e.target.value);
                  setIsDropdownOpen(true);
                  // Clear selection if user types something new
                  if (formData.hiringManagerId) {
                    setFormData(prev => ({...prev, hiringManagerId: null}));
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search for a manager..."
                autoComplete="off"
                required
              />
              {isDropdownOpen && (
                <div className="dropdown-menu show">
                  {filteredManagers.length > 0 ? (
                    filteredManagers.map(manager => (
                      <button
                        key={manager.empId}
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleManagerSelect(manager)}
                      >
                        {`${manager.firstName} ${manager.lastName}`} ({manager.email})
                      </button>
                    ))
                  ) : (
                    <span className="dropdown-item-text">No managers found</span>
                  )}
                </div>
              )}
            </div>
            {formErrors.hiringManager && <div className="invalid-feedback d-block">{formErrors.hiringManager}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/jobs')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>

      {/* 5. Conditionally render the popup */}
      {isSuccessPopupOpen && successMessage && (
        <SuccessPopup
          message={successMessage}
          onAcknowledge={handleAcknowledgeSuccess}
          buttonText="OK"
        />
      )}
    </>
  );
};

export default AddJobForm;