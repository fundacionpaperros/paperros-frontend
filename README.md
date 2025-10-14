# Fundación Pa' Perros - Frontend

Este es el frontend de la Fundación Pa' Perros, una organización sin ánimo de lucro que promueve la adopción responsable en Colombia. Aplicación Next.js desarrollada con TypeScript y App Router.

## 🚀 Características

- **Next.js 15** con App Router
- **TypeScript** para tipado estático
- **React Hook Form** para formularios con validación
- **Axios** para peticiones HTTP
- **Componentes reutilizables** (Header, Footer)
- **Datos mock** para desarrollo
- **Responsive design** (preparado para estilos)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── about/             # Página "Sobre Nosotros"
│   ├── adoptions/         # Página de adopciones
│   ├── contact/           # Página de contacto
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Landing page
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Navegación principal
│   └── Footer.tsx         # Pie de página
└── lib/
    └── api.ts             # Cliente Axios configurado
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Node.js** 18.17 o superior
- **npm** (incluido con Node.js)

### Pasos para Windows

1. **Clona o descarga el proyecto**
   ```bash
   # Si tienes git instalado
   git clone <url-del-repositorio>
   cd paperros-frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   - El archivo `.env.local` ya está creado con valores de ejemplo
   - Modifica `NEXT_PUBLIC_API_BASE_URL` según tu backend

4. **Ejecuta el proyecto en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   - Ve a `http://localhost:3000`
   - La aplicación se recargará automáticamente cuando hagas cambios

## 📋 Scripts Disponibles

```bash
# Desarrollo con Turbopack (más rápido)
npm run dev

# Build para producción
npm run build

# Ejecutar versión de producción
npm run start

# Ejecutar linter
npm run lint
```

## 🌐 Páginas Disponibles

- **`/`** - Landing page con información general
- **`/about`** - Sobre nosotros (misión, visión, valores)
- **`/adoptions`** - Listado de animales disponibles para adopción
- **`/contact`** - Formulario de contacto con validación

## 🔧 Configuración de la API

El cliente Axios está configurado en `src/lib/api.ts` con:

- **Base URL** desde `NEXT_PUBLIC_API_BASE_URL`
- **Interceptores** para requests y responses
- **Manejo de errores** automático
- **Headers** por defecto

### Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## 📝 Datos Mock

Actualmente el proyecto usa datos mock para:

- **Animales en adopción** (6 ejemplos en `/adoptions`)
- **Enlaces de redes sociales** (en Footer)
- **Información de contacto** (en Contact)

## 🎨 Estilos con Tailwind CSS

El proyecto incluye estilos completos con **Tailwind CSS** y la paleta de colores específica de la Fundación:

- **Diseño responsive** - Adaptable a móviles, tablets y desktop
- **Paleta de colores personalizada**:
  - Fondo: `#FFE9D2` (crema cálido)
  - Header: `#01778D` (azul teal)
  - Acentos: `#97F597` (verde claro), `#FB7B53` (naranja), `#67E4FF` (azul claro)
- **Componentes estilizados** - Header con logo, Footer, formularios y tarjetas
- **Imágenes integradas** - Uso de assets de la carpeta public
- **Animaciones suaves** - Transiciones y efectos hover
- **Tipografía** - Fuentes Geist Sans y Geist Mono
- **Layout moderno** - Grid y Flexbox para diseño profesional

## 🐛 Solución de Problemas

### Error de Hidratación
Si ves errores de hidratación en la consola:
- Prueba en modo incógnito del navegador
- Desactiva extensiones del navegador
- Los elementos `html` y `body` ya tienen `suppressHydrationWarning`

### Puerto Ocupado
Si el puerto 3000 está ocupado:
- Next.js te sugerirá usar otro puerto automáticamente
- O puedes especificar uno: `npm run dev -- -p 3001`

### Dependencias
Si hay problemas con las dependencias:
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Revisa la documentación de [Next.js](https://nextjs.org/docs)
- Consulta la documentación de [React Hook Form](https://react-hook-form.com/)
- Revisa la documentación de [Axios](https://axios-http.com/docs/intro)

## 🚀 Próximos Pasos

1. **Agregar estilos** (Tailwind CSS recomendado)
2. **Conectar con API real** (reemplazar datos mock)
3. **Implementar autenticación** (si es necesario)
4. **Agregar tests** (Jest + Testing Library)
5. **Optimizar SEO** (metadata dinámica)
6. **Implementar PWA** (Progressive Web App)

---

**Desarrollado con ❤️ para la Fundación Paperros**