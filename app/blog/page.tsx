import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts, BlogPost } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Skincare Blog | Lumaru",
  description: "Evidence-based skincare tips, ingredient deep-dives, and real talk about tired eyes. Learn what actually works for dark circles and under-eye concerns.",
  openGraph: {
    title: "Lumaru Blog — Skincare Tips & Ingredient Deep-Dives",
    description: "Evidence-based skincare tips, ingredient deep-dives, and real talk about tired eyes.",
    url: "https://lumaruskin.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogPage() {
  const posts: BlogPost[] = await getAllPosts();

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-text mb-4">
            The Lumaru Blog
          </h1>
          <p className="text-text/60 max-w-2xl mx-auto">
            Skincare tips, ingredient deep-dives, and real talk about tired eyes.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-text/50">
            <p className="text-lg">No posts yet. Coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {post.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-primary mb-3">
                    <span>{post.date}</span>
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="bg-primary-light/20 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text/60 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}