'use client'

import { motion } from 'framer-motion'
import { 
  User, 
  Star, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Award,
  Target
} from 'lucide-react'

export default function TeamPerformance() {
  const teamMembers = [
    {
      id: 1,
      name: 'Mike Johnson',
      role: 'Senior Mechanic',
      avatar: '/api/placeholder/40/40',
      completedJobs: 23,
      efficiency: 96,
      avgTime: 3.2,
      rating: 4.9,
      specialties: ['Engine', 'Transmission'],
      status: 'active',
      currentJob: 'WO-2024-001'
    },
    {
      id: 2,
      name: 'Sarah Davis',
      role: 'Brake Specialist',
      avatar: '/api/placeholder/40/40',
      completedJobs: 19,
      efficiency: 94,
      avgTime: 2.8,
      rating: 4.8,
      specialties: ['Brakes', 'Suspension'],
      status: 'active',
      currentJob: 'WO-2024-002'
    },
    {
      id: 3,
      name: 'Carlos Rodriguez',
      role: 'Transmission Tech',
      avatar: '/api/placeholder/40/40',
      completedJobs: 21,
      efficiency: 92,
      avgTime: 4.1,
      rating: 4.7,
      specialties: ['Transmission', 'Drivetrain'],
      status: 'break',
      currentJob: null
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'General Mechanic',
      avatar: '/api/placeholder/40/40',
      completedJobs: 17,
      efficiency: 89,
      avgTime: 3.5,
      rating: 4.6,
      specialties: ['Tires', 'Alignment'],
      status: 'active',
      currentJob: 'WO-2024-004'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'HVAC Specialist',
      avatar: '/api/placeholder/40/40',
      completedJobs: 15,
      efficiency: 91,
      avgTime: 3.8,
      rating: 4.8,
      specialties: ['HVAC', 'Electrical'],
      status: 'active',
      currentJob: 'WO-2024-005'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'break':
        return 'bg-yellow-100 text-yellow-800'
      case 'offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600'
    if (efficiency >= 90) return 'text-blue-600'
    if (efficiency >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
          <p className="text-sm text-gray-600">Current technician status and metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm text-gray-600">
            <Award className="w-4 h-4 mr-1 text-yellow-500" />
            Top Performer: Mike Johnson
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-truck-blue rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    member.status === 'active' ? 'bg-green-500' : 
                    member.status === 'break' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {member.completedJobs} jobs
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {member.avgTime}h avg
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {member.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className={`w-4 h-4 ${getEfficiencyColor(member.efficiency)}`} />
                  <span className={`font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                    {member.efficiency}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Specialties:</span>
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              {member.currentJob && (
                <div className="text-sm text-gray-600">
                  Current: <span className="font-medium text-truck-blue">{member.currentJob}</span>
                </div>
              )}
            </div>

            {/* Performance bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Performance</span>
                <span>{member.efficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    member.efficiency >= 95 ? 'bg-green-500' :
                    member.efficiency >= 90 ? 'bg-blue-500' :
                    member.efficiency >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${member.efficiency}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-sm text-gray-600">Active Techs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">93%</div>
          <div className="text-sm text-gray-600">Avg Efficiency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">3.5h</div>
          <div className="text-sm text-gray-600">Avg Job Time</div>
        </div>
      </div>
    </motion.div>
  )
}
