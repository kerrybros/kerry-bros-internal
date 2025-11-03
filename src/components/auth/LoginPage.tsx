'use client'

import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn()
  const router = useRouter()

  useEffect(() => {
    // Give Clerk time to load
    if (isLoaded && signIn) {
      console.log('SignIn loaded and ready')
    }
  }, [isLoaded, signIn])

  const handleMicrosoftLogin = async () => {
    console.log('Button clicked, signIn loaded:', isLoaded, 'signIn object:', signIn)
    
    if (!signIn) {
      console.error('SignIn not ready yet')
      return
    }
    
    try {
      console.log('Attempting to authenticate with Microsoft')
      // Trigger OAuth redirect for Microsoft
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_microsoft',
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard'
      })
    } catch (error) {
      console.error('Error signing in with Microsoft:', error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center pt-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blue circles */}
        <motion.div
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-truck-blue rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-truck-blue rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Medium circles */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-blue-400 rounded-full opacity-5 blur-2xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[200px] h-[200px] bg-blue-500 rounded-full opacity-8 blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Small floating dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-truck-blue rounded-full opacity-20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-truck-blue/20 rotate-45"
          animate={{
            rotate: [45, 405, 45],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-truck-blue/20 rotate-12"
          animate={{
            rotate: [12, 372, 12],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Logo */}
        <div className="text-center -mb-6">
          <motion.div
            className="inline-flex items-center justify-center -mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
            <div className="relative w-[500px] h-[500px]">
              <Image
                src="/logo.png"
                alt="Kerry Bros Logo"
                width={500}
                height={500}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white mb-1"
          >
            Kerry Bros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-50 text-lg"
          >
            Internal Portal
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 -mt-4"
        >


          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Sign in to access your dashboard
            </p>

            {/* Custom button that triggers Clerk OAuth */}
            <motion.button
              onClick={handleMicrosoftLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-truck-blue transition-all duration-200 rounded-lg py-3 px-4 flex items-center justify-center space-x-3 font-medium shadow-sm"
            >
              {/* Microsoft Logo */}
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <rect width="10" height="10" fill="#F25022"/>
                <rect x="11" width="10" height="10" fill="#7FBA00"/>
                <rect y="11" width="10" height="10" fill="#00A4EF"/>
                <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
              </svg>
              <span>Continue with Microsoft</span>
            </motion.button>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              ></motion.div>
              <span>Secure access for Kerry Bros employees only</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
