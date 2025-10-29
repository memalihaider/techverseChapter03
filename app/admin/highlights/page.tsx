'use client'

import { useEffect, useState } from 'react'

interface Highlight {
  id: string
  title: string
  description: string
  media_type: 'image' | 'video' | 'youtube'
  media_url: string
  thumbnail_url: string | null
  event_year: number | null
  category: string | null
  is_active: boolean
  is_featured: boolean
  created_at: string
}

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    media_type: 'image' | 'video' | 'youtube'
    media_url: string
    thumbnail_url: string
    event_year: number
    category: string
    is_active: boolean
    is_featured: boolean
  }>({
    title: '',
    description: '',
    media_type: 'image',
    media_url: '',
    thumbnail_url: '',
    event_year: new Date().getFullYear(),
    category: '',
    is_active: true,
    is_featured: false
  })

  useEffect(() => {
    fetchHighlights()
  }, [])

  const fetchHighlights = async () => {
    try {
      const response = await fetch('/api/admin/highlights')
      const data = await response.json()
      setHighlights(data.highlights || [])
    } catch (error) {
      console.error('Error fetching highlights:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingId 
        ? `/api/admin/highlights/${editingId}`
        : '/api/admin/highlights'
      
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert(editingId ? 'Highlight updated!' : 'Highlight added!')
        setShowForm(false)
        setEditingId(null)
        resetForm()
        fetchHighlights()
      } else {
        alert('Failed to save highlight')
      }
    } catch (error) {
      console.error('Error saving highlight:', error)
      alert('Error saving highlight')
    }
  }

  const handleEdit = (highlight: Highlight) => {
    setFormData({
      title: highlight.title,
      description: highlight.description,
      media_type: highlight.media_type,
      media_url: highlight.media_url,
      thumbnail_url: highlight.thumbnail_url || '',
      event_year: highlight.event_year || new Date().getFullYear(),
      category: highlight.category || '',
      is_active: highlight.is_active,
      is_featured: highlight.is_featured
    })
    setEditingId(highlight.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return

    try {
      const response = await fetch(`/api/admin/highlights/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Highlight deleted!')
        fetchHighlights()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error deleting')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      media_type: 'image',
      media_url: '',
      thumbnail_url: '',
      event_year: new Date().getFullYear(),
      category: '',
      is_active: true,
      is_featured: false
    })
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-800 mb-2">Event Highlights</h1>
          <p className="text-gray-600">Manage images and videos from previous events</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setEditingId(null)
            setShowForm(true)
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600"
        >
          + Add Highlight
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit Highlight' : 'Add Highlight'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Opening Ceremony 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media Type *</label>
                  <select
                    value={formData.media_type}
                    onChange={(e) => setFormData({ ...formData, media_type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Year</label>
                  <input
                    type="number"
                    value={formData.event_year}
                    onChange={(e) => setFormData({ ...formData, event_year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.media_type === 'youtube' ? 'YouTube Video ID *' : 'Media URL *'}
                </label>
                <input
                  type="text"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    formData.media_type === 'youtube' 
                      ? 'e.g., dQw4w9WgXcQ' 
                      : 'https://example.com/image.jpg'
                  }
                />
                {formData.media_type === 'youtube' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Enter only the video ID from YouTube URL (e.g., from youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)
                  </p>
                )}
              </div>

              {formData.media_type !== 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (optional)</label>
                  <input
                    type="text"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category (optional)</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Competition, Workshop, Awards"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Active (visible on website)</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">Featured</label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                >
                  {editingId ? 'Update' : 'Add'} Highlight
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    resetForm()
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">Loading highlights...</div>
        ) : highlights.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No highlights yet. Click "Add Highlight" to create one.
          </div>
        ) : (
          highlights.map((highlight) => (
            <div key={highlight.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                {highlight.media_type === 'image' && (
                  <img
                    src={highlight.media_url}
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Image+Not+Found'
                    }}
                  />
                )}
                {highlight.media_type === 'youtube' && (
                  <img
                    src={highlight.thumbnail_url || `https://img.youtube.com/vi/${highlight.media_url}/maxresdefault.jpg`}
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {highlight.media_type === 'video' && (
                  <video
                    src={highlight.media_url}
                    poster={highlight.thumbnail_url || undefined}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {highlight.is_featured && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">★ Featured</span>
                  )}
                  <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                    {highlight.media_type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{highlight.title}</h3>
                {highlight.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{highlight.description}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  {highlight.event_year && <span>{highlight.event_year}</span>}
                  {highlight.category && (
                    <>
                      <span>•</span>
                      <span>{highlight.category}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(highlight)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(highlight.id, highlight.title)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
