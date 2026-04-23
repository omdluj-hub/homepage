import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homepage-five-chi.vercel.app';

  // 주요 페이지 리스트
  const routes = [
    '',
    '/about',
    '/contact',
    '/clinic/diet',
    '/clinic/acne',
    '/clinic/ipwon',
    '/clinic/skin',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
