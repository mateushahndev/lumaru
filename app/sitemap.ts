import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://lumaruskin.com";

  // Páginas estáticas principais
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/dark-circle-type-finder`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz/dark-circles-photo-insecurity`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/science`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/our-standards`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/eye-cream-waste-calculator`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/evidence`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ingredients`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/embed`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quiz/are-you-making-your-dark-circles-worse`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  // Posts do blog (gerados automaticamente)
  const posts = await getAllPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Páginas manuais do blog (que não são geradas pelo getAllPosts)
  const manualBlogPages = [
    {
      url: `${baseUrl}/blog/ginkgo-biloba-vs-caffeine-dark-circles`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/shea-butter-vs-mineral-oil-under-eye-hydration`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/awake-eye-complex-vs-the-ordinary-caffeine-solution`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Páginas legais (prioridade baixa)
  const legalPages = [
    { url: `${baseUrl}/privacy`, priority: 0.3 },
    { url: `${baseUrl}/terms`, priority: 0.3 },
    { url: `${baseUrl}/shipping`, priority: 0.3 },
    { url: `${baseUrl}/refund`, priority: 0.3 },
    { url: `${baseUrl}/contact`, priority: 0.5 },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...blogPages, ...manualBlogPages, ...legalPages];
}