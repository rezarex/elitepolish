import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
