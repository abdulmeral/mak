'use client';

import { useState } from 'react';
import { Menu, X, Users, BookOpen, Mail, Settings, BarChart3 } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Öğrenciler', icon: Users },
    { id: 'programs', label: 'Programlar', icon: BookOpen },
    { id: 'messages', label: 'Mesajlar', icon: Mail },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Makinetalya Logo" 
              width={320} 
              height={80}
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-400">
            <span>+90 541 110 10 09</span>
            <span>trainer@platform.com</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 