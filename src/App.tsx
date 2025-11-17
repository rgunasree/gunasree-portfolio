import FluidBackground from './components/FluidBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NeuralNetworkEasterEgg from './components/NeuralNetworkEasterEgg';

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <FluidBackground />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <NeuralNetworkEasterEgg />
    </div>
  );
}

export default App;
