'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Check, X, MessageCircle, Calendar, TestTube, Users, Eye, Clock, FileText, Loader2, Heart, DollarSign, Droplet } from 'lucide-react'
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Donation Campaign Admin</h1>
              <p className="text-gray-600">Manage updates, comments, and registrations for Panashe's campaign</p>
            </div>
            <Link
              href="/donate"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Public Page
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{updates.length}</div>
                <div className="text-gray-600">Updates Published</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{comments.filter(c => c.approved).length}</div>
                <div className="text-gray-600">Approved Comments</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TestTube className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{registrations.length}</div>
                <div className="text-gray-600">Blood Test Registrations</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{donors.length}</div>
                <div className="text-gray-600">Total Donors</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{comments.filter(c => !c.approved).length}</div>
                <div className="text-gray-600">Pending Approval</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('updates')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'updates'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Updates ({updates.length})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'comments'
                  ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Comments ({comments.length})
              {comments.filter(c => !c.approved).length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {comments.filter(c => !c.approved).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'registrations'
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TestTube className="w-5 h-5" />
              Blood Testing ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab('donors')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'donors'
                  ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="w-5 h-5" />
              Donors ({donors.length})
            </button>
          </div>

          <div className="p-6">
            {/* Updates Tab */}
            {activeTab === 'updates' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Campaign Updates</h2>
                  <button
                    onClick={() => setShowNewUpdateForm(!showNewUpdateForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    New Update
                  </button>
                </div>

                {/* New Update Form */}
                {showNewUpdateForm && (
                  <div className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Update</h3>
                    <form onSubmit={handleCreateUpdate} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={newUpdate.title}
                          onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Update title"
                          maxLength={100}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
                        <textarea
                          value={newUpdate.content}
                          onChange={(e) => setNewUpdate({...newUpdate, content: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                          placeholder="Update content"
                          maxLength={1000}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                        <input
                          type="text"
                          value={newUpdate.author}
                          onChange={(e) => setNewUpdate({...newUpdate, author: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Author name"
                          maxLength={50}
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={actionLoading === 'create-update'}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                        >
                          {actionLoading === 'create-update' && <Loader2 className="w-4 h-4 animate-spin" />}
                          Publish Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewUpdateForm(false)}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Updates List */}
                <div className="space-y-4">
                  {updates.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No updates published yet.</p>
                    </div>
                  ) : (
                    updates.map((update) => (
                      <div key={update.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{update.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(update.timestamp)}
                            </span>
                            <button
                              onClick={() => handleDeleteUpdate(update.id)}
                              disabled={actionLoading === `delete-update-${update.id}`}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {actionLoading === `delete-update-${update.id}` ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{update.content}</p>
                        <div className="text-sm text-blue-600 font-semibold">— {update.author}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Comment Moderation</h2>
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No comments yet.</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`border rounded-2xl p-6 ${
                          comment.approved
                            ? 'bg-green-50 border-green-200'
                            : 'bg-yellow-50 border-yellow-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <MessageCircle className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{comment.name}</h4>
                              <span className="text-sm text-gray-500">{formatDate(comment.timestamp)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                comment.approved
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {comment.approved ? 'Approved' : 'Pending'}
                            </span>
                            <div className="flex gap-1">
                              {!comment.approved && (
                                <button
                                  onClick={() => handleApproveComment(comment.id, true)}
                                  disabled={actionLoading === `comment-${comment.id}`}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                  {actionLoading === `comment-${comment.id}` ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                              {comment.approved && (
                                <button
                                  onClick={() => handleApproveComment(comment.id, false)}
                                  disabled={actionLoading === `comment-${comment.id}`}
                                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                  {actionLoading === `comment-${comment.id}` ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <X className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={actionLoading === `delete-comment-${comment.id}`}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {actionLoading === `delete-comment-${comment.id}` ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Registrations Tab */}
            {activeTab === 'registrations' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Blood Test Registrations</h2>
                <div className="space-y-6">
                  {registrations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <TestTube className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No blood test registrations yet.</p>
                    </div>
                  ) : (
                    registrations.map((registration) => (
                      <div key={registration.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{registration.name}</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-semibold text-gray-600">Phone:</span> {registration.phone}
                              </div>
                              {registration.email && (
                                <div>
                                  <span className="font-semibold text-gray-600">Email:</span> {registration.email}
                                </div>
                              )}
                              <div>
                                <span className="font-semibold text-gray-600">Age:</span> {registration.age}
                              </div>
                              <div>
                                <span className="font-semibold text-gray-600">Location:</span> {registration.location}
                              </div>
                              <div>
                                <span className="font-semibold text-gray-600">Previously Tested:</span>{' '}
                                {registration.previouslyTested ? 'Yes' : 'No'}
                              </div>
                              {registration.knownBloodType && (
                                <div>
                                  <span className="font-semibold text-gray-600">Known Blood Type:</span>{' '}
                                  {registration.knownBloodType}
                                </div>
                              )}
                            </div>
                            {registration.medicalConditions && (
                              <div className="mt-4">
                                <span className="font-semibold text-gray-600">Medical Conditions:</span>
                                <p className="text-gray-700 bg-gray-50 rounded-lg p-3 mt-1">
                                  {registration.medicalConditions}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm text-gray-500">{formatDate(registration.timestamp)}</span>
                            <select
                              value={registration.status}
                              onChange={(e) => handleUpdateRegistrationStatus(registration.id, e.target.value)}
                              disabled={actionLoading === `registration-${registration.id}`}
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="tested">Tested</option>
                              <option value="completed">Completed</option>
                            </select>
                            {actionLoading === `registration-${registration.id}` && (
                              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Donor Records</h2>
                  <button
                    onClick={() => setShowNewDonorForm(!showNewDonorForm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Donor
                  </button>
                </div>

                {/* New Donor Form */}
                {showNewDonorForm && (
                  <div className="bg-red-50 rounded-2xl p-6 mb-6 border border-red-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Donor Record</h3>
                    <form onSubmit={handleCreateDonor} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Donor Name *</label>
                          <input
                            type="text"
                            value={newDonor.name}
                            onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                            placeholder="Enter donor name or 'Anonymous'"
                            maxLength={100}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Donation Type *</label>
                          <select
                            value={newDonor.donationType}
                            onChange={(e) => setNewDonor({...newDonor, donationType: e.target.value as 'blood' | 'financial'})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                            required
                          >
                            <option value="blood">Blood Donation</option>
                            <option value="financial">Financial Donation</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            {newDonor.donationType === 'blood' ? 'Blood Amount *' : 'Amount *'}
                          </label>
                          <input
                            type="text"
                            value={newDonor.amount}
                            onChange={(e) => setNewDonor({...newDonor, amount: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                            placeholder={newDonor.donationType === 'blood' ? '1 pint' : 'K500'}
                            maxLength={50}
                            required
                          />
                        </div>
                        {newDonor.donationType === 'blood' && (
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Blood Type</label>
                            <select
                              value={newDonor.bloodType}
                              onChange={(e) => setNewDonor({...newDonor, bloodType: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
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

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                            placeholder={newDonor.donationType === 'blood' ? 'UTH Blood Bank' : 'Airtel Money'}
                            maxLength={100}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={actionLoading === 'create-donor'}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                        >
                          {actionLoading === 'create-donor' && <Loader2 className="w-4 h-4 animate-spin" />}
                          Add Donor Record
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewDonorForm(false)}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Donors List */}
                <div className="space-y-4">
                  {donors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No donor records yet.</p>
                    </div>
                  ) : (
                    donors.map((donor) => (
                      <div key={donor.id} className={`border rounded-2xl p-6 ${
                        donor.donationType === 'blood' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              donor.donationType === 'blood'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {donor.donationType === 'blood' ? <Droplet className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{donor.name}</h4>
                              <div className="text-sm text-gray-600">
                                {donor.donationType === 'blood' ? 'Blood Donation' : 'Financial Support'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{formatDate(donor.timestamp)}</span>
                            <button
                              onClick={() => handleDeleteDonor(donor.id)}
                              disabled={actionLoading === `delete-donor-${donor.id}`}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {actionLoading === `delete-donor-${donor.id}` ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                          <div>
                            <span className="font-semibold">Amount:</span> {donor.amount}
                          </div>
                          {donor.donationType === 'blood' && donor.bloodType && (
                            <div>
                              <span className="font-semibold">Blood Type:</span> {donor.bloodType}
                            </div>
                          )}
                          {donor.donationType === 'blood' && donor.location && (
                            <div>
                              <span className="font-semibold">Location:</span> {donor.location}
                            </div>
                          )}
                          {donor.donationType === 'financial' && donor.method && (
                            <div>
                              <span className="font-semibold">Method:</span> {donor.method}
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