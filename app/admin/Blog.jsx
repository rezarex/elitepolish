'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, Search, Edit, CheckCircle, XCircle, Clock, Loader2, MessageSquare, Star, Trash2, Rss, PlusCircle, PenTool, Eye, Zap, Save, ChevronLeft, Upload } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';
import Editor, { 
  BtnBold, 
  BtnItalic, 
  createButton,
  EditorProvider, 
  Toolbar
} from 'react-simple-wysiwyg';


// --- API Endpoints ---
const BLOGS_API = `${API_BASE_URL}/posts`; 
const ADD_BLOG_API = `${API_BASE_URL}/posts/add`; // POST to create
const GET_BLOG_API = (id) => `${API_BASE_URL}/posts/${id}`; // GET to fetch single
const UPDATE_BLOG_API = (id) => `${API_BASE_URL}/posts/${id}`; // PUT/PATCH to update

// --- Placeholder Components/Constants ---
const StatusPill = ({ status, map }) => {
    const { text, className } = map[status] || { text: status, className: 'bg-gray-200 text-gray-800' };
    return <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${className}`}>{text}</span>;
};

// --- Styling Components/Constants ---
const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
const BtnAlignLeft = createButton('Align left', '≡', 'justifyLeft');
const BtnAlignRight = createButton('Align right', '≡', 'justifyRight');

const POST_STATUS_MAP = {
    'Published': { text: 'Published', className: 'bg-green-100 text-green-800' },
    'Draft': { text: 'Draft', className: 'bg-yellow-100 text-yellow-800' },
    'Archived': { text: 'Archived', className: 'bg-red-100 text-red-800' },
};
// ----------------------------------------------------------------------------------------

// Renamed from NewPostForm to BlogEditor to reflect expanded functionality (Create/Update)
const BlogEditor = ({ editingPostId, onFinish, onCancel, loadPosts }) => {
    const isEditing = !!editingPostId;
    const [formData, setFormData] = useState({
        title: '',
        author: 'Jane Admin',
        desc: '', 
        content: '', // This will hold the HTML content
        status: 'Draft',
        category: 'cleaning'
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // Fetch existing blog data if editing
    useEffect(() => {
        if (isEditing) {
            const fetchPost = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(GET_BLOG_API(editingPostId));
                    if (!response.ok) throw new Error("Failed to fetch post for editing.");
                    
                    const post = await response.json();
                    
                    setFormData({
                        title: post.title || '',
                        author: post.author || 'Jane Admin',
                        desc: post.desc || '',
                        content: post.body || '', // Set content from API body
                        status: post.status || 'Draft',
                        category: post.category || 'cleaning',
                    });
                    setImagePreview(post.image || ''); 
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [editingPostId, isEditing]);

    // Handle input change for standard fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Handle change specifically for react-simple-wysiwyg editor
    const handleEditorChange = (e) => {
        // The event object for this editor has the new HTML content at e.target.value
        setFormData(prev => ({ ...prev, content: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const requestData = new FormData();
            
            Object.keys(formData).forEach(key => {
                // Map 'content' (HTML) to 'body' for the API
                const apiKey = key === 'content' ? 'body' : key;
                requestData.append(apiKey, formData[key]);
            });

            if (imageFile) {
                requestData.append('image', imageFile);
            } else if (isEditing && imagePreview && !imageFile) {
                requestData.append('image', imagePreview);
            }

            const url = isEditing ? UPDATE_BLOG_API(editingPostId) : ADD_BLOG_API;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: requestData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post: ${response.status} - ${errorText}`);
            }

            await loadPosts(); 
            onFinish();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Check if content is not empty (trim removes whitespace/newlines)
    const isContentValid = formData.content.trim().length > 0;
    const isFormValid = formData.title.trim() !== '' && isContentValid;

    if (loading && isEditing) return <div className="p-8 text-center"><Loader2 className="animate-spin inline mr-2" size={24} /> Loading Post Data...</div>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
            <button onClick={onCancel} className="mb-4 flex items-center text-slate-600 hover:text-slate-800 transition">
                <ChevronLeft size={20} className="mr-1" /> Back to Posts
            </button>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4 flex items-center">
                <PenTool size={28} className="mr-3 text-[#d4af37]" /> {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            
            {error && <div className="p-3 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">{error}</div>}

            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., 5 Tips for Seasonal Deep Cleaning"
                            className="w-full p-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Admin Name"
                            className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] text-gray-600 focus:border-[#d4af37]"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                </div>

                {/* --- Image Upload Field --- */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Upload size={16} className="mr-2" /> Featured Image</label>
                    <div className="flex items-center space-x-4">
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition">
                            {imageFile ? imageFile.name : (isEditing && imagePreview ? 'Change Image' : 'Select Image')}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {imagePreview && (
                            <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {!imagePreview && <span className="text-gray-500 text-sm">No image selected.</span>}
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Excerpt / Short Description</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={formData.desc}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="A brief summary of the post..."
                        className="w-full text-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                    ></textarea>
                </div>

                {/* --- WYSIWYG Editor (Integrated react-simple-wysiwyg) --- */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Post Content (WYSIWYG Editor)
                    </label>
                    <Editor value={formData.content} onChange={handleEditorChange} className="min-h-[300px] text-gray-600" >
                            <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                                <BtnAlignLeft />
                                <BtnAlignCenter />
                                <BtnAlignRight/>
                                
                            </Toolbar>
                    </Editor>
                   
                </div>
                {/* --- End WYSIWYG Editor --- */}

                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className="flex items-center px-6 py-2 bg-[#0f172a] text-white rounded-lg font-medium hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        {loading ? (
                            <Loader2 size={18} className="mr-2 animate-spin" />
                        ) : (
                            <Save size={18} className="mr-2" />
                        )}
                        {isEditing ? `Update Post` : `Publish ${formData.status}`}
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Updated Blog Component ---
const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    // State to manage the post ID being edited (null for new post, string ID for editing)
    const [editingPostId, setEditingPostId] = useState(null); 
    const [isFormOpen, setIsFormOpen] = useState(false); // Controls the view state

    // Function to fetch posts (made useCallback to avoid re-creation)
    const loadPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(BLOGS_API);
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            
            // Map API response to component's expected structure
            const formattedPosts = data.map(post => ({
                id: post._id,
                title: post.title,
                author: post.author || 'Unknown Author',
                status: post.status || (post.isPublished ? 'Published' : 'Draft'), // Guess status
                date: new Date(post.createdAt).toISOString().split('T')[0],
                views: post.numViews || 0,
            }));

            setPosts(formattedPosts);

        } catch (err) {
            console.error("Error loading blog posts:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        loadPosts();
    }, [loadPosts]); 

    const filteredPosts = useMemo(() => {
        return posts.filter(post => 
            filter === 'All' || post.status === filter
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [posts, filter]);

    const updatePostStatus = (id, newStatus) => {
        // NOTE: In a real app, this should make an API call (PUT/PATCH) to update the status 
        // before updating the local state.
        setPosts(prevPosts => 
            prevPosts.map(p => (p.id === id ? { ...p, status: newStatus } : p))
        );
    };

    const handleNewPostClick = () => {
        setEditingPostId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (id) => {
        setEditingPostId(id);
        setIsFormOpen(true);
    };
    
    const handleCancelEdit = () => {
        setIsFormOpen(false);
        setEditingPostId(null);
    };
    
    // Function passed to the editor to handle form submission completion
    const handleFormFinish = () => {
        setIsFormOpen(false);
        setEditingPostId(null);
        // loadPosts is called within BlogEditor on success
    };


    if (loading && !isFormOpen) return <div className="flex items-center justify-center h-full min-h-60 p-8 text-slate-600"><Loader2 className="animate-spin mr-3" size={24} /> Loading Blog Posts...</div>;
    if (error && !isFormOpen) return <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">Error: {error}</div>;

    // 2. Conditionally render the BlogEditor component
    if (isFormOpen) {
        return (
            <BlogEditor
                editingPostId={editingPostId}
                onFinish={handleFormFinish} // Callback after successful save/update
                onCancel={handleCancelEdit} // Callback for cancel button
                loadPosts={loadPosts} // Function to refresh the list
            />
        );
    }

    // 3. Main Blog List View
    return (
        <>
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex space-x-2 flex-wrap">
                    {['All', 'Published', 'Draft', 'Archived'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filter === s 
                                    ? 'bg-[#0f172a] text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNewPostClick}
                    className="flex items-center px-4 py-2 bg-[#d4af37] text-white rounded-lg font-medium hover:bg-[#c0a030] transition shadow-md"
                >
                    <PlusCircle size={18} className="mr-2" /> New Post
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Title', 'Author', 'Date', 'Status', 'Views', 'Actions'].map(header => (
                                <th 
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusPill status={post.status} map={POST_STATUS_MAP} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {/* 4. Modified Edit Button to open editor with post ID */}
                                            <button
                                                title="Edit Post"
                                                onClick={() => handleEditClick(post.id)}
                                                className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {post.status !== 'Published' && (
                                                <button
                                                    title="Publish"
                                                    onClick={() => updatePostStatus(post.id, 'Published')}
                                                    className="p-1 rounded-full text-green-600 hover:bg-green-100"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                            {post.status !== 'Archived' && (
                                                <button
                                                    title="Archive"
                                                    onClick={() => updatePostStatus(post.id, 'Archived')}
                                                    className="p-1 rounded-full text-red-600 hover:bg-red-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-gray-500 text-lg">
                                    No posts match the current filter.
                                
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Blog;