'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  Truck,
  MoreHorizontal,
  Filter
} from 'lucide-react'

export default function WorkOrdersOverview() {
  const workOrders = [
    {
      id: 'WO-2024-001',
      vehicle: 'Freightliner Cascadia - FL001',
      issue: 'Engine diagnostic and oil change',
      technician: 'Mike Johnson',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-01-15',
      progress: 75,
      estimatedHours: 4,
      actualHours: 3,
    },
    {
      id: 'WO-2024-002',
      vehicle: 'Peterbilt 579 - PB002',
      issue: 'Brake system inspection and repair',
      technician: 'Sarah Davis',
      priority: 'Critical',
      status: 'Pending',
      dueDate: '2024-01-14',
      progress: 0,
      estimatedHours: 6,
      actualHours: 0,
    },
    {
      id: 'WO-2024-003',
      vehicle: 'Kenworth T680 - KW003',
      issue: 'Transmission service and filter replacement',
      technician: 'Carlos Rodriguez',
      priority: 'Medium',
      status: 'Completed',
      dueDate: '2024-01-13',
      progress: 100,
      estimatedHours: 3,
      actualHours: 2.5,
    },
    {
      id: 'WO-2024-004',
      vehicle: 'Volvo VNL - VL004',
      issue: 'Tire rotation and alignment check',
      technician: 'David Wilson',
      priority: 'Low',
      status: 'In Progress',
      dueDate: '2024-01-16',
      progress: 40,
      estimatedHours: 2,
      actualHours: 0.8,
    },
    {
      id: 'WO-2024-005',
      vehicle: 'Mack Anthem - MK005',
      issue: 'Air conditioning system repair',
      technician: 'Lisa Thompson',
      priority: 'Medium',
      status: 'Overdue',
      dueDate: '2024-01-12',
      progress: 60,
      estimatedHours: 5,
      actualHours: 4,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600'
      case 'High':
        return 'text-orange-600'
      case 'Medium':
        return 'text-yellow-600'
      case 'Low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'In Progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'Overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Active Work Orders</h3>
          <p className="text-sm text-gray-600">Current jobs and their progress</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {workOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{order.id}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(order.priority)}`}>
                    {order.priority} Priority
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Truck className="w-4 h-4 mr-2" />
                  {order.vehicle}
                </div>
                <p className="text-sm text-gray-700 mb-2">{order.issue}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {order.technician}
                  <span className="mx-2">•</span>
                  Due: {new Date(order.dueDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
              </div>
            </div>

            {order.status !== 'Completed' && order.status !== 'Pending' && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{order.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-truck-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${order.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>Est: {order.estimatedHours}h</span>
                <span>Actual: {order.actualHours}h</span>
              </div>
              <button className="text-truck-blue hover:text-truck-blue/80 font-medium">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="px-4 py-2 text-sm font-medium text-truck-blue border border-truck-blue rounded-lg hover:bg-truck-blue hover:text-white transition-colors">
          View All Work Orders
        </button>
      </div>
    </motion.div>
  )
}
