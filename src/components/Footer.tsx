'use client';

import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/fundacionpaperros', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'TikTok', 
      url: 'https://tiktok.com/@fundacionpaperros', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/fundacionpaperros', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@fundacionpaperros', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-secondary text-primary border-t-4 border-orange-500 relative">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-blue-400 to-green-400"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo.png" 
                alt="Fundación Pa' Perros" 
                width={120}
                height={48}
                className="h-12 w-auto rounded-lg mr-4"
              />
              <h3 className="text-2xl font-bold text-primary">Fundación Pa&apos; Perros</h3>
            </div>
            <p className="text-primary/80 mb-6 max-w-md leading-relaxed">
              Organización sin ánimo de lucro que trabaja por el respeto y la protección de la vida de los animales. 
              Promovemos la adopción responsable y generamos conciencia sobre el bienestar animal en Colombia.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent-orange/20 transition-colors duration-200 text-primary hover:text-accent-orange"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Inicio</Link></li>
              <li><Link href="/la-manada/nuestra-historia" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Nuestra Historia</Link></li>
              <li><Link href="/adopta" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Adopta</Link></li>
              <li><Link href="/dona" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Dona</Link></li>
              <li><Link href="/contacto/escribenos" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Contáctanos</Link></li>
              <li><Link href="/politica-tratamiento-datos" className="text-primary/80 hover:text-accent-orange transition-colors duration-200 block">Política de Tratamiento de Datos</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-primary">Contacto</h4>
            <div className="space-y-3 text-primary/80">
              <div className="flex items-start space-x-3">
                <span className="text-accent-orange mt-1">📧</span>
                <div>
                  <p className="font-medium text-primary">Email</p>
                  <p className="text-sm text-primary/70">contacto@fundacionpaperros.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent-orange mt-1">📞</span>
                <div>
                  <p className="font-medium text-primary">Teléfono</p>
                  <p className="text-sm text-primary/70">+57 (1) 234-5678</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent-orange mt-1">📍</span>
                <div>
                  <p className="font-medium text-primary">Ubicación</p>
                  <p className="text-sm text-primary/70">Manizales, Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary/60 text-sm">
              &copy; {currentYear} Fundación Pa&apos; Perros. Todos los derechos reservados.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/politica-tratamiento-datos" className="text-primary/60 hover:text-accent-orange text-sm transition-colors duration-200">
                Política de Tratamiento de Datos
              </Link>
              <p className="text-primary/60 text-sm">
                Organización sin ánimo de lucro
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
