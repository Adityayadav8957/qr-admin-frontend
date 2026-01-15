import { useState, useEffect } from 'react';
import { Search, Filter, Trash2, X, AlertCircle, Smartphone, Globe, MapPin } from 'lucide-react';
import QRCodeTable from '../components/QRCodes/QRCodeTable';
import QRCodeModal from '../components/QRCodes/QRCodeModal';
import { getQRCodes, updateQRCode, deleteQRCode, getQRCodeDetails } from '../api/adminApi';

const QRCodes = () => {
  const [qrCodes, setQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedQR, setSelectedQR] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [qrToDelete, setQrToDelete] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [qrDetails, setQrDetails] = useState(null);

  useEffect(() => {
    fetchQRCodes();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await getQRCodes({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        isActive: statusFilter,
      });
      setQRCodes(response.data.qrCodes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (qr) => {
    try {
      const response = await getQRCodeDetails(qr._id);
      setQrDetails(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching QR details:', error);
    }
  };

  const handleEdit = (qr) => {
    setSelectedQR(qr);
    setShowModal(true);
  };

  const handleSave = async (qrId, data) => {
    try {
      await updateQRCode(qrId, data);
      fetchQRCodes();
      setShowModal(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = (qr) => {
    setQrToDelete(qr);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteQRCode(qrToDelete._id);
      fetchQRCodes();
      setShowDeleteConfirm(false);
      setQrToDelete(null);
    } catch (error) {
      console.error('Error deleting QR code:', error);
      alert(error.response?.data?.message || 'Failed to delete QR code');
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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">QR Management</h1>
          <p className="text-gray-500 mt-1">Monitor, edit, and track all generated QR codes.</p>
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
              placeholder="Search by name or short ID..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading QR codes...</p>
          </div>
        ) : qrCodes.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No QR Codes Found</h3>
            <p className="text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn't find any QR codes matching your current filters. Try adjusting your search.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <QRCodeTable
                qrCodes={qrCodes}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            {/* Pagination */}
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
        <QRCodeModal
          qrCode={selectedQR}
          onClose={() => {
            setShowModal(false);
            setSelectedQR(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowDeleteConfirm(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all scale-100">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete QR Code?</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <strong>{qrToDelete?.name}</strong>? 
                This will permanently remove all associated analytics data. This action cannot be undone.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setQrToDelete(null);
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
      {showDetails && qrDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowDetails(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">QR Analysis</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Deep dive into scan performance</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setQrDetails(null);
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <p className="text-xs font-semibold text-blue-600 uppercase">Total Scans</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{qrDetails.analytics.totalScans}</p>
                  </div>
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                    <p className="text-xs font-semibold text-purple-600 uppercase">Short ID</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{qrDetails.qrCode.shortId}</p>
                  </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Owner</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">{qrDetails.qrCode.userId?.name}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Devices */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <h4 className="font-semibold text-gray-900">Device Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      {qrDetails.analytics.deviceBreakdown?.map((device, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">{device._id || 'Unknown'}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">{device.count}</span>
                        </div>
                      ))}
                      {(!qrDetails.analytics.deviceBreakdown || qrDetails.analytics.deviceBreakdown.length === 0) && (
                        <p className="text-sm text-gray-400 italic">No device data available</p>
                      )}
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                     <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <h4 className="font-semibold text-gray-900">Top Locations</h4>
                    </div>
                    <div className="space-y-3">
                      {qrDetails.analytics.locationBreakdown?.slice(0, 5).map((loc, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">{loc._id || 'Unknown'}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">{loc.count}</span>
                        </div>
                      ))}
                      {(!qrDetails.analytics.locationBreakdown || qrDetails.analytics.locationBreakdown.length === 0) && (
                        <p className="text-sm text-gray-400 italic">No location data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodes;