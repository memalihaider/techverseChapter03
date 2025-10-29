'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Highlight {
  id: string
  title: string
  description: string | null
  media_type: 'image' | 'video' | 'youtube'
  media_url: string
  thumbnail_url: string | null
  event_year: number
  category: string | null
  is_featured: boolean
}

export default function HighlightsSection() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState<Highlight | null>(null)

  useEffect(() => {
    fetchHighlights()
  }, [])

  const fetchHighlights = async () => {
    try {
      const response = await fetch('/api/highlights')
      const data = await response.json()
      setHighlights(data.highlights || [])
    } catch (error) {
      console.error('Error fetching highlights:', error)
    } finally {
      setLoading(false)
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (highlights.length === 0) {
    return null
  }

  return (
    <>
      <section id="highlights" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Event <span className="text-blue-600">Highlights</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Relive the excitement and innovation from our previous editions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMedia(highlight)}
              >
                {highlight.is_featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    ⭐ Featured
                  </div>
                )}

                <div className="relative h-64 overflow-hidden">
                  {highlight.media_type === 'youtube' ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      {highlight.thumbnail_url ? (
                        <Image
                          src={highlight.thumbnail_url}
                          alt={highlight.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-red-600 to-red-800 w-full h-full flex items-center justify-center">
                          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : highlight.media_type === 'image' ? (
                    <Image
                      src={highlight.media_url}
                      alt={highlight.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <video
                      src={highlight.media_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {highlight.event_year && (
                      <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded">
                        {highlight.event_year}
                      </span>
                    )}
                    {highlight.category && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {highlight.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {highlight.title}
                  </h3>
                  {highlight.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {highlight.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold z-10"
            onClick={() => setSelectedMedia(null)}
          >
            ×
          </button>

          <div
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.media_type === 'youtube' ? (
              <div className="aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(selectedMedia.media_url) || ''}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : selectedMedia.media_type === 'image' ? (
              <div className="relative w-full" style={{ maxHeight: '85vh' }}>
                <Image
                  src={selectedMedia.media_url}
                  alt={selectedMedia.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  style={{ maxHeight: '85vh', objectFit: 'contain' }}
                />
              </div>
            ) : (
              <video
                src={selectedMedia.media_url}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '85vh' }}
              />
            )}

            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
              {selectedMedia.description && (
                <p className="text-gray-300">{selectedMedia.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
