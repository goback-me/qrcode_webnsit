import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
     return [
    {
      url: 'https://www.genqrgenerator.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.genqrgenerator.com/products',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.genqrgenerator.com/bulk-qr-generator',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

     {
      url: 'https://www.genqrgenerator.com/help',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}