import React, { useState, useEffect, useMemo } from 'react';
import { 
    Users, 
    ShieldAlert, 
    ShieldCheck, 
    UserMinus, 
    UserCheck, 
    Loader2, 
    Mail,
    Calendar,
    RefreshCw
} from 'lucide-react';
import { API_BASE_URL } from '@/config/config';
import toast from 'react-hot-toast';

// --- API Configuration ---
const AUTH_API = `${API_BASE_URL}/auth`;

const ROLE_STATUS_MAP = {
  admin: { color: 'text-purple-600 bg-purple-100', icon: ShieldAlert },
  user: { color: 'text-blue-600 bg-blue-100', icon: ShieldCheck },
};

const StatusPill = ({ role }) => {
    const roleInfo = ROLE_STATUS_MAP[role?.toLowerCase()] || { color: 'text-gray-500 bg-gray-100', icon: Users };
    const Icon = roleInfo.icon;
    return (
        <span className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full ${roleInfo.color}`}>
            <Icon size={14} className="mr-1" />
            {role.toUpperCase()}
        </span>
    );
};

const SiteSettings = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${AUTH_API}/allusers`);
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
                toast.error("Could not load users.");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            filter === 'All' || 
            (filter === 'Blocked' ? user.isBlocked : user.role?.toLowerCase() === filter.toLowerCase())
        );
    }, [users, filter]);

    // --- Action: Toggle Admin/User Role ---
    const toggleUserRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const loadingToast = toast.loading(`Changing role to ${newRole}...`);

        try {
            const response = await fetch(`${AUTH_API}/edit/${userId}`, {
                method: 'PUT', // or PATCH based on your backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) throw new Error('Failed to update role');

            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            toast.success(`User is now an ${newRole}`, { id: loadingToast });
        } catch (err) {
            toast.error("Failed to change user role", { id: loadingToast });
        }
    };

    // --- Action: Block/Unblock ---
    const toggleBlockStatus = async (userId, isCurrentlyBlocked) => {
        const action = isCurrentlyBlocked ? 'unblockUser' : 'blockUser';
        const loadingToast = toast.loading(isCurrentlyBlocked ? "Unblocking..." : "Blocking...");

        try {
            const response = await fetch(`${AUTH_API}/${action}/${userId}`, {
                method: 'PUT', // or PATCH
                headers: { 'Content-Type': 'application/json' },
                // Only sending the required field as requested
                body: JSON.stringify({ isBlocked: !isCurrentlyBlocked }),
            });

            if (!response.ok) throw new Error('Update failed');

            setUsers(prev => prev.map(u => u._id === userId ? { ...u, isBlocked: !isCurrentlyBlocked } : u));
            toast.success(`User ${isCurrentlyBlocked ? 'unblocked' : 'blocked'}`, { id: loadingToast });
        } catch (err) {
            toast.error("Action failed", { id: loadingToast });
        }
    };

    if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin mr-3" size={24} /> Loading...</div>;
    if (error) return <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">User & Admin Management</h2>
            
            <div className="flex space-x-2 mb-4 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                {['All', 'Admin', 'User', 'Blocked'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === s ? 'bg-[#0f172a] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {s} ({
                            s === 'All' ? users.length : 
                            s === 'Blocked' ? users.filter(u => u.isBlocked).length :
                            users.filter(u => u.role?.toLowerCase() === s.toLowerCase()).length
                        })
                    </button>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map(user => (
                    <div key={user._id} className={`bg-white p-6 rounded-lg shadow-md border-t-4 transition-all ${user.isBlocked ? 'border-red-500 opacity-80' : 'border-[#d4af37]'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border">
                                    {user.email[0].toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-800 truncate max-w-[140px]">{user.email.split('@')[0]}</div>
                                    <div className="text-[10px] text-gray-400 font-mono italic">ID: ...{user._id.slice(-6)}</div>
                                </div>
                            </div>
                            <StatusPill role={user.role} />
                        </div>

                        <div className="space-y-2 mb-6 text-xs text-gray-600">
                            <div className="flex items-center"><Mail size={14} className="mr-2 opacity-70" /> {user.email}</div>
                            <div className="flex items-center"><Calendar size={14} className="mr-2 opacity-70" /> Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                        </div>

                        <div className="flex space-x-2 border-t pt-4">
                            <button
                                onClick={() => toggleUserRole(user._id, user.role)}
                                className="flex-1 flex items-center justify-center text-[11px] font-bold px-2 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                            >
                                <RefreshCw size={12} className="mr-1" /> To {user.role === 'admin' ? 'User' : 'Admin'}
                            </button>
                            
                            <button
                                onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                                className={`flex-1 flex items-center justify-center text-[11px] font-bold px-2 py-2 rounded-lg transition ${
                                    user.isBlocked 
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                                }`}
                            >
                                {user.isBlocked ? (
                                    <><UserCheck size={14} className="mr-1" /> Unblock</>
                                ) : (
                                    <><UserMinus size={14} className="mr-1" /> Disable</>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SiteSettings;