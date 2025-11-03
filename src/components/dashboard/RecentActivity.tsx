'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Truck, 
  Package,
  Clock,
  FileText,
  Settings
} from 'lucide-react'

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'work_order_completed',
      title: 'Work Order Completed',
      description: 'WO-2024-003 - Transmission service completed by Carlos Rodriguez',
      time: '5 minutes ago',
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      type: 'priority_alert',
      title: 'Priority Alert',
      description: 'Critical brake issue detected on Peterbilt 579 - PB002',
      time: '12 minutes ago',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 3,
      type: 'technician_assigned',
      title: 'Technician Assigned',
      description: 'Sarah Davis assigned to WO-2024-002 brake system repair',
      time: '25 minutes ago',
      icon: <User className="w-4 h-4" />,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 4,
      type: 'vehicle_added',
      title: 'New Vehicle Added',
      description: 'Freightliner Cascadia FL006 added to fleet registry',
      time: '1 hour ago',
      icon: <Truck className="w-4 h-4" />,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 5,
      type: 'inventory_low',
      title: 'Low Inventory Alert',
      description: 'Brake pads stock below minimum threshold (5 units remaining)',
      time: '2 hours ago',
      icon: <Package className="w-4 h-4" />,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 6,
      type: 'schedule_updated',
      title: 'Schedule Updated',
      description: 'Mike Johnson\'s schedule updated for tomorrow\'s maintenance',
      time: '3 hours ago',
      icon: <Clock className="w-4 h-4" />,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 7,
      type: 'report_generated',
      title: 'Report Generated',
      description: 'Monthly efficiency report completed and sent to management',
      time: '4 hours ago',
      icon: <FileText className="w-4 h-4" />,
      color: 'text-gray-600 bg-gray-50'
    },
    {
      id: 8,
      type: 'system_update',
      title: 'System Update',
      description: 'Portal updated with new features and security improvements',
      time: '6 hours ago',
      icon: <Settings className="w-4 h-4" />,
      color: 'text-teal-600 bg-teal-50'
    }
  ]

  const getTimeColor = (time: string) => {
    if (time.includes('minute')) return 'text-green-600'
    if (time.includes('hour') && parseInt(time) <= 2) return 'text-yellow-600'
    return 'text-gray-500'
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600">Latest updates and notifications</p>
        </div>
        <button className="text-sm text-truck-blue hover:text-truck-blue/80 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className={`p-2 rounded-full ${activity.color}`}>
              {activity.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </h4>
                <span className={`text-xs font-medium ${getTimeColor(activity.time)}`}>
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">3 completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span className="text-gray-600">1 alert</span>
            </div>
          </div>
          <button className="text-truck-blue hover:text-truck-blue/80 font-medium">
            Mark all as read
          </button>
        </div>
      </div>
    </motion.div>
  )
}
