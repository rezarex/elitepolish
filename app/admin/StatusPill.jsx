import React from 'react';
// Import the constants and icons needed for this component
import { STATUS_MAP } from './StatusConstants';
import { Clock } from 'lucide-react'; 

const StatusPill = ({ status }) => {
  // Use the imported STATUS_MAP for status definition
  const { color, icon: Icon } = STATUS_MAP[status] || { color: 'text-gray-500 bg-gray-200', icon: Clock };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      <Icon size={14} className="mr-1" />
      {status}
    </span>
  );
};

export default StatusPill;