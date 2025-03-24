
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { MessageSquare, BarChart3, Upload, Home, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const navItems = [
    { to: '/', label: 'Social Feed', icon: <Home className="w-4 h-4 mr-2" /> },
    { to: '/chats', label: 'Chats & Responses', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { to: '/actions', label: 'Action & Funding', icon: <BarChart3 className="w-4 h-4 mr-2" /> },
    { to: '/upload', label: 'Upload Action Hub', icon: <Upload className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-medium text-sm">SC</span>
          </div>
          <span className="font-display font-medium text-lg">Social Cause</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-1 mr-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  cn("nav-link", isActive && "nav-link-active")
                }
                end
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {currentUser && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm">{currentUser.displayName?.charAt(0) || "U"}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden lg:inline">{currentUser.displayName || currentUser.email}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden absolute w-full bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-spring overflow-hidden",
        isMobileMenuOpen ? "max-h-80 opacity-100 border-b" : "max-h-0 opacity-0"
      )}>
        <nav className="container-custom py-4 flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )
              }
              onClick={() => setIsMobileMenuOpen(false)}
              end
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
          
          {currentUser && (
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
