import { Edit2, Trash2, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const QRCodeTable = ({ qrCodes, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              QR Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scans
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {qrCodes.map((qr) => (
            <tr key={qr._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{qr.name}</div>
                <div className="text-sm text-gray-500">{qr.description?.substring(0, 40) || 'No description'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{qr.userId?.name || 'Unknown'}</div>
                <div className="text-xs text-gray-500">{qr.userId?.email || ''}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{qr.shortId}</code>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{qr.scanCount}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {qr.isActive ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm">Active</span>
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <XCircle size={16} className="mr-1" />
                    <span className="text-sm">Inactive</span>
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(qr.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onView(qr)}
                  className="text-green-600 hover:text-green-900 mr-3"
                  title="View Details"
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={() => onEdit(qr)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(qr)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QRCodeTable;