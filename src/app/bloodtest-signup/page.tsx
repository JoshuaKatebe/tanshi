'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TestTube, Heart, MapPin, Phone, Mail, User, Calendar, FileText, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BloodTestSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    location: '',
    previouslyTested: false,
    knownBloodType: '',
    medicalConditions: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/bloodtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to submit registration. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit registration. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Registration Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for signing up for blood testing. We'll contact you soon with testing location and scheduling details.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-blue-900 mb-3">What happens next:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>We'll review your registration</li>
              <li>Contact you within 24-48 hours</li>
              <li>Schedule your blood test appointment</li>
              <li>Provide test results and blood type information</li>
              <li>Add you to our emergency donor database</li>
            </ol>
          </div>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/donate"
              className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
            >
              Back to Donation Page
            </Link>
            <Link 
              href="/"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/donate" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Donate Page
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-black">Blood Test Registration</h1>
              <p className="text-blue-200">Help save lives in future emergencies</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <TestTube className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Become a Potential Life Saver
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Don't know your blood type? Sign up for testing and join our emergency donor database to help in future medical crises.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-red-100"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Save Lives</h3>
            <p className="text-gray-600">Be ready to help in emergency situations like Panashe's when every minute counts.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <TestTube className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Only K50</h3>
            <p className="text-gray-600">Get your blood type tested at a discounted K50 we negotiated for and receive your results promptly.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Local Network</h3>
            <p className="text-gray-600">Join a community of potential donors in your area ready to respond to emergencies.</p>
          </motion.div>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Registration Form</h2>
            <p className="text-gray-600">Fill out the form below to get started with blood testing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+260 xxx xxx xxx"
                  maxLength={20}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Age (18-65)"
                  min="18"
                  max="65"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location/Area *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, District, or Area (e.g., Lusaka, Ndola)"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            {/* Blood Type Information */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Blood Type Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="previouslyTested"
                    id="previouslyTested"
                    checked={formData.previouslyTested}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="previouslyTested" className="text-gray-700 font-medium">
                    I have been tested before and know my blood type
                  </label>
                </div>

                {formData.previouslyTested && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Known Blood Type
                    </label>
                    <select
                      name="knownBloodType"
                      value={formData.knownBloodType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Medical Conditions or Medications
              </label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                placeholder="Please list any medical conditions, medications, or other health information that might be relevant to blood donation (or write 'None')"
                maxLength={500}
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h4 className="font-bold text-blue-900 mb-2">Important Information:</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Blood testing will be conducted by qualified medical professionals</li>
                <li>Results will be kept confidential and only shared with you</li>
                <li>There is no obligation to donate blood after testing</li>
                <li>You can withdraw from the donor database at any time</li>
                <li>Testing is free of charge</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl ${
                  submitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {submitting ? 'Submitting Registration...' : '🩸 Register for Blood Testing'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-black mb-4">Help Panashe Now</h3>
            <p className="text-xl text-red-100 mb-6">
              While you're registering for future testing, don't forget about today's emergency!
            </p>
            <Link
              href="/donate"
              className="inline-block px-8 py-4 bg-white text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl"
            >
              💉 Back to Emergency Donation Page
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}