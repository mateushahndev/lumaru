import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [], // Todas as páginas são públicas
    },
    sitemap: "https://lumaruskin.com/sitemap.xml",
    // Opcional: adicionar host
    host: "https://lumaruskin.com",
  };
}