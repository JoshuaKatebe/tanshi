'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DonatePage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const contacts = [
    { name: 'Lungile Siwawa', phone: '+260768470581' },
    { name: 'Prosper Mbofana', phone: '+260974752547' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Emergency Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-red-600 text-white py-3 px-4 text-center font-semibold"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="animate-pulse">🚨</span>
          <span>URGENT: O-NEGATIVE BLOOD NEEDED</span>
          <span className="animate-pulse">🚨</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 blur-3xl opacity-20"
            />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent relative">
              Save a Life Today
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Your donation can make the difference between life and death
          </p>

          {/* Live Timer */}
          <div className="mt-6 inline-block bg-red-100 rounded-full px-6 py-3">
            <span className="text-red-700 font-mono text-lg">
              Time is critical: {formatTime(timeElapsed)}
            </span>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
        >
          {/* Blood Drop Animation */}
          <div className="relative h-48 bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white text-8xl"
            >
              💉
            </motion.div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-4 py-2 text-white">
              Type O- Needed
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Urgent Blood Donation Request for Panashe Muza
            </h2>

            <div className="prose prose-lg max-w-none text-gray-600 mb-8">
              <p className="mb-4">
                Our dear friend <span className="font-semibold text-red-600">Panashe Muza</span> was 
                recently in a serious accident and is currently in the hospital in need of 
                <span className="font-bold text-red-700"> O-negative blood</span>.
              </p>
              <p className="mb-4">
                This blood type is rare but vital, especially in emergencies. If you are O-negative, 
                please consider donating as soon as possible.
              </p>
              <p className="text-xl font-semibold text-red-600">
                Every donation can make a life-saving difference right now.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contacts.map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border border-red-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    📞 Contact Person {index + 1}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mb-2">{contact.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-700 font-mono">{contact.phone}</span>
                    <button
                      onClick={() => handleCopy(contact.phone, `phone-${index}`)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      {copied === `phone-${index}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reference Box */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Important Reference Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    When donating, please provide this reference:
                  </p>
                  <div className="bg-white rounded-lg px-4 py-3 font-mono text-lg text-red-600 font-bold inline-block">
                    Donation for Panashe Muza
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 mb-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                🎁 Thank You Reward
              </h3>
              <p className="text-xl mb-4">
                As a token of our deep appreciation, all donors will receive:
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur rounded-xl px-6 py-3"
                >
                  <span className="text-3xl font-bold">K20</span>
                  <p className="text-sm">Cash Reward</p>
                </motion.div>
                <span className="text-2xl">+</span>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur rounded-xl px-6 py-3"
                >
                  <span className="text-3xl">🥤</span>
                  <p className="text-sm">Free Drink</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Share Section */}
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Not O-Negative? You Can Still Help!
              </h3>
              <p className="text-gray-600 mb-6">
                Share this message to reach others who might be able to donate.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Urgent Blood Donation Needed',
                        text: 'Our friend Panashe Muza needs O-negative blood urgently. Please help if you can!',
                        url: window.location.href
                      })
                    }
                  }}
                >
                  📤 Share This Page
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/?text=${encodeURIComponent('Urgent: Our friend Panashe Muza needs O-negative blood. Please help! Contact: +260768470581 or +260974752547')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  💬 Share on WhatsApp
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <p className="text-xl text-gray-700 mb-4">
              Thank you from the bottom of our hearts for your
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Kindness, Compassion, and Support
            </p>
            <p className="text-gray-600 mt-4">
              during this difficult time
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="text-3xl animate-pulse delay-0">❤️</span>
              <span className="text-3xl animate-pulse delay-100">🙏</span>
              <span className="text-3xl animate-pulse delay-200">❤️</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              bottom: -50, 
              left: `${20 + i * 15}%`,
              opacity: 0 
            }}
            animate={{ 
              bottom: '100vh', 
              opacity: [0, 1, 1, 0],
              x: [0, 30, -30, 0]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </div>
  )
}