import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.fundacionpaperros.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/auth/', '/adopciones/', '/adopta/', '/pago/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
