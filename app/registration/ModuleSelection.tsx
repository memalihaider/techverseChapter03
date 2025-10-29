'use client'
import { useState, useEffect } from 'react'
import { RegistrationData, Module } from './page'

interface ModuleSelectionProps {
  data: RegistrationData
  updateData: (data: Partial<RegistrationData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function ModuleSelection({ data, updateData, onNext, onPrev }: ModuleSelectionProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredModules, setFilteredModules] = useState<Module[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/modules')
      const result = await response.json()
      
      if (result.modules) {
        const modulesData = result.modules.map((m: any) => ({
          id: m.module_id,
          name: m.name,
          category: m.category,
          entryFee: m.entry_fee,
          minTeamSize: m.min_team_size,
          maxTeamSize: m.max_team_size,
          description: m.description || ''
        }))
        
        setModules(modulesData)
        setFilteredModules(modulesData)
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(modulesData.map((m: Module) => m.category))) as string[]
        setCategories(['All', ...uniqueCategories])
      }
    } catch (error) {
      console.error('Error fetching modules:', error)
      setError('Failed to load modules. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredModules(modules)
    } else {
      setFilteredModules(modules.filter(module => module.category === selectedCategory))
    }
  }, [selectedCategory, modules])

  const handleModuleSelect = (module: Module) => {
    updateData({ selectedModule: module })
    setError('')
  }

  const handleNext = () => {
    if (!data.selectedModule) {
      setError('Please select a competition module')
      return
    }
    onNext()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Module Selection</h2>
          <p className="text-sm text-gray-600">Loading available modules...</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Module Selection</h2>
        <p className="text-sm text-gray-600">
          Choose the competition module your team wants to participate in. Each module has different team size requirements and entry fees.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            onClick={() => handleModuleSelect(module)}
            className={`relative rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${
              data.selectedModule?.id === module.id
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            {/* Selected Indicator */}
            {data.selectedModule?.id === module.id && (
              <div className="absolute top-2 right-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            <div className="mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                module.category === 'Gaming' ? 'bg-purple-100 text-purple-800' :
                module.category === 'Programming' ? 'bg-blue-100 text-blue-800' :
                module.category === 'Security' ? 'bg-red-100 text-red-800' :
                module.category === 'Robotics' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {module.category}
              </span>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">{module.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Team Size:</span>
                <span className="font-medium">
                  {module.minTeamSize === module.maxTeamSize 
                    ? `${module.minTeamSize} ${module.minTeamSize === 1 ? 'person' : 'people'}`
                    : `${module.minTeamSize}-${module.maxTeamSize} people`
                  }
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Entry Fee:</span>
                <span className="font-medium text-indigo-600">
                  {module.entryFee === 0 ? 'Free' : `₨${module.entryFee.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next: Add Team Members
        </button>
      </div>
    </div>
  )
}