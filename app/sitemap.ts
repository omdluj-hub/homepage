import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homepage-five-chi.vercel.app';

  // 실제 운영 중인 모든 경로 리스트
  const routes = [
    '',
    '/about',
    '/contact',
    // 피부 클리닉
    '/clinic/skin/acne',
    '/clinic/skin/scar',
    '/clinic/skin/mark',
    '/clinic/skin/wart',
    '/clinic/skin/seborrheic',
    '/clinic/skin/rosacea',
    // 피부미용
    '/clinic/beauty/lifting',
    '/clinic/beauty/contour',
    '/clinic/beauty/skin-booster',
    // 다이어트
    '/clinic/diet/medicine',
    '/clinic/diet/program',
    '/clinic/diet/point',
    '/clinic/diet/remote',
    // 교통사고
    '/clinic/traffic/info',
    '/clinic/traffic/treatment',
    '/clinic/traffic/chuna',
    '/clinic/traffic/room',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
