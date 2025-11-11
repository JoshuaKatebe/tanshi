'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Check, X, MessageCircle, Calendar, TestTube, Users, Eye, Clock, FileText, Loader2, Heart, DollarSign, Droplet, TrendingUp, Activity } from 'lucide-react'
import Link from 'next/link'

interface Update {
  id: string
  title: string
  content: string
  author: string
  timestamp: string
}

interface Comment {
  id: string
  name: string
  message: string
  timestamp: string
  approved: boolean
}

interface Registration {
  id: string
  name: string
  email: string
  phone: string
  age: string
  location: string
  previouslyTested: boolean
  knownBloodType: string
  medicalConditions: string
  timestamp: string
  status: string
}

interface Donor {
  id: string
  name: string
  bloodType: string
  amount: string
  donationType: 'blood' | 'financial'
  timestamp: string
  location?: string
  method?: string
  status: string
}

export default function AdminDonatePage() {
  const [activeTab, setActiveTab] = useState<'updates' | 'comments' | 'registrations' | 'donors'>('updates')
  const [updates, setUpdates] = useState<Update[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // New update form
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    author: 'Support Team'
  })
  const [showNewUpdateForm, setShowNewUpdateForm] = useState(false)

  // New donor form
  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodType: '',
    amount: '',
    donationType: 'blood' as 'blood' | 'financial',
    location: '',
    method: ''
  })
  const [showNewDonorForm, setShowNewDonorForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [updatesRes, commentsRes, registrationsRes, donorsRes] = await Promise.all([
        fetch('/api/updates'),
        fetch('/api/admin/comments'),
        fetch('/api/bloodtest'),
        fetch('/api/donors')
      ])

      const [updatesData, commentsData, registrationsData, donorsData] = await Promise.all([
        updatesRes.json(),
        commentsRes.json(),
        registrationsRes.json(),
        donorsRes.json()
      ])

      setUpdates(updatesData)
      setComments(commentsData)
      setRegistrations(registrationsData)
      setDonors(donorsData)
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error loading data. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUpdate.title.trim() || !newUpdate.content.trim()) return

    setActionLoading('create-update')
    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUpdate)
      })

      if (response.ok) {
        setNewUpdate({ title: '', content: '', author: 'Support Team' })
        setShowNewUpdateForm(false)
        await fetchData()
      } else {
        alert('Failed to create update')
      }
    } catch (error) {
      alert('Failed to create update')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUpdate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this update?')) return

    setActionLoading(`delete-update-${id}`)
    try {
      const response = await fetch(`/api/updates?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to delete update')
      }
    } catch (error) {
      alert('Failed to delete update')
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveComment = async (id: string, approved: boolean) => {
    setActionLoading(`comment-${id}`)
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved })
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to update comment')
      }
    } catch (error) {
      alert('Failed to update comment')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    setActionLoading(`delete-comment-${id}`)
    try {
      const response = await fetch(`/api/admin/comments?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to delete comment')
      }
    } catch (error) {
      alert('Failed to delete comment')
    } finally {
      setActionLoading(null)
    }
  }

  const handleUpdateRegistrationStatus = async (id: string, status: string) => {
    setActionLoading(`registration-${id}`)
    try {
      const response = await fetch('/api/bloodtest', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to update registration status')
      }
    } catch (error) {
      alert('Failed to update registration status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleCreateDonor = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDonor.name.trim() || !newDonor.amount.trim() || !newDonor.donationType) return

    setActionLoading('create-donor')
    try {
      const response = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDonor)
      })

      if (response.ok) {
        setNewDonor({
          name: '',
          bloodType: '',
          amount: '',
          donationType: 'blood',
          location: '',
          method: ''
        })
        setShowNewDonorForm(false)
        await fetchData()
      } else {
        alert('Failed to add donor record')
      }
    } catch (error) {
      alert('Failed to add donor record')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteDonor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donor record?')) return

    setActionLoading(`delete-donor-${id}`)
    try {
      const response = await fetch(`/api/donors?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchData()
      } else {
        alert('Failed to delete donor record')
      }
    } catch (error) {
      alert('Failed to delete donor record')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-700 mt-6 text-lg font-medium">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campaign Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage Panashe's donation campaign</p>
            </div>
            <Link href="/donate" className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold">
              <Eye className="w-5 h-5" />
              View Public Page
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          <div className="group bg-white/90 backdrop-blur rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{updates.length}</div>
                <div className="text-gray-600 text-xs lg:text-sm font-medium">Updates</div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-blue-100">
              <div className="flex items-center justify-center lg:justify-start text-xs text-blue-600 font-semibold">
                <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">Active</span>
                <span className="sm:hidden">✓</span>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{comments.filter(c => c.approved).length}</div>
                <div className="text-gray-600 text-xs lg:text-sm font-medium">Approved</div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-green-100">
              <div className="flex items-center justify-center lg:justify-start text-xs text-green-600 font-semibold">
                <Check className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">Verified</span>
                <span className="sm:hidden">✓</span>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-purple-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TestTube className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{registrations.length}</div>
                <div className="text-gray-600 text-xs lg:text-sm font-medium">Tests</div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-purple-100">
              <div className="flex items-center justify-center lg:justify-start text-xs text-purple-600 font-semibold">
                <Activity className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">Pending</span>
                <span className="sm:hidden">···</span>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{donors.length}</div>
                <div className="text-gray-600 text-xs lg:text-sm font-medium">Donors</div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-red-100">
              <div className="flex items-center justify-center lg:justify-start text-xs text-red-600 font-semibold">
                <Heart className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">Total</span>
                <span className="sm:hidden">♥</span>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-orange-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:col-span-1 col-span-2">
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-black text-gray-900">{comments.filter(c => !c.approved).length}</div>
                <div className="text-gray-600 text-xs lg:text-sm font-medium">Pending</div>
              </div>
            </div>
            <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-orange-100">
              <div className="flex items-center justify-center lg:justify-start text-xs text-orange-600 font-semibold">
                <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">Review</span>
                <span className="sm:hidden">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <div className="flex border-b border-gray-200 bg-gray-50/50 min-w-max">
              <button
                onClick={() => setActiveTab('updates')}
                className={`flex-shrink-0 px-4 lg:px-6 py-5 font-bold transition-all flex items-center justify-center gap-2 relative whitespace-nowrap ${
                  activeTab === 'updates'
                    ? 'bg-white text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
              {activeTab === 'updates' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              )}
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Updates</span>
                <span className="sm:hidden">News</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-bold">{updates.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`flex-shrink-0 px-4 lg:px-6 py-5 font-bold transition-all flex items-center justify-center gap-2 relative whitespace-nowrap ${
                  activeTab === 'comments'
                    ? 'bg-white text-green-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
              {activeTab === 'comments' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              )}
                <MessageCircle className="w-5 h-5" />
                <span>Comments</span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold">{comments.length}</span>
                {comments.filter(c => !c.approved).length > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    {comments.filter(c => !c.approved).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('registrations')}
                className={`flex-shrink-0 px-4 lg:px-6 py-5 font-bold transition-all flex items-center justify-center gap-2 relative whitespace-nowrap ${
                  activeTab === 'registrations'
                    ? 'bg-white text-purple-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {activeTab === 'registrations' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                )}
                <TestTube className="w-5 h-5" />
                <span className="hidden sm:inline">Testing</span>
                <span className="sm:hidden">Tests</span>
                <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-1 rounded-full font-bold">{registrations.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('donors')}
                className={`flex-shrink-0 px-4 lg:px-6 py-5 font-bold transition-all flex items-center justify-center gap-2 relative whitespace-nowrap ${
                  activeTab === 'donors'
                    ? 'bg-white text-red-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {activeTab === 'donors' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
                )}
                <Heart className="w-5 h-5" />
                <span>Donors</span>
                <span className="bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-bold">{donors.length}</span>
              </button>
            </div>
          </div>
          </div>

          <div className="p-8">
            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-1">Campaign Updates</h2>
                    <p className="text-gray-600">Share progress and news with supporters</p>
                  </div>
                  <button
                    onClick={() => setShowNewUpdateForm(!showNewUpdateForm)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-bold"
                  >
                    <Plus className="w-5 h-5" />
                    New Update
                  </button>
                </div>

                {/* New Update Form */}
                {showNewUpdateForm && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 mb-8 border-2 border-blue-200 shadow-xl">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Create New Update</h3>
                    <form onSubmit={handleCreateUpdate} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Title</label>
                        <input
                          type="text"
                          value={newUpdate.title}
                          onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
                          placeholder="Enter update title"
                          maxLength={100}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Content</label>
                        <textarea
                          value={newUpdate.content}
                          onChange={(e) => setNewUpdate({...newUpdate, content: e.target.value})}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-40 resize-none text-gray-900"
                          placeholder="Share the latest news..."
                          maxLength={1000}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Author</label>
                        <input
                          type="text"
                          value={newUpdate.author}
                          onChange={(e) => setNewUpdate({...newUpdate, author: e.target.value})}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
                          placeholder="Author name"
                          maxLength={50}
                          required
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={actionLoading === 'create-update'}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
                        >
                          {actionLoading === 'create-update' && <Loader2 className="w-5 h-5 animate-spin" />}
                          Publish Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewUpdateForm(false)}
                          className="px-8 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-md border-2 border-gray-200 font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Updates List */}
                <div className="space-y-5">
                  {updates.length === 0 ? (
                    <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No updates published yet.</p>
                      <p className="text-gray-400 text-sm mt-2">Create your first update to keep supporters informed</p>
                    </div>
                  ) : (
                    updates.map((update) => (
                      <div key={update.id} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl font-black text-gray-900">{update.title}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                              <Clock className="w-4 h-4" />
                              {formatDate(update.timestamp)}
                            </span>
                            <button
                              onClick={() => handleDeleteUpdate(update.id)}
                              disabled={actionLoading === `delete-update-${update.id}`}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
                            >
                              {actionLoading === `delete-update-${update.id}` ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">{update.content}</p>
                        <div className="text-sm text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-full inline-block">
                          — {update.author}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-1">Comment Moderation</h2>
                  <p className="text-gray-600">Review and manage supporter comments</p>
                </div>
                <div className="space-y-5">
                  {comments.length === 0 ? (
                    <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No comments yet.</p>
                      <p className="text-gray-400 text-sm mt-2">Comments will appear here for moderation</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`rounded-3xl p-8 shadow-lg border-2 transition-all ${
                          comment.approved
                            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                            : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                              <MessageCircle className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-lg">{comment.name}</h4>
                              <span className="text-sm text-gray-600">{formatDate(comment.timestamp)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                                comment.approved
                                  ? 'bg-green-500 text-white'
                                  : 'bg-yellow-500 text-white'
                              }`}
                            >
                              {comment.approved ? '✓ Approved' : '⏱ Pending'}
                            </span>
                            <div className="flex gap-2">
                              {!comment.approved && (
                                <button
                                  onClick={() => handleApproveComment(comment.id, true)}
                                  disabled={actionLoading === `comment-${comment.id}`}
                                  className="p-3 text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all disabled:opacity-50 shadow-lg"
                                >
                                  {actionLoading === `comment-${comment.id}` ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                  ) : (
                                    <Check className="w-5 h-5" />
                                  )}
                                </button>
                              )}
                              {comment.approved && (
                                <button
                                  onClick={() => handleApproveComment(comment.id, false)}
                                  disabled={actionLoading === `comment-${comment.id}`}
                                  className="p-3 text-white bg-yellow-600 hover:bg-yellow-700 rounded-xl transition-all disabled:opacity-50 shadow-lg"
                                >
                                  {actionLoading === `comment-${comment.id}` ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                  ) : (
                                    <X className="w-5 h-5" />
                                  )}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={actionLoading === `delete-comment-${comment.id}`}
                                className="p-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-50 shadow-lg"
                              >
                                {actionLoading === `delete-comment-${comment.id}` ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-800 leading-relaxed text-lg">{comment.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Registrations Tab */}
            {activeTab === 'registrations' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-1">Blood Test Registrations</h2>
                  <p className="text-gray-600">Manage potential blood donor registrations</p>
                </div>
                <div className="space-y-6">
                  {registrations.length === 0 ? (
                    <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
                      <TestTube className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No blood test registrations yet.</p>
                      <p className="text-gray-400 text-sm mt-2">Registrations will appear here</p>
                    </div>
                  ) : (
                    registrations.map((registration) => (
                      <div key={registration.id} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-2xl font-black text-gray-900">{registration.name}</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-base">
                              <div className="bg-purple-50 rounded-xl p-4">
                                <span className="font-bold text-purple-700 block mb-1">Phone</span>
                                <span className="text-gray-900">{registration.phone}</span>
                              </div>
                              {registration.email && (
                                <div className="bg-purple-50 rounded-xl p-4">
                                  <span className="font-bold text-purple-700 block mb-1">Email</span>
                                  <span className="text-gray-900 break-all">{registration.email}</span>
                                </div>
                              )}
                              <div className="bg-purple-50 rounded-xl p-4">
                                <span className="font-bold text-purple-700 block mb-1">Age</span>
                                <span className="text-gray-900">{registration.age}</span>
                              </div>
                              <div className="bg-purple-50 rounded-xl p-4">
                                <span className="font-bold text-purple-700 block mb-1">Location</span>
                                <span className="text-gray-900">{registration.location}</span>
                              </div>
                              <div className="bg-purple-50 rounded-xl p-4">
                                <span className="font-bold text-purple-700 block mb-1">Previously Tested</span>
                                <span className="text-gray-900">{registration.previouslyTested ? 'Yes' : 'No'}</span>
                              </div>
                              {registration.knownBloodType && (
                                <div className="bg-purple-50 rounded-xl p-4">
                                  <span className="font-bold text-purple-700 block mb-1">Known Blood Type</span>
                                  <span className="text-gray-900 font-black text-xl">{registration.knownBloodType}</span>
                                </div>
                              )}
                            </div>
                            {registration.medicalConditions && (
                              <div className="mt-6">
                                <span className="font-bold text-purple-700 block mb-2">Medical Conditions</span>
                                <p className="text-gray-800 bg-purple-50 rounded-xl p-4 leading-relaxed">
                                  {registration.medicalConditions}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                              {formatDate(registration.timestamp)}
                            </span>
                            <select
                              value={registration.status}
                              onChange={(e) => handleUpdateRegistrationStatus(registration.id, e.target.value)}
                              disabled={actionLoading === `registration-${registration.id}`}
                              className="px-5 py-3 border-2 border-purple-300 rounded-xl text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 font-bold bg-white text-gray-900 shadow-md"
                            >
                              <option value="pending">🕐 Pending</option>
                              <option value="contacted">📞 Contacted</option>
                              <option value="scheduled">📅 Scheduled</option>
                              <option value="tested">🔬 Tested</option>
                              <option value="completed">✓ Completed</option>
                            </select>
                            {actionLoading === `registration-${registration.id}` && (
                              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Donors Tab */}
            {activeTab === 'donors' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-1">Donor Records</h2>
                    <p className="text-gray-600">Track blood and financial donations</p>
                  </div>
                  <button
                    onClick={() => setShowNewDonorForm(!showNewDonorForm)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-bold"
                  >
                    <Plus className="w-5 h-5" />
                    Add Donor
                  </button>
                </div>

                {/* New Donor Form */}
                {showNewDonorForm && (
                  <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-3xl p-8 mb-8 border-2 border-red-200 shadow-xl">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Add New Donor Record</h3>
                    <form onSubmit={handleCreateDonor} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">Donor Name *</label>
                          <input
                            type="text"
                            value={newDonor.name}
                            onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                            placeholder="Enter donor name or 'Anonymous'"
                            maxLength={100}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">Donation Type *</label>
                          <select
                            value={newDonor.donationType}
                            onChange={(e) => setNewDonor({...newDonor, donationType: e.target.value as 'blood' | 'financial'})}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                            required
                          >
                            <option value="blood">💉 Blood Donation</option>
                            <option value="financial">💰 Financial Donation</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            {newDonor.donationType === 'blood' ? 'Blood Amount *' : 'Amount *'}
                          </label>
                          <input
                            type="text"
                            value={newDonor.amount}
                            onChange={(e) => setNewDonor({...newDonor, amount: e.target.value})}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                            placeholder={newDonor.donationType === 'blood' ? '1 pint' : 'K500'}
                            maxLength={50}
                            required
                          />
                        </div>
                        {newDonor.donationType === 'blood' && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Blood Type</label>
                            <select
                              value={newDonor.bloodType}
                              onChange={(e) => setNewDonor({...newDonor, bloodType: e.target.value})}
                              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                            >
                              <option value="">Select blood type</option>
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

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">
                            {newDonor.donationType === 'blood' ? 'Hospital/Location' : 'Payment Method'}
                          </label>
                          <input
                            type="text"
                            value={newDonor.donationType === 'blood' ? newDonor.location : newDonor.method}
                            onChange={(e) => {
                              if (newDonor.donationType === 'blood') {
                                setNewDonor({...newDonor, location: e.target.value})
                              } else {
                                setNewDonor({...newDonor, method: e.target.value})
                              }
                            }}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-gray-900 font-medium"
                            placeholder={newDonor.donationType === 'blood' ? 'UTH Blood Bank' : 'Airtel Money'}
                            maxLength={100}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={actionLoading === 'create-donor'}
                          className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold"
                        >
                          {actionLoading === 'create-donor' && <Loader2 className="w-5 h-5 animate-spin" />}
                          Add Donor Record
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewDonorForm(false)}
                          className="px-8 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-md border-2 border-gray-200 font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Donors List */}
                <div className="space-y-5">
                  {donors.length === 0 ? (
                    <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No donor records yet.</p>
                      <p className="text-gray-400 text-sm mt-2">Add donor records to track contributions</p>
                    </div>
                  ) : (
                    donors.map((donor) => (
                      <div key={donor.id} className={`rounded-3xl p-8 shadow-xl border-2 transition-all hover:shadow-2xl ${
                        donor.donationType === 'blood' 
                          ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' 
                          : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      }`}>
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                              donor.donationType === 'blood'
                                ? 'bg-gradient-to-br from-red-500 to-red-600'
                                : 'bg-gradient-to-br from-green-500 to-green-600'
                            }`}>
                              {donor.donationType === 'blood' ? <Droplet className="w-8 h-8 text-white" /> : <DollarSign className="w-8 h-8 text-white" />}
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-2xl">{donor.name}</h4>
                              <div className={`text-sm font-bold mt-1 ${
                                donor.donationType === 'blood' ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {donor.donationType === 'blood' ? '💉 Blood Donation' : '💰 Financial Support'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full font-medium shadow-md">
                              {formatDate(donor.timestamp)}
                            </span>
                            <button
                              onClick={() => handleDeleteDonor(donor.id)}
                              disabled={actionLoading === `delete-donor-${donor.id}`}
                              className="p-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-50 shadow-lg"
                            >
                              {actionLoading === `delete-donor-${donor.id}` ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-white/70 rounded-xl p-4 shadow-md">
                            <span className="font-bold text-gray-700 block mb-1">Amount</span>
                            <span className="text-gray-900 text-lg font-black">{donor.amount}</span>
                          </div>
                          {donor.donationType === 'blood' && donor.bloodType && (
                            <div className="bg-white/70 rounded-xl p-4 shadow-md">
                              <span className="font-bold text-gray-700 block mb-1">Blood Type</span>
                              <span className="text-red-600 text-lg font-black">{donor.bloodType}</span>
                            </div>
                          )}
                          {donor.donationType === 'blood' && donor.location && (
                            <div className="bg-white/70 rounded-xl p-4 shadow-md">
                              <span className="font-bold text-gray-700 block mb-1">Location</span>
                              <span className="text-gray-900 font-semibold">{donor.location}</span>
                            </div>
                          )}
                          {donor.donationType === 'financial' && donor.method && (
                            <div className="bg-white/70 rounded-xl p-4 shadow-md">
                              <span className="font-bold text-gray-700 block mb-1">Method</span>
                              <span className="text-gray-900 font-semibold">{donor.method}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}