import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { FloatingHelper } from "@/components/FloatingHelper";
import { InfiniteGridHero } from "@/components/InfiniteGridHero";

export default function HomePage() {
  return (
    <>
      <InfiniteGridHero>
        <Nav />
        <main>
          <Hero />
          <SocialProof />
        </main>
      </InfiniteGridHero>
      <Features />
      <HowItWorks />
      <Footer />
      <FloatingHelper />
    </>
  );
}
