import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import CountdownTimer from '@/components/CountdownTimer'
import ModulesSection from '@/components/ModulesSection'
import HighlightsSection from '@/components/HighlightsSection'
import SponsorsSection from '@/components/SponsorsSection'
import OrganizersSection from '@/components/OrganizersSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <CountdownTimer />
      <ModulesSection />
      <HighlightsSection />
      <SponsorsSection />
      <OrganizersSection />
      <Footer />
    </div>
  )
}
