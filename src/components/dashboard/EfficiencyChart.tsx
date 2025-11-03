'use client'

import { motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function EfficiencyChart() {
  const data = {
    labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          '#10B981', // Green
          '#3B82F6', // Blue
          '#F59E0B', // Yellow
          '#EF4444', // Red
        ],
        borderColor: [
          '#059669',
          '#2563EB',
          '#D97706',
          '#DC2626',
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        cutout: '70%',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#FF6B35',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      },
    },
  }

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart: any) {
      const { width, height, ctx } = chart
      ctx.restore()
      
      const fontSize = (height / 114).toFixed(2)
      ctx.font = `bold ${fontSize}em sans-serif`
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#1F2937'
      
      const text = '94%'
      const textX = Math.round((width - ctx.measureText(text).width) / 2)
      const textY = height / 2 - 10
      
      ctx.fillText(text, textX, textY)
      
      ctx.font = `${fontSize * 0.6}em sans-serif`
      ctx.fillStyle = '#6B7280'
      const subText = 'Efficiency'
      const subTextX = Math.round((width - ctx.measureText(subText).width) / 2)
      const subTextY = height / 2 + 15
      
      ctx.fillText(subText, subTextX, subTextY)
      ctx.save()
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Team Efficiency</h3>
        <p className="text-sm text-gray-600">Work order completion status</p>
      </div>
      
      <div className="h-80 relative">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">48</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
      </div>
    </motion.div>
  )
}
