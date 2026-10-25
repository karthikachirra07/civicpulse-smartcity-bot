import React from 'react';
import { ComplaintPriority, ComplaintStatus } from '../../types';

export const StatusBadge: React.FC<{ status: ComplaintStatus; size?: 'sm' | 'md' }> = ({
  status,
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'submitted':
    case 'under_review':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#FEF3C7',
            color: '#B7791F',
            border: '1px solid #FDE68A'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#B7791F' }} />
          {status === 'submitted' ? 'Submitted' : 'Pending Review'}
        </span>
      );
    case 'assigned':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#EEF2F6',
            color: '#142B4A',
            border: '1px solid #D0D5DD'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#142B4A' }} />
          Assigned
        </span>
      );
    case 'in_progress':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#E6F6F5',
            color: '#0F9D91',
            border: '1px solid #B8EBE6'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#0F9D91' }} />
          In Progress
        </span>
      );
    case 'resolved':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#E8F5E9',
            color: '#16865C',
            border: '1px solid #C8E6C9'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#16865C' }} />
          Resolved
        </span>
      );
    case 'reopened':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#FFF7ED',
            color: '#C2410C',
            border: '1px solid #FFEDD5'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C2410C' }} />
          Reopened
        </span>
      );
    case 'rejected':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
          style={{
            backgroundColor: '#FDE8E8',
            color: '#D64545',
            border: '1px solid #FBD5D5'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D64545' }} />
          Rejected
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-700 ${sizeClasses}`}
        >
          {status}
        </span>
      );
  }
};

export const PriorityBadge: React.FC<{
  priority: ComplaintPriority;
  size?: 'sm' | 'md';
  isAiSuggested?: boolean;
}> = ({ priority, size = 'md', isAiSuggested = false }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs';

  let config = {
    bg: '#F2F4F7',
    text: '#344054',
    border: '#E4E7EC',
    dot: '#667085',
    label: 'Low'
  };

  switch (priority) {
    case 'critical':
      config = {
        bg: '#FEF3F2',
        text: '#D64545',
        border: '#FECDCA',
        dot: '#D64545',
        label: 'Critical (6h)'
      };
      break;
    case 'high':
      config = {
        bg: '#FEF7EC',
        text: '#B7791F',
        border: '#FCE7C5',
        dot: '#B7791F',
        label: 'High (12h)'
      };
      break;
    case 'medium':
      config = {
        bg: '#EFF8FF',
        text: '#175CD3',
        border: '#D1E9FF',
        dot: '#175CD3',
        label: 'Medium (24h)'
      };
      break;
    case 'low':
      config = {
        bg: '#F8F9FC',
        text: '#475467',
        border: '#E4E7EC',
        dot: '#98A2B3',
        label: 'Low (48h)'
      };
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${sizeClasses}`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.dot }} />
      <span>{config.label}</span>
      {isAiSuggested && (
        <span className="text-[10px] font-semibold text-[#0F9D91] ml-0.5 bg-[#E6F6F5] px-1 rounded">
          AI
        </span>
      )}
    </span>
  );
};
