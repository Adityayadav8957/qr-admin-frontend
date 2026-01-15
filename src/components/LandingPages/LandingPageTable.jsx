import { Edit2, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const LandingPageTable = ({ landingPages, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Landing Page
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Template
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Views
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              AI
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
          {landingPages.map((lp) => (
            <tr key={lp._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{lp.name}</div>
                <div className="text-sm text-gray-500">{lp.title?.substring(0, 40) || 'No title'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lp.userId?.name || 'Unknown'}</div>
                <div className="text-xs text-gray-500">{lp.userId?.email || ''}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {lp.template}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{lp.views}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lp.isActive ? (
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
              <td className="px-6 py-4 whitespace-nowrap">
                {lp.isAIGenerated ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm">Yes</span>
                  </span>
                ) : (
                  <span className="flex items-center text-gray-500">
                    <XCircle size={16} className="mr-1" />
                    <span className="text-sm">No</span>
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(lp.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onView(lp)}
                  className="text-green-600 hover:text-green-900 mr-3"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(lp)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(lp)}
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

export default LandingPageTable;
