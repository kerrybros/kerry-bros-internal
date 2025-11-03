'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Search, 
  Wrench,
  Package,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react'

export default function LookupsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'services' | 'parts'>('services')

  const services = [
    {
      id: 1,
      code: 'ENG-001',
      name: 'Engine Diagnostic',
      description: 'Complete engine diagnostic scan and analysis',
      duration: '2-4 hours',
      price: '$450',
      category: 'Engine'
    },
    {
      id: 2,
      code: 'BRK-002',
      name: 'Brake System Service',
      description: 'Brake inspection, pad replacement, and fluid change',
      duration: '3-5 hours',
      price: '$650',
      category: 'Brakes'
    },
    {
      id: 3,
      code: 'OIL-003',
      name: 'Oil Change Service',
      description: 'Full synthetic oil change with filter replacement',
      duration: '1 hour',
      price: '$120',
      category: 'Maintenance'
    },
    {
      id: 4,
      code: 'TRN-004',
      name: 'Transmission Service',
      description: 'Transmission fluid change and inspection',
      duration: '2-3 hours',
      price: '$380',
      category: 'Transmission'
    },
    {
      id: 5,
      code: 'ELS-005',
      name: 'Electrical System Check',
      description: 'Complete electrical system diagnostic',
      duration: '2-4 hours',
      price: '$420',
      category: 'Electrical'
    },
    {
      id: 6,
      code: 'AC-006',
      name: 'HVAC Service',
      description: 'AC system recharge and filter replacement',
      duration: '1-2 hours',
      price: '$280',
      category: 'HVAC'
    }
  ]

  const parts = [
    {
      id: 1,
      partNumber: 'BRK-PAD-FRT-001',
      name: 'Front Brake Pads',
      description: 'Heavy-duty front brake pads for semi-trucks',
      category: 'Brakes',
      manufacturer: 'Dexter Axle',
      price: '$125.00',
      stock: 45,
      status: 'In Stock'
    },
    {
      id: 2,
      partNumber: 'ENG-FLT-002',
      name: 'Oil Filter',
      description: 'Premium heavy-duty engine oil filter',
      category: 'Engine',
      manufacturer: 'Fleetguard',
      price: '$18.50',
      stock: 120,
      status: 'In Stock'
    },
    {
      id: 3,
      partNumber: 'TRN-FLD-003',
      name: 'Transmission Fluid',
      description: 'Synthetic transmission fluid (1 gallon)',
      category: 'Transmission',
      manufacturer: 'Valvoline',
      price: '$45.00',
      stock: 12,
      status: 'Low Stock'
    },
    {
      id: 4,
      partNumber: 'ELS-BAT-004',
      name: 'Battery',
      description: '12V Heavy-duty truck battery',
      category: 'Electrical',
      manufacturer: 'Interstate',
      price: '$280.00',
      stock: 8,
      status: 'Low Stock'
    },
    {
      id: 5,
      partNumber: 'TIR-ALL-005',
      name: 'All-Terrain Tire',
      description: '22.5 inch all-terrain commercial tire',
      category: 'Tires',
      manufacturer: 'Michelin',
      price: '$425.00',
      stock: 24,
      status: 'In Stock'
    },
    {
      id: 6,
      partNumber: 'AC-CMP-006',
      name: 'AC Compressor',
      description: 'Heavy-duty AC compressor unit',
      category: 'HVAC',
      manufacturer: 'Sanden',
      price: '$850.00',
      stock: 0,
      status: 'Out of Stock'
    }
  ]

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lookups</h1>
          <p className="text-gray-600">Search and view services and parts</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex space-x-2">
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'services'
              ? 'bg-truck-blue text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Wrench className="w-5 h-5" />
            <span>Services</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('parts')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'parts'
              ? 'bg-truck-blue text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Parts</span>
          </div>
        </button>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-truck-blue focus:border-truck-blue text-sm"
            placeholder={activeTab === 'services' 
              ? 'Search by service name, code, or category...' 
              : 'Search by part name, part number, or category...'
            }
          />
        </div>
      </motion.div>

      {/* Services Grid */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-truck-blue/10 rounded-lg">
                  <Wrench className="w-6 h-6 text-truck-blue" />
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {service.code}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Duration: <span className="font-medium ml-1">{service.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  Price: <span className="font-medium ml-1">{service.price}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                  Category: <span className="font-medium ml-1">{service.category}</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors font-medium">
                Select Service
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Parts Grid */}
      {activeTab === 'parts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part, index) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-truck-blue/10 rounded-lg">
                  <Package className="w-6 h-6 text-truck-blue" />
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(part.status)}`}>
                  {part.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{part.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{part.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-2 text-gray-400" />
                  Part #: <span className="font-medium ml-1">{part.partNumber}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2 text-gray-400" />
                  Category: <span className="font-medium ml-1">{part.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                  Stock: <span className="font-medium ml-1">{part.stock} units</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-gray-900">
                  <DollarSign className="w-4 h-4 mr-2 text-truck-blue" />
                  {part.price}
                </div>
              </div>

              {part.status === 'In Stock' || part.status === 'Low Stock' ? (
                <button className="w-full px-4 py-2 bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors font-medium">
                  Add to Cart
                </button>
              ) : (
                <button className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                  Out of Stock
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {(activeTab === 'services' && filteredServices.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No services found matching your search.</p>
        </motion.div>
      )}

      {(activeTab === 'parts' && filteredParts.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No parts found matching your search.</p>
        </motion.div>
      )}
    </div>
  )
}

