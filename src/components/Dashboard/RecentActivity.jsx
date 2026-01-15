import { formatDistanceToNow } from '../utils/dateUtils';

const RecentActivity = ({ title, items, type }) => {
  const renderItem = (item) => {
    if (type === 'users') {
      return (
        <div key={item._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
          <div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.email}</p>
          </div>
          <div className="text-right">
            <span className={`px-2 py-1 text-xs rounded-full ${
              item.role === 'admin' 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {item.role}
            </span>
            <p className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(item.createdAt)}
            </p>
          </div>
        </div>
      );
    }

    if (type === 'qrcodes') {
      return (
        <div key={item._id} className="flex items-center justify-between py-3 border-b last:border-b-0">
          <div className="flex-1">
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">by {item.userId?.name || 'Unknown'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{item.scanCount} scans</p>
            <p className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(item.createdAt)}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-0">
        {items && items.length > 0 ? (
          items.map(renderItem)
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;