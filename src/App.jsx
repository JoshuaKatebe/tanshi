import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import OurProjects from './pages/OurProjects';

function App() {
  return (
    <Router>
      <div>
        {/* Add navigation here if needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/our-projects" element={<OurProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
