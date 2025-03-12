import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileUp, Download, HelpCircle, Home, Menu, X, LucideFileUp } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-black border-b border-gray-800 py-5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <LucideFileUp className="w-5 h-5 text-emerald-400" />
            <span className="font-mono text-base">Toraje</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isActive('/')}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/upload" active={isActive('/upload')}>
              <FileUp className="w-4 h-4" />
              <span>Upload</span>
            </NavLink>

            <NavLink to="/retrieve" active={isActive('/retrieve')}>
              <Download className="w-4 h-4" />
              <span>Retrieve</span>
            </NavLink>

            <NavLink to="/how-it-works" active={isActive('/how-it-works')}>
              <HelpCircle className="w-4 h-4" />
              <span>How it works</span>
            </NavLink>

          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 mt-5">
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink to="/" active={isActive('/')} onClick={toggleMenu}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </MobileNavLink>

            <MobileNavLink to="/upload" active={isActive('/upload')} onClick={toggleMenu}>
              <FileUp className="w-4 h-4" />
              <span>Upload</span>
            </MobileNavLink>

            <MobileNavLink to="/retrieve" active={isActive('/retrieve')} onClick={toggleMenu}>
              <Download className="w-4 h-4" />
              <span>Retrieve</span>
            </MobileNavLink>

            <MobileNavLink to="/how-it-works" active={isActive('/how-it-works')} onClick={toggleMenu}>
              <HelpCircle className="w-4 h-4" />
              <span>How it works</span>
            </MobileNavLink>

          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active: boolean;
}

const NavLink = ({ to, children, active }: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors
      ${active
        ? 'bg-gray-800 text-emerald-400'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active, onClick }: { to: string; children: React.ReactNode; active: boolean; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded transition-colors
      ${active
        ? 'bg-gray-800 text-emerald-400'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
  >
    {children}
  </Link>
);

export default Navbar;