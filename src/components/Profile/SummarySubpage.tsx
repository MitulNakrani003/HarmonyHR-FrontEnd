import React from 'react';

const SummarySubpage: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Employee Summary</h5>
        <p>This area will display a summary of the employee's key information, including their role, department, and start date.</p>
        {/* You can integrate the EmployeeDetailsDashboard component here later */}
      </div>
    </div>
  );
};

export default SummarySubpage;