import { lazy, Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';

const FluidBackground = lazy(() => import('./components/FluidBackground'));
const NeuralNetworkEasterEgg = lazy(() => import('./components/NeuralNetworkEasterEgg'));

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <SpeedInsights />
      <ScrollProgress />
      <Suspense fallback={null}>
        <FluidBackground />
      </Suspense>
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Chatbot />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralNetworkEasterEgg />
      </Suspense>
    </div>
  );
}

export default App;
