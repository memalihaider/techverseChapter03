import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Techverse 2026 Admin</h1>
            </div>
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}