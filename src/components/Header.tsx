'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'INICIO', href: '/' },
    { name: 'LA MANADA', href: '/la-manada' },
    { name: 'LO QUE HACEMOS', href: '/lo-que-hacemos' },
    { name: 'CON PROPÓSITO', href: '/con-proposito' },
    { name: 'TIENDA SOLIDARIA', href: '/tienda' },
    { name: 'CONTÁCTANOS', href: '/contacto' },
    { name: 'ADOPTA', href: '/adopta' },
    { name: 'PLAN PADRINO', href: '/dona' },
  ];

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <nav className="w-full px-6 lg:px-10">
        <div className="flex justify-center items-center h-16 gap-8 lg:gap-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-4">
              <img 
                src="/logoseparado1.png" 
                alt="Logo Fundación Pa&apos; Perros" 
                className="h-8 w-auto object-contain"
              />
              <img 
                src="/logoFinal.png" 
                alt="Logo Fundación Pa&apos; Perros" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Navigation menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-accent-blue text-primary border-b-2 border-accent-orange'
                      : 'text-secondary hover:bg-accent-blue hover:!text-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-accent-blue inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-secondary hover:bg-accent-orange focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-orange cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-primary border-t border-accent-orange overflow-y-auto z-40" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-accent-blue text-primary'
                      : 'text-secondary hover:bg-accent-blue hover:!text-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
