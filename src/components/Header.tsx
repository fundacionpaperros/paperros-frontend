'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { 
      name: 'INICIO', 
      href: '/' 
    },
    { 
      name: 'LA MANADA', 
      href: '#',
      submenu: [
        { name: '- Nuestra historia', href: '/la-manada/nuestra-historia' },
        { name: '- Equipo humano y peludo', href: '/la-manada/equipo' },
        { name: '- Aliados y patrocinadores', href: '/la-manada/aliados' },
        { name: '- Transparencia y rendición de cuentas', href: '/la-manada/transparencia' },
      ]
    },
    { 
      name: 'LO QUE HACEMOS', 
      href: '#',
      submenu: [
        { name: '- Educación y cultura de pelos', href: '/lo-que-hacemos/educacion' },
        { name: '- Por segundas oportunidades', href: '/lo-que-hacemos/segundas-oportunidades' },
        { name: '- Adopciones responsables', href: '/lo-que-hacemos/adopciones' },
        { name: '- Programas de esterilización', href: '/lo-que-hacemos/esterilizacion' },
      ]
    },
    { 
      name: 'CON PROPÓSITO', 
      href: '#',
      submenu: [
        { name: '- Paseos felices', href: '/con-proposito/paseos' },
        { name: '- Mimos en casa', href: '/con-proposito/mimos' },
        { name: '- Charlas educativas y talleres', href: '/con-proposito/charlas' },
      ]
    },
    { 
      name: 'TIENDA SOLIDARIA', 
      href: '#',
      submenu: [
        { name: '- Productos con causa', href: '/tienda/productos' },
        { name: '- Regalos para peludos', href: '/tienda/regalos' },
        { name: '- Adopción simbólica', href: '/tienda/adopcion-simbolica' },
        { name: '- Donaciones y apadrinamientos', href: '/tienda/donaciones' },
      ]
    },
    { 
      name: 'CONTÁCTANOS', 
      href: '#',
      submenu: [
        { name: '- Escríbenos', href: '/contacto/escribenos' },
        { name: '- Quiero ser voluntario', href: '/contacto/voluntario' },
        { name: '- Encuéntranos', href: '/contacto/redes' },
      ]
    },
    { 
      name: 'ADOPTA', 
      href: '/adopta' 
    },
    { 
      name: 'DONA', 
      href: '/dona' 
    },
  ];

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
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
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-accent-blue text-primary border-b-2 border-accent-orange'
                        : 'text-secondary hover:bg-accent-blue hover:!text-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Submenu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-primary hover:bg-accent-blue hover:text-white transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
                <div key={item.name}>
                  <Link
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
                  {item.submenu && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-1 text-sm text-white hover:bg-accent-blue hover:!text-gray-800 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
