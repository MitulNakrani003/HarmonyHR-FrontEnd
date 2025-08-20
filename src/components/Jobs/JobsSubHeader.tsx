import React from 'react';
import { BsPlusLg, BsPencil, BsTrash } from 'react-icons/bs';
import '../../styles/JobsSubHeader.css';

interface JobsSubHeaderProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  selectedJobsCount: number;
}

const JobsSubHeader: React.FC<JobsSubHeaderProps> = ({
  onAdd,
  onEdit,
  onDelete,
  selectedJobsCount,
}) => {
  const canEdit = selectedJobsCount === 1;
  const canDelete = selectedJobsCount > 0;

  return (
    <div className="sub-header-container p-3 mb-4 bg-light rounded">
      <div className="d-flex justify-content-between align-items-center">
        {/* Left Side: Selection Count */}
        <div>
          {selectedJobsCount > 0 && (
            <span className="selection-count-text">
              {selectedJobsCount} selected
            </span>
          )}
        </div>

        {/* Right Side: Action Buttons */}
        <div className="d-flex align-items-center gap-2">
          {/* Add Job Button */}
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={onAdd}
          >
            <BsPlusLg />
            Add Job
          </button>

          {/* Edit Job Button */}
          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={onEdit}
            disabled={!canEdit}
            title={canEdit ? 'Edit selected job' : 'Select one job to edit'}
          >
            <BsPencil />
            Edit
          </button>

          {/* Delete Jobs Button */}
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={onDelete}
            disabled={!canDelete}
            title={canDelete ? 'Delete selected jobs' : 'Select jobs to delete'}
          >
            <BsTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsSubHeader;