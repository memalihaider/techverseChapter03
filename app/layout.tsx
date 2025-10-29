import './globals.css'
import Navigation from '../components/Navigation'

export const metadata = {
  title: 'Techverse 2026',
  description: 'Pakistan\'s largest tech event management platform',
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
