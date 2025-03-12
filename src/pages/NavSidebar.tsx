import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

const NavSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Navigation links that match your sections
  const navLinks = [
    { id: 'summary', label: 'Summary', href: '#summary' },
    { id: 'file-upload', label: '1. File Upload', href: '#file-upload' },
    { id: 'encryption', label: '2. Encryption', href: '#encryption' },
    { id: 'security', label: '3. Security Measures', href: '#security' },
    { id: 'retrieval', label: '4. File Retrieval', href: '#retrieval' },
    { id: 'cleanup', label: '5. Post-Download Cleanup', href: '#cleanup' }
  ];

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function for anchor links
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Close sidebar on mobile after clicking a link
      setIsOpen(false);

      const headerOffset = 80; // Adjust based on any fixed headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top function with smoother animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg md:hidden"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Scroll to top button - visible when scrolled down */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      {/* Sidebar navigation with improved transition */}
      <aside className={`fixed top-0 right-0 z-40 h-full transform transition-all duration-300 ease-in-out bg-black border-l border-gray-700 shadow-xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      } md:w-64 w-3/4`}>
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Navigation</h2>

          <nav className="space-y-2">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                  activeSection === link.id
                    ? 'bg-emerald-900 text-emerald-400 font-medium'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default NavSidebar;