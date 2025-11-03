'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Truck,
  Calendar,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  MapPin,
  Fuel,
  Settings
} from 'lucide-react'

export default function FleetPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [makeFilter, setMakeFilter] = useState('all')

  const vehicles = [
    {
      id: 1,
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      licensePlate: 'FL001',
      vin: '1FUJGHDV8NLAA1234',
      mileage: 125000,
      status: 'Active',
      location: 'Bay 1',
      lastService: '2024-01-05',
      nextService: '2024-02-05',
      fuelLevel: 85,
      driver: 'John Smith',
      workOrders: 2,
      issues: 0
    },
    {
      id: 2,
      make: 'Peterbilt',
      model: '579',
      year: 2021,
      licensePlate: 'PB002',
      vin: '1XP5DB9X5MD123456',
      mileage: 98000,
      status: 'In Service',
      location: 'Bay 3',
      lastService: '2024-01-10',
      nextService: '2024-02-10',
      fuelLevel: 45,
      driver: 'Mike Johnson',
      workOrders: 1,
      issues: 1
    },
    {
      id: 3,
      make: 'Kenworth',
      model: 'T680',
      year: 2023,
      licensePlate: 'KW003',
      vin: '1XKWD40X5NJ789012',
      mileage: 45000,
      status: 'Active',
      location: 'On Route',
      lastService: '2024-01-08',
      nextService: '2024-02-08',
      fuelLevel: 92,
      driver: 'Sarah Davis',
      workOrders: 0,
      issues: 0
    },
    {
      id: 4,
      make: 'Volvo',
      model: 'VNL',
      year: 2020,
      licensePlate: 'VL004',
      vin: '4V4NC9EH5LN345678',
      mileage: 185000,
      status: 'Maintenance',
      location: 'Bay 2',
      lastService: '2024-01-12',
      nextService: '2024-02-12',
      fuelLevel: 30,
      driver: 'Carlos Rodriguez',
      workOrders: 3,
      issues: 2
    },
    {
      id: 5,
      make: 'Mack',
      model: 'Anthem',
      year: 2019,
      licensePlate: 'MK005',
      vin: '1M1AW07Y5KM901234',
      mileage: 220000,
      status: 'Out of Service',
      location: 'Yard',
      lastService: '2024-01-09',
      nextService: '2024-01-20',
      fuelLevel: 15,
      driver: 'Unassigned',
      workOrders: 1,
      issues: 3
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'In Service':
        return 'bg-blue-100 text-blue-800'
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Service':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'In Service':
        return <Wrench className="w-4 h-4 text-blue-600" />
      case 'Maintenance':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Out of Service':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getFuelColor = (level: number) => {
    if (level > 50) return 'text-green-600'
    if (level > 25) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || vehicle.status.toLowerCase().replace(' ', '_') === statusFilter
    const matchesMake = makeFilter === 'all' || vehicle.make.toLowerCase() === makeFilter
    
    return matchesSearch && matchesStatus && matchesMake
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Management</h1>
          <p className="text-gray-600">Monitor and manage your truck fleet</p>
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
            Add Vehicle
          </motion.button>
        </div>
      </motion.div>

      {/* Fleet Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Service</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Service</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
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
                <option value="active">Active</option>
                <option value="in_service">In Service</option>
                <option value="maintenance">Maintenance</option>
                <option value="out_of_service">Out of Service</option>
              </select>
            </div>
            <select
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-truck-orange focus:border-truck-orange"
            >
              <option value="all">All Makes</option>
              <option value="freightliner">Freightliner</option>
              <option value="peterbilt">Peterbilt</option>
              <option value="kenworth">Kenworth</option>
              <option value="volvo">Volvo</option>
              <option value="mack">Mack</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Vehicle Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-truck-orange/10 rounded-lg">
                  <Truck className="w-6 h-6 text-truck-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{vehicle.licensePlate}</h3>
                  <p className="text-sm text-gray-600">{vehicle.make} {vehicle.model}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
                {getStatusIcon(vehicle.status)}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Year</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Mileage</span>
                <span className="font-medium">{vehicle.mileage.toLocaleString()} mi</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Driver</span>
                <span className="font-medium">{vehicle.driver}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </span>
                <span className="font-medium">{vehicle.location}</span>
              </div>
            </div>

            {/* Fuel Level */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="flex items-center text-gray-600">
                  <Fuel className="w-4 h-4 mr-1" />
                  Fuel Level
                </span>
                <span className={`font-medium ${getFuelColor(vehicle.fuelLevel)}`}>
                  {vehicle.fuelLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    vehicle.fuelLevel > 50 ? 'bg-green-500' :
                    vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${vehicle.fuelLevel}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>

            {/* Service Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Last Service</span>
                <span className="font-medium">{new Date(vehicle.lastService).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600">Next Service</span>
                <span className="font-medium">{new Date(vehicle.nextService).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{vehicle.workOrders} WOs</span>
                  {vehicle.issues > 0 && (
                    <span className="text-red-600">{vehicle.issues} Issues</span>
                  )}
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
