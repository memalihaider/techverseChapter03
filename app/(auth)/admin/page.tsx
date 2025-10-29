'use client'
import { useState, useEffect } from 'react'

interface DashboardStats {
  totalRegistrations: number
  pendingRegistrations: number
  approvedRegistrations: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    totalRevenue: 0
  })
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Fetch dashboard stats from API
    // This is a placeholder - implement actual API call
    setStats({
      totalRegistrations: 245,
      pendingRegistrations: 67,
      approvedRegistrations: 178,
      totalRevenue: 125000
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to Techverse 2026 Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Registrations</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalRegistrations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">⏳</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.pendingRegistrations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✅</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.approvedRegistrations}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">💰</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">₨{stats.totalRevenue.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', count: null },
              { id: 'registrations', name: 'Registrations', count: stats.totalRegistrations },
              { id: 'modules', name: 'Modules', count: 7 },
              { id: 'sponsors', name: 'Sponsors', count: null },
              { id: 'team', name: 'Team', count: null },
              { id: 'content', name: 'Content', count: null },
              { id: 'certificates', name: 'Certificates', count: stats.approvedRegistrations }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-1`}
              >
                <span>{tab.name}</span>
                {tab.count !== null && (
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <div className="text-sm font-medium text-gray-900">Review Pending Registrations</div>
                  <div className="text-sm text-gray-500">{stats.pendingRegistrations} pending review</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <div className="text-sm font-medium text-gray-900">Generate Certificates</div>
                  <div className="text-sm text-gray-500">For approved participants</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <div className="text-sm font-medium text-gray-900">Export Data</div>
                  <div className="text-sm text-gray-500">Download registration data</div>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'registrations' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Management</h3>
              <p className="text-gray-600">Registration management interface will be implemented here.</p>
            </div>
          )}
          
          {activeTab === 'modules' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Module Management</h3>
              <p className="text-gray-600">Module management interface will be implemented here.</p>
            </div>
          )}
          
          {activeTab === 'sponsors' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sponsor Management</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Manage event sponsors and partnerships</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add New Sponsor
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Sponsor Management Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add, edit, and remove sponsors</li>
                    <li>• Manage sponsor tiers (Platinum, Gold, Silver)</li>
                    <li>• Upload sponsor logos and details</li>
                    <li>• Control sponsor visibility on homepage</li>
                  </ul>
                </div>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Loading sponsors...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Team Management</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Manage team members and organizational structure</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add Team Member
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Team Management Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add, edit, and remove team members</li>
                    <li>• Manage hierarchy levels (Organizers, Directors, Co-Directors, Supervisors, Leads, Team Members)</li>
                    <li>• Organize by departments (IT, Logistics, External Affairs, Creative, Management, Registration, Others)</li>
                    <li>• Control visibility on homepage vs full team page</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Hierarchy Levels</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Organizers</span>
                        <span className="text-purple-600">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Directors</span>
                        <span className="text-blue-600">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Co-Directors</span>
                        <span className="text-green-600">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Supervisors</span>
                        <span className="text-yellow-600">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leads</span>
                        <span className="text-red-600">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Team Members</span>
                        <span className="text-gray-600">3</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Departments</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Management</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IT</span>
                        <span>4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Logistics</span>
                        <span>3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Creative</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>External Affairs</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration</span>
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Quick Actions</h5>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded">
                        Export Team List
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded">
                        Bulk Import
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded">
                        Reorder Hierarchy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Management</h3>
              <p className="text-gray-600">Content management interface will be implemented here.</p>
            </div>
          )}
          
          {activeTab === 'certificates' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Certificate Management</h3>
              <p className="text-gray-600">Certificate management interface will be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}