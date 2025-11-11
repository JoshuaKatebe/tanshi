'use client'

import { useState, useEffect } from 'react'
import { Heart, Phone, Copy, Check, Share2, Droplet, Clock, Users, Gift, Smartphone, CreditCard, MessageCircle, Send, Calendar, User } from 'lucide-react'
import Link from 'next/link'

export default function DonatePage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('airtel')
  const [updates, setUpdates] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState({ name: '', message: '' })
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Fetch updates
    fetch('/api/updates')
      .then(res => res.json())
      .then(data => setUpdates(data))
      .catch(err => console.error('Error fetching updates:', err))

    // Fetch comments
    fetch('/api/comments')
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Error fetching comments:', err))
  }, [])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.name.trim() || !newComment.message.trim() || submittingComment) return

    setSubmittingComment(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      })

      if (response.ok) {
        setNewComment({ name: '', message: '' })
        alert('Thank you! Your comment has been submitted for approval.')
      } else {
        alert('Failed to submit comment. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit comment. Please try again.')
    } finally {
      setSubmittingComment(false)
    }
  }

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

  const mobileMoneyOptions = [
    { 
      id: 'airtel', 
      name: 'Airtel Money', 
      number: '0973788762',
      color: 'from-red-500 to-red-600',
      logo: '📱'
    },
    { 
      id: 'mtn', 
      name: 'MTN Mobile Money', 
      number: '0768470581',
      color: 'from-yellow-400 to-yellow-500',
      logo: '💳'
    },
    { 
      id: 'zamtel', 
      name: 'Zamtel Kwacha', 
      number: '0954575969',
      color: 'from-green-500 to-green-600',
      logo: '💰'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Emergency Banner */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white py-4 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 animate-pulse">
              <Droplet className="w-6 h-6 fill-current" />
              <span className="font-bold text-lg">URGENT</span>
            </div>
            <span className="font-semibold text-lg">O-NEGATIVE BLOOD NEEDED IMMEDIATELY</span>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 blur-3xl opacity-30 animate-pulse"></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black relative">
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                Save a Life
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-3xl text-gray-800 font-medium max-w-3xl mx-auto mb-6">
            Your donation can make the difference between life and death
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 border-2 border-red-100">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-red-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-red-600">247</div>
                  <div className="text-sm text-gray-600">People Reached</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 border-2 border-red-100">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-600 fill-current" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-red-600">18</div>
                  <div className="text-sm text-gray-600">Donors So Far</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patient Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
              <div className="relative h-56 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative">
                  <div className="text-white text-9xl mb-4 animate-bounce">💉</div>
                </div>
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-2xl px-6 py-3 shadow-lg">
                  <div className="text-red-600 font-black text-2xl">O-</div>
                  <div className="text-gray-600 text-sm font-semibold">Type Needed</div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">
                  Urgent Request for Panashe Muza
                </h2>

                <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
                  <p>
                    Our dear friend <span className="font-bold text-red-600 text-xl">Panashe Muza</span> was 
                    recently in a serious accident and is currently in the hospital requiring 
                    <span className="font-black text-red-700"> O-negative blood</span> urgently.
                  </p>
                  <p>
                    This blood type is rare but vital, especially in emergencies. If you are O-negative, 
                    please consider donating as soon as possible.
                  </p>
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border-l-4 border-red-600">
                    <p className="text-xl font-bold text-red-700">
                      Every donation can save a life right now. Time is critical.
                    </p>
                  </div>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    Contact to Donate Blood
                  </h3>
                  {contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Contact Person {index + 1}</div>
                          <div className="text-xl font-bold text-gray-900 mb-2">{contact.name}</div>
                          <div className="text-lg text-gray-700 font-mono font-semibold">{contact.phone}</div>
                        </div>
                        <button
                          onClick={() => handleCopy(contact.phone, `phone-${index}`)}
                          className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          {copied === `phone-${index}` ? (
                            <>
                              <Check className="w-5 h-5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-5 h-5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reference Box */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">⚠️</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Important Reference
                      </h3>
                      <p className="text-gray-700 mb-3">
                        When donating, please provide this reference:
                      </p>
                      <div className="bg-white rounded-xl px-6 py-4 font-mono text-lg text-red-600 font-bold shadow-inner border-2 border-amber-200">
                        Donation for Panashe Muza
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Section */}
            <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-green-400">
              <div className="text-center mb-6">
                <div className="inline-block bg-white/20 backdrop-blur rounded-2xl px-6 py-3 mb-4">
                  <Gift className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-3xl font-black">Thank You Reward</h3>
                </div>
                <p className="text-xl text-green-50">
                  As a token of our deep appreciation, all blood donors receive:
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-10 py-8 text-center shadow-xl border border-white/30 transform hover:scale-105 transition-transform">
                  <div className="text-5xl font-black mb-2">K20</div>
                  <p className="text-green-50 font-semibold">Cash Reward</p>
                </div>
                <div className="text-4xl font-bold">+</div>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-10 py-8 text-center shadow-xl border border-white/30 transform hover:scale-105 transition-transform">
                  <div className="text-5xl mb-2">🥤</div>
                  <p className="text-green-50 font-semibold">Free Drink</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Financial Support */}
          <div className="space-y-8">
            {/* Mobile Money Donation Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 sticky top-8">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="w-8 h-8" />
                  <h3 className="text-2xl font-black">Support Financially</h3>
                </div>
                <p className="text-purple-100">Help cover medical expenses</p>
              </div>

              <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  {mobileMoneyOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveTab(option.id)}
                      className={`flex-1 py-3 px-2 rounded-lg font-semibold transition-all text-sm ${
                        activeTab === option.id
                          ? 'bg-white shadow-lg text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div>{option.logo}</div>
                      <div className="hidden sm:block">{option.name.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>

                {/* Active Tab Content */}
                {mobileMoneyOptions.map((option) => (
                  activeTab === option.id && (
                    <div key={option.id} className="space-y-6">
                      <div className={`bg-gradient-to-r ${option.color} rounded-2xl p-6 text-white shadow-lg`}>
                        <div className="text-5xl mb-3">{option.logo}</div>
                        <div className="text-xl font-bold mb-1">{option.name}</div>
                        <div className="text-sm text-white/80">Send your donation to:</div>
                        <div className="text-3xl font-black mt-2 font-mono">{option.number}</div>
                      </div>

                      <button
                        onClick={() => handleCopy(option.number, `money-${option.id}`)}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        {copied === `money-${option.id}` ? (
                          <>
                            <Check className="w-5 h-5" />
                            Number Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy Number
                          </>
                        )}
                      </button>

                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex gap-3">
                          <div className="text-2xl">💡</div>
                          <div className="text-sm text-gray-700">
                            <div className="font-bold mb-1">How to donate:</div>
                            <ol className="list-decimal list-inside space-y-1 text-xs">
                              <li>Dial your mobile money service</li>
                              <li>Select "Send Money"</li>
                              <li>Enter the number above</li>
                              <li>Enter your donation amount</li>
                              <li>Add reference: "Panashe Medical"</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Suggested amounts:</div>
                        <div className="flex gap-2 justify-center flex-wrap">
                          {['K50', 'K100', 'K200', 'K500'].map((amount) => (
                            <div key={amount} className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700">
                              {amount}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center mb-6">
                <Share2 className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-black mb-2">Spread the Word</h3>
                <p className="text-blue-100">
                  Not O-Negative? Share to reach potential donors!
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Urgent Blood Donation Needed',
                        text: 'Our friend Panashe Muza needs O-negative blood urgently. Please help if you can!',
                        url: window.location.href
                      })
                    }
                  }}
                  className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share This Page
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent('🚨 Urgent: Our friend Panashe Muza needs O-negative blood. Contact: +260768470581 or +260974752547. Financial support: Airtel 0977123456')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg text-center"
                >
                  💬 Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-black text-gray-900">Latest Updates</h2>
            </div>
            
            {updates.length > 0 ? (
              <div className="space-y-6">
                {updates.slice(0, 5).map((update) => (
                  <div key={update.id} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-2xl">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{update.title}</h3>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(update.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{update.content}</p>
                    <div className="mt-3 text-sm text-blue-600 font-semibold">— {update.author}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">📰</div>
                <p className="text-gray-500">No updates yet. Check back soon for the latest news.</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Comments Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-8 h-8" />
                <h2 className="text-3xl font-black">Messages of Support</h2>
              </div>
              <p className="text-purple-100">Share your prayers and encouragement</p>
            </div>

            <div className="p-8">
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    maxLength={50}
                    required
                  />
                </div>
                <textarea
                  placeholder="Share your message of support, prayers, or encouragement..."
                  value={newComment.message}
                  onChange={(e) => setNewComment({...newComment, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                  maxLength={500}
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">Comments are moderated and will appear after approval.</p>
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      submittingComment 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {submittingComment ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-gray-900">{comment.name}</h4>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">
                              {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-6xl mb-4">💬</div>
                    <p className="text-gray-500 mb-4">Be the first to share a message of support!</p>
                    <p className="text-sm text-gray-400">Your encouraging words can mean the world to Panashe and his family.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blood Testing CTA */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🩸</div>
              <h2 className="text-3xl font-black mb-4">Don't Know Your Blood Type?</h2>
              <p className="text-xl text-orange-100 mb-6">Sign up for blood testing to help future emergencies and discover if you can help save lives.</p>
              <Link 
                href="/bloodtest-signup"
                className="inline-block px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
              >
                🔬 Register for Blood Testing
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <div className="inline-block bg-white rounded-3xl shadow-2xl p-10 border border-red-100">
            <div className="flex justify-center gap-3 mb-6">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="w-8 h-8 text-red-500 fill-current animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
            <p className="text-xl text-gray-700 mb-4">
              Thank you from the bottom of our hearts for your
            </p>
            <p className="text-4xl font-black bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Kindness & Support
            </p>
            <p className="text-gray-600 text-lg">
              during this difficult time
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          >
            <Heart className={`w-${4 + (i % 3) * 2} h-${4 + (i % 3) * 2} text-red-300 fill-current opacity-20`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}