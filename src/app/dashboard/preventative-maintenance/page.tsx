'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Plus,
  Filter
} from 'lucide-react'

export default function PreventativeMaintenancePage() {
  const [filterStatus, setFilterStatus] = useState('all')

  const maintenanceTasks = [
    {
      id: 1,
      vehicle: { make: 'Freightliner', model: 'Cascadia', licensePlate: 'FL001', year: '2021' },
      type: 'Oil Change',
      dueDate: '2024-01-20',
      lastServiced: '2023-12-15',
      mileage: '485,000',
      nextMileage: '490,000',
      status: 'Due Soon',
      priority: 'High'
    },
    {
      id: 2,
      vehicle: { make: 'Peterbilt', model: '579', licensePlate: 'PB002', year: '2022' },
      type: 'Brake Inspection',
      dueDate: '2024-01-18',
      lastServiced: '2023-11-18',
      mileage: '320,000',
      nextMileage: '330,000',
      status: 'Overdue',
      priority: 'Critical'
    },
    {
      id: 3,
      vehicle: { make: 'Kenworth', model: 'T680', licensePlate: 'KW003', year: '2023' },
      type: 'Tire Rotation',
      dueDate: '2024-01-25',
      lastServiced: '2023-12-25',
      mileage: '125,000',
      nextMileage: '130,000',
      status: 'Upcoming',
      priority: 'Medium'
    },
    {
      id: 4,
      vehicle: { make: 'Freightliner', model: 'Cascadia', licensePlate: 'FL004', year: '2020' },
      type: 'Transmission Service',
      dueDate: '2024-01-15',
      lastServiced: '2023-10-15',
      mileage: '580,000',
      nextMileage: '600,000',
      status: 'Overdue',
      priority: 'Critical'
    },
    {
      id: 5,
      vehicle: { make: 'Volvo', model: 'VNL', licensePlate: 'VO005', year: '2023' },
      type: 'AC Service',
      dueDate: '2024-02-01',
      lastServiced: '2023-12-01',
      mileage: '95,000',
      nextMileage: '100,000',
      status: 'Upcoming',
      priority: 'Low'
    },
    {
      id: 6,
      vehicle: { make: 'Peterbilt', model: '579', licensePlate: 'PB006', year: '2021' },
      type: 'Battery Check',
      dueDate: '2024-02-05',
      lastServiced: '2024-01-05',
      mileage: '425,000',
      nextMileage: '430,000',
      status: 'Upcoming',
      priority: 'Medium'
    }
  ]

  const filteredTasks = maintenanceTasks.filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Due Soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const stats = {
    overdue: maintenanceTasks.filter(t => t.status === 'Overdue').length,
    dueSoon: maintenanceTasks.filter(t => t.status === 'Due Soon').length,
    upcoming: maintenanceTasks.filter(t => t.status === 'Upcoming').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Preventative Maintenance</h1>
          <p className="text-gray-600">Schedule and track vehicle maintenance tasks</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Schedule Maintenance
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
          { label: 'Due Soon', value: stats.dueSoon, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Upcoming', value: stats.upcoming, icon: Calendar, color: 'bg-blue-100 text-blue-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          <div className="flex space-x-2">
            {['all', 'Overdue', 'Due Soon', 'Upcoming'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-truck-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-truck-blue/10 rounded-lg">
                  <Truck className="w-8 h-8 text-truck-blue" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {task.vehicle.make} {task.vehicle.model} ({task.vehicle.year})
                    </h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">License: {task.vehicle.licensePlate}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <AlertTriangle className={`w-4 h-4 mr-1 ${getPriorityColor(task.priority)}`} />
                      Priority: <span className={`font-medium ml-1 ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Maintenance Type</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">{task.type}</p>
                <p className="text-sm text-gray-600 mb-1">Last Serviced</p>
                <p className="text-sm font-medium text-gray-900 mb-4">
                  {new Date(task.lastServiced).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-end space-x-6 text-sm text-gray-600">
                  <div>
                    <p className="text-xs text-gray-500">Current Mileage</p>
                    <p className="font-medium">{task.mileage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Next Service</p>
                    <p className="font-medium">{task.nextMileage}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <button className="px-4 py-2 text-sm font-medium text-truck-blue border border-truck-blue rounded-lg hover:bg-truck-blue hover:text-white transition-colors">
                Reschedule
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors">
                Mark as Complete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No maintenance tasks found for this filter.</p>
        </motion.div>
      )}
    </div>
  )
}

