'use client'

import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const settings = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your personal information and preferences',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences and alerts',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Update password and security settings',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Manage backups and data export options',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize theme and display preferences',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: SettingsIcon,
      title: 'System Settings',
      description: 'Configure system-wide settings and integrations',
      color: 'bg-gray-100 text-gray-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 ${setting.color} rounded-lg`}>
                <setting.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{setting.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{setting.description}</p>
                <button className="text-sm font-medium text-truck-blue hover:text-truck-blue/80">
                  Configure →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Settings</h2>
        
        <div className="space-y-4">
          {/* Example Setting */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates about important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truck-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truck-blue"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">SMS Notifications</p>
              <p className="text-sm text-gray-600">Get SMS alerts for urgent matters</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truck-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truck-blue"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truck-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truck-blue"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Auto-save</p>
              <p className="text-sm text-gray-600">Automatically save changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-truck-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-truck-blue"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="flex items-center px-4 py-2 bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors">
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}

