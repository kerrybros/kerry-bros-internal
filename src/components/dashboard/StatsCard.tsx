'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  color: 'green' | 'blue' | 'orange' | 'purple' | 'red'
}

export default function StatsCard({ title, value, change, trend, icon, color }: StatsCardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  }

  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend]}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {change}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </motion.div>
  )
}
