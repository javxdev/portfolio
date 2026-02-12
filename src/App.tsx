import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Components
import { Cursor } from './components/Cursor/Cursor';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';

// Hooks
import { useLenis } from './hooks/useLenis';

// Sections
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Skills } from './sections/Skills/Skills';
import { Projects } from './sections/Projects/Projects';
import { Contact } from './sections/Contact/Contact';

// Styles
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const { scrollTo } = useLenis();
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);  

  return (
    <>
    <Analytics />
      <Cursor />
      <Navigation 
        scrollTo={scrollTo} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;