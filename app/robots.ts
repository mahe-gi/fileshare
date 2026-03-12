import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://qrflowx.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/share/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
