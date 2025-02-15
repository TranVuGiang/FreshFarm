import React from 'react'

const Notifications = ({ notifications }) => {
  return (
    <div>
         <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Thông báo</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-b pb-4 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors p-2 rounded"
              >
                <p className="mb-1">{notification.message}</p>
                <p className="text-sm text-gray-600">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Notifications
