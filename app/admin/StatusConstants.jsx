import { CheckCircle, XCircle, Clock, RefreshCw, Layers } from 'lucide-react';

export const STATUSES = ['All', 'Pending', 'Approved', 'In Progress', 'Completed', 'Cancelled'];

// Defines the colors and icons for the StatusPill component
export const STATUS_MAP = {
    Pending: { color: 'text-amber-600 bg-amber-100', icon: Clock },
    Approved: { color: 'text-green-600 bg-green-100', icon: CheckCircle },
    'In Progress': { color: 'text-blue-600 bg-blue-100', icon: RefreshCw },
    Completed: { color: 'text-purple-600 bg-purple-100', icon: Layers },
    Cancelled: { color: 'text-red-600 bg-red-100', icon: XCircle },
};