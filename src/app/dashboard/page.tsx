'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search as SearchIcon, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  const [comingSoonModal, setComingSoonModal] = useState<{show: boolean, title: string}>({show: false, title: ''})

  const features = [
    {
      name: 'Lookups',
      icon: SearchIcon,
      href: '/dashboard/lookups',
      description: 'Search and view services and parts inventory',
      active: true
    },
    {
      name: 'Employee Performance',
      icon: TrendingUp,
      href: '#',
      description: 'Track team performance and efficiency metrics',
      active: false
    },
    {
      name: 'Preventative Maintenance',
      icon: Calendar,
      href: '#',
      description: 'Schedule and manage vehicle maintenance tasks',
      active: false
    }
  ]

  const handleFeatureClick = (feature: typeof features[0], e: React.MouseEvent) => {
    if (!feature.active) {
      e.preventDefault()
      setComingSoonModal({ show: true, title: feature.name })
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Kerry Bros Internal Portal
        </h1>
        <p className="text-xl text-gray-600">
          Access your tools and resources from the navigation menu
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div key={feature.name} onClick={(e) => handleFeatureClick(feature, e)}>
            <Link href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-truck-blue transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-truck-blue/10 rounded-lg w-fit mb-4 group-hover:bg-truck-blue group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-truck-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-truck-blue font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span>Get started</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-gray-500">
          Select any option from the sidebar to access specific features
        </p>
      </motion.div>

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
