'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users
} from 'lucide-react'

export default function EmployeePerformancePage() {
  const employees = [
    {
      id: 1,
      name: 'Mike Johnson',
      role: 'Senior Mechanic',
      avatar: 'MJ',
      currentScore: 96,
      previousScore: 92,
      completedJobs: 156,
      activeJobs: 3,
      avgTime: 3.2,
      efficiency: 98,
      specialties: ['Engine Repair', 'Transmission'],
      status: 'Excellent'
    },
    {
      id: 2,
      name: 'Sarah Davis',
      role: 'Brake Specialist',
      avatar: 'SD',
      currentScore: 94,
      previousScore: 90,
      completedJobs: 142,
      activeJobs: 2,
      avgTime: 2.8,
      efficiency: 95,
      specialties: ['Brakes', 'Suspension'],
      status: 'Excellent'
    },
    {
      id: 3,
      name: 'Carlos Rodriguez',
      role: 'Transmission Tech',
      avatar: 'CR',
      currentScore: 87,
      previousScore: 85,
      completedJobs: 128,
      activeJobs: 1,
      avgTime: 4.1,
      efficiency: 88,
      specialties: ['Transmission', 'Drivetrain'],
      status: 'Good'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'General Mechanic',
      avatar: 'DW',
      currentScore: 82,
      previousScore: 84,
      completedJobs: 115,
      activeJobs: 4,
      avgTime: 3.8,
      efficiency: 83,
      specialties: ['Tires', 'Alignment'],
      status: 'Good'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'HVAC Specialist',
      avatar: 'LT',
      currentScore: 79,
      previousScore: 81,
      completedJobs: 98,
      activeJobs: 2,
      avgTime: 4.2,
      efficiency: 80,
      specialties: ['HVAC', 'Electrical'],
      status: 'Needs Improvement'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'bg-green-100 text-green-800'
      case 'Good':
        return 'bg-blue-100 text-blue-800'
      case 'Needs Improvement':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const overallStats = {
    totalEmployees: employees.length,
    avgScore: Math.round(employees.reduce((sum, e) => sum + e.currentScore, 0) / employees.length),
    totalJobsCompleted: employees.reduce((sum, e) => sum + e.completedJobs, 0),
    avgEfficiency: Math.round(employees.reduce((sum, e) => sum + e.efficiency, 0) / employees.length)
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Performance</h1>
          <p className="text-gray-600">Track and monitor team performance metrics</p>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Employees', value: overallStats.totalEmployees, icon: Users },
          { label: 'Average Score', value: overallStats.avgScore, icon: Award },
          { label: 'Jobs Completed', value: overallStats.totalJobsCompleted, icon: CheckCircle },
          { label: 'Avg Efficiency', value: `${overallStats.avgEfficiency}%`, icon: TrendingUp }
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
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-truck-blue/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-truck-blue" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Employee Performance Cards */}
      <div className="space-y-4">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-truck-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {employee.avatar}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{employee.role}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    {employee.specialties.map((specialty, idx) => (
                      <span key={idx} className="text-gray-500">
                        {specialty}
                        {idx < employee.specialties.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <Award className="w-5 h-5 text-truck-blue" />
                    <span className={`text-3xl font-bold ${getScoreColor(employee.currentScore)}`}>
                      {employee.currentScore}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Performance Score</p>
                  {employee.currentScore > employee.previousScore ? (
                    <div className="flex items-center text-green-600 text-xs mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{employee.currentScore - employee.previousScore}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 text-xs mt-1">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {employee.currentScore - employee.previousScore}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{employee.completedJobs}</span>
                  </div>
                  <p className="text-xs text-gray-500">Completed Jobs</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">{employee.avgTime}h</span>
                  </div>
                  <p className="text-xs text-gray-500">Avg Time</p>
                </div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Efficiency Rate</span>
                <span className="font-medium">{employee.efficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    employee.efficiency >= 90 ? 'bg-green-500' :
                    employee.efficiency >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${employee.efficiency}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

