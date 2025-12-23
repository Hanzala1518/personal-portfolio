import HeroSection from "@/components/home/HeroSection"
import SkillsMatrix from "@/components/home/SkillsMatrix"
import Certifications from "@/components/home/Certifications"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import StatsBar from "@/components/home/StatsBar"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <SkillsMatrix />
      <Certifications />
      <FeaturedProjects />
      <StatsBar />
    </div>
  )
}
