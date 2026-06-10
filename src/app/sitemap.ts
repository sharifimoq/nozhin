import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://nozhin.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://nozhin.vercel.app/products', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://nozhin.vercel.app/quiz', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://nozhin.vercel.app/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://nozhin.vercel.app/login', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://nozhin.vercel.app/register', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}