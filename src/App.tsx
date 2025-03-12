import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Retrieve from './pages/Retrieve';
import HowItWorks from './pages/HowItWorks';
import ContactSupport from './pages/ContactSupport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/retrieve" element={<Retrieve />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact-support" element={<ContactSupport />} />
          </Routes>
        </main>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333'
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;