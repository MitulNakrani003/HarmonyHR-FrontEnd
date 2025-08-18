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
      <div className="d-flex justify-content-end align-items-center gap-2">
        {/* Add Job Button */}
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={onAdd}
        >
          <BsPlusLg />
          Add Job
        </button>

        {/* Edit Job Button - Enabled only when 1 item is selected */}
        <button
          className="btn btn-secondary d-flex align-items-center gap-2"
          onClick={onEdit}
          disabled={!canEdit}
          title={canEdit ? 'Edit selected job' : 'Select one job to edit'}
        >
          <BsPencil />
          Edit
        </button>

        {/* Delete Jobs Button - Enabled when 1 or more items are selected */}
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          onClick={onDelete}
          disabled={!canDelete}
          title={canDelete ? 'Delete selected jobs' : 'Select jobs to delete'}
        >
          <BsTrash />
          Delete ({selectedJobsCount})
        </button>
      </div>
    </div>
  );
};

export default JobsSubHeader;