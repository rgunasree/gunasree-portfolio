import { lazy, Suspense } from 'react';
import FluidBackground from './components/FluidBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import NeuralNetworkEasterEgg from './components/NeuralNetworkEasterEgg';
import ScrollProgress from './components/ScrollProgress';
import KudosButton from './components/KudosButton';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <ScrollProgress />
      <KudosButton />
      <FluidBackground />
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Chatbot />
      </Suspense>
      <NeuralNetworkEasterEgg />
    </div>
  );
}

export default App;
