import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileUp, Download, HelpCircle, Home, Menu, X, Github } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileUp className="w-6 h-6 text-emerald-500" />
            <span className="font-bold text-lg">toraje</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-zinc-400" />
            ) : (
              <Menu className="w-6 h-6 text-zinc-400" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isActive('/')}>
              <Home className="w-4 h-4" />
              <span>home</span>
            </NavLink>
            
            <NavLink to="/upload" active={isActive('/upload')}>
              <FileUp className="w-4 h-4" />
              <span>upload</span>
            </NavLink>
            
            <NavLink to="/retrieve" active={isActive('/retrieve')}>
              <Download className="w-4 h-4" />
              <span>retrieve</span>
            </NavLink>
            
            <NavLink to="/how-it-works" active={isActive('/how-it-works')}>
              <HelpCircle className="w-4 h-4" />
              <span>how it works</span>
            </NavLink>

            <a
              href="https://github.com/moroii69/toraje"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">github</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } border-t border-zinc-800`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" active={isActive('/')} onClick={toggleMenu}>
            <Home className="w-5 h-5" />
            <span>Home</span>
          </MobileNavLink>
          
          <MobileNavLink to="/upload" active={isActive('/upload')} onClick={toggleMenu}>
            <FileUp className="w-5 h-5" />
            <span>Upload</span>
          </MobileNavLink>
          
          <MobileNavLink to="/retrieve" active={isActive('/retrieve')} onClick={toggleMenu}>
            <Download className="w-5 h-5" />
            <span>Retrieve</span>
          </MobileNavLink>
          
          <MobileNavLink to="/how-it-works" active={isActive('/how-it-works')} onClick={toggleMenu}>
            <HelpCircle className="w-5 h-5" />
            <span>How It Works</span>
          </MobileNavLink>

          <a
            href="https://github.com/moroii69/toraje"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors w-full"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-zinc-800 text-emerald-500' 
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  active, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  active: boolean;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-zinc-800 text-emerald-500' 
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
  >
    {children}
  </Link>
);

export default Navbar;