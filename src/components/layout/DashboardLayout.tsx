'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import { 
  Menu, 
  X, 
  Home, 
  Search as SearchIcon, 
  Users,
  Calendar,
  Bell,
  TrendingUp,
  Truck,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [comingSoonModal, setComingSoonModal] = useState<{show: boolean, title: string}>({show: false, title: ''})
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home, active: true },
    { name: 'Lookups', href: '/dashboard/lookups', icon: SearchIcon, active: true },
    { name: 'Employee Performance', href: '#', icon: TrendingUp, active: false },
    { name: 'Preventative Maintenance', href: '#', icon: Calendar, active: false },
  ]

  const handleNavClick = (item: typeof navigation[0]) => {
    if (!item.active) {
      setComingSoonModal({ show: true, title: item.name })
      setSidebarOpen(false)
      return false
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320,
        }}
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl"
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-truck-blue rounded-lg flex items-center justify-center mr-3">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Kerry Bros</h1>
                <p className="text-xs text-gray-500">Internal Portal</p>
              </div>
            </div>
            <button
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              if (item.active) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-truck-blue text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </motion.div>
                  </Link>
                )
              } else {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="group w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </button>
                )
              }
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Kerry Bros Employee
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Logged in securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-truck-blue rounded-lg flex items-center justify-center mr-3">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Kerry Bros</h1>
                <p className="text-xs text-gray-500">Internal Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              if (item.active) {
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-truck-blue text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </div>
                  </Link>
                )
              } else {
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="group w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </button>
                )
              }
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Kerry Bros Employee
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Logged in securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-80 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* User menu - handled by Clerk */}
              <div>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {comingSoonModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setComingSoonModal({ show: false, title: '' })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-truck-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-truck-blue" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
                <p className="text-gray-600 mb-6">
                  {comingSoonModal.title} is currently under development and will be available soon.
                </p>
                <button
                  onClick={() => setComingSoonModal({ show: false, title: '' })}
                  className="w-full px-6 py-3 bg-truck-blue text-white rounded-lg hover:bg-truck-blue/90 transition-colors font-medium"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
