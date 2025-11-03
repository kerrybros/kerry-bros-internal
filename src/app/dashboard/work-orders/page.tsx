'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Truck,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react'

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const workOrders = [
    {
      id: 'WO-2024-001',
      orderNumber: 'WO-2024-001',
      title: 'Engine Diagnostic and Oil Change',
      vehicle: { make: 'Freightliner', model: 'Cascadia', licensePlate: 'FL001' },
      customer: 'ABC Logistics',
      technician: 'Mike Johnson',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2024-01-10',
      dueDate: '2024-01-15',
      estimatedHours: 4,
      actualHours: 3,
      progress: 75,
      description: 'Complete engine diagnostic scan and perform routine oil change service'
    },
    {
      id: 'WO-2024-002',
      orderNumber: 'WO-2024-002',
      title: 'Brake System Inspection and Repair',
      vehicle: { make: 'Peterbilt', model: '579', licensePlate: 'PB002' },
      customer: 'XYZ Transport',
      technician: 'Sarah Davis',
      priority: 'Critical',
      status: 'Pending',
      createdAt: '2024-01-11',
      dueDate: '2024-01-14',
      estimatedHours: 6,
      actualHours: 0,
      progress: 0,
      description: 'Inspect brake system and replace worn brake pads and rotors'
    },
    {
      id: 'WO-2024-003',
      orderNumber: 'WO-2024-003',
      title: 'Transmission Service',
      vehicle: { make: 'Kenworth', model: 'T680', licensePlate: 'KW003' },
      customer: 'Fast Freight Co',
      technician: 'Carlos Rodriguez',
      priority: 'Medium',
      status: 'Completed',
      createdAt: '2024-01-08',
      dueDate: '2024-01-13',
      estimatedHours: 3,
      actualHours: 2.5,
      progress: 100,
      description: 'Transmission fluid change and filter replacement'
    },
    {
      id: 'WO-2024-004',
      orderNumber: 'WO-2024-004',
      title: 'Tire Rotation and Alignment',
      vehicle: { make: 'Volvo', model: 'VNL', licensePlate: 'VL004' },
      customer: 'Highway Express',
      technician: 'David Wilson',
      priority: 'Low',
      status: 'In Progress',
      createdAt: '2024-01-12',
      dueDate: '2024-01-16',
      estimatedHours: 2,
      actualHours: 0.8,
      progress: 40,
      description: 'Rotate tires and perform wheel alignment check'
    },
    {
      id: 'WO-2024-005',
      orderNumber: 'WO-2024-005',
      title: 'Air Conditioning Repair',
      vehicle: { make: 'Mack', model: 'Anthem', licensePlate: 'MK005' },
      customer: 'Cool Transport',
      technician: 'Lisa Thompson',
      priority: 'Medium',
      status: 'Overdue',
      createdAt: '2024-01-09',
      dueDate: '2024-01-12',
      estimatedHours: 5,
      actualHours: 4,
      progress: 60,
      description: 'Diagnose and repair air conditioning system leak'
    }
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

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.technician.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase().replace(' ', '_') === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority.toLowerCase() === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Orders</h1>
          <p className="text-gray-600">Manage and track all service requests</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <motion.button
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </motion.button>
          <motion.button
            className="flex items-center px-4 py-2 bg-truck-orange text-white rounded-lg hover:bg-truck-orange/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Work Order
          </motion.button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search work orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-truck-orange focus:border-truck-orange"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-truck-orange focus:border-truck-orange"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-truck-orange focus:border-truck-orange"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Work Orders List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredOrders.length} Work Orders
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              className="p-6 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`text-sm font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority} Priority
                    </span>
                  </div>
                  
                  <h5 className="text-lg text-gray-800 mb-2">{order.title}</h5>
                  <p className="text-gray-600 mb-3">{order.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      {order.vehicle.make} {order.vehicle.model} - {order.vehicle.licensePlate}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {order.technician}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Due: {new Date(order.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {order.status !== 'Completed' && order.status !== 'Pending' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-truck-orange h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${order.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Est: {order.estimatedHours}h</span>
                  <span>Actual: {order.actualHours}h</span>
                  <span>Created: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <button className="text-truck-orange hover:text-truck-orange/80 font-medium text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
