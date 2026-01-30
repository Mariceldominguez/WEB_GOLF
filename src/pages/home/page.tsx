import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Catalog from './components/Catalog';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="benefits">
        <Benefits />
      </section>

      <section id="catalog">
        <Catalog />
      </section>

      <section id="nosotros">
        <About />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="contacto">
        <Contact />
      </section>



      <Footer />
      <WhatsAppButton />
    </div>
  );
};


export default HomePage;