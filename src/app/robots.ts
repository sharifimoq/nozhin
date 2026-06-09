import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/profile', '/checkout'],
    },
    sitemap: 'https://nozhin.vercel.app/sitemap.xml',
  }
}