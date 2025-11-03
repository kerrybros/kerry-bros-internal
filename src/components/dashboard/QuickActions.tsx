'use client'

import { motion } from 'framer-motion'
import { 
  Plus, 
  FileText, 
  Truck, 
  Users, 
  Package, 
  Calendar,
  Settings,
  BarChart3,
  Wrench,
  ClipboardList
} from 'lucide-react'

export default function QuickActions() {
  const actions = [
    {
      title: 'New Work Order',
      description: 'Create a new service request',
      icon: <Plus className="w-5 h-5" />,
      color: 'bg-truck-blue hover:bg-truck-blue/90',
      href: '/dashboard/work-orders/new'
    },
    {
      title: 'Add Vehicle',
      description: 'Register new truck',
      icon: <Truck className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '/dashboard/fleet/new'
    },
    {
      title: 'Schedule Service',
      description: 'Book maintenance slot',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/dashboard/schedule/new'
    },
    {
      title: 'Inventory Check',
      description: 'Update parts stock',
      icon: <Package className="w-5 h-5" />,
      color: 'bg-purple-600 hover:bg-purple-700',
      href: '/dashboard/inventory'
    },
    {
      title: 'Team Status',
      description: 'View technician availability',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      href: '/dashboard/team'
    },
    {
      title: 'Generate Report',
      description: 'Create performance report',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/dashboard/reports/new'
    }
  ]

  const shortcuts = [
    {
      title: 'Emergency Service',
      description: 'Priority breakdown assistance',
      icon: <Wrench className="w-4 h-4" />,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      title: 'Daily Checklist',
      description: 'Morning inspection tasks',
      icon: <ClipboardList className="w-4 h-4" />,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      title: 'Performance Metrics',
      description: 'View today\'s KPIs',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      title: 'System Settings',
      description: 'Configure preferences',
      icon: <Settings className="w-4 h-4" />,
      color: 'text-gray-600 bg-gray-50 border-gray-200'
    }
  ]

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600">Frequently used functions</p>
      </div>

      <div className="space-y-3 mb-6">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            className={`w-full flex items-center p-3 rounded-lg text-white transition-all duration-200 ${action.color}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 bg-white/20 rounded-lg">
                {action.icon}
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <motion.button
              key={shortcut.title}
              className={`w-full flex items-center p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${shortcut.color}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-1">
                  {shortcut.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{shortcut.title}</div>
                  <div className="text-xs opacity-70">{shortcut.description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-truck-blue">23</div>
            <div className="text-xs text-gray-600">Active Tasks</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">156</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
