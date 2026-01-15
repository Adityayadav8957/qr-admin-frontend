import { useState, useEffect } from 'react';
import { Search, Filter, Trash2, X, Eye, Monitor, Layers, Palette, Link as LinkIcon, ExternalLink } from 'lucide-react';
import LandingPageTable from '../components/LandingPages/LandingPageTable';
import LandingPageModal from '../components/LandingPages/LandingPageModal';
import { getLandingPages, updateLandingPage, deleteLandingPage, getLandingPageDetails } from '../api/adminApi';
import LandingPagePreview from '../components/LandingPages/LandingPagePreview';

const LandingPages = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLP, setSelectedLP] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lpToDelete, setLpToDelete] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [lpDetails, setLpDetails] = useState(null);

  useEffect(() => {
    fetchLandingPages();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchLandingPages = async () => {
    try {
      setLoading(true);
      const response = await getLandingPages({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        isActive: statusFilter,
      });
      setLandingPages(response.data.landingPages);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching landing pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (lp) => {
    try {
      const response = await getLandingPageDetails(lp._id);
      setLpDetails(response.data.landingPage);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching landing page details:', error);
    }
  };

  const handleEdit = (lp) => {
    setSelectedLP(lp);
    setShowModal(true);
  };

  const handleSave = async (lpId, data) => {
    try {
      await updateLandingPage(lpId, data);
      fetchLandingPages();
      setShowModal(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = (lp) => {
    setLpToDelete(lp);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLandingPage(lpToDelete._id);
      fetchLandingPages();
      setShowDeleteConfirm(false);
      setLpToDelete(null);
    } catch (error) {
      console.error('Error deleting landing page:', error);
      alert(error.response?.data?.message || 'Failed to delete landing page');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Landing Pages</h1>
          <p className="text-gray-500 mt-1">Design, publish, and manage mobile landing pages.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="md:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading pages...</p>
          </div>
        ) : landingPages.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No Pages Found</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn't find any landing pages matching your search.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <LandingPageTable
                landingPages={landingPages}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                 <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Previous
                </button>
                <span className="text-sm font-medium text-gray-600">
                  Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <LandingPageModal
          landingPage={selectedLP}
          onClose={() => {
            setShowModal(false);
            setSelectedLP(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowDeleteConfirm(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 p-4 text-center sm:p-0">
             <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all scale-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Page?</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <strong>{lpToDelete?.name}</strong>? 
                This action is irreversible and the page will stop working immediately.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setLpToDelete(null);
                  }}
                   className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="w-full px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
     {showDetails && lpDetails && (
  <LandingPagePreview 
    landingPage={lpDetails}
    onClose={() => {
      setShowDetails(false);
      setLpDetails(null);
    }}
  />
)}
    </div>
  );
};

export default LandingPages;