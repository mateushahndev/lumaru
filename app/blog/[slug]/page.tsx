import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, BlogPost } from "../../../lib/blog";

// Gerar rotas estáticas no build
export async function generateStaticParams() {
  const posts: BlogPost[] = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Gerar metadados dinâmicos com Open Graph e canonical
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost | null = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false },
    };
  }
  
  return {
    title: `${post.title} | Lumaru Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Lumaru Blog`,
      description: post.excerpt,
      url: `https://lumaruskin.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Lumaru"],
      tags: post.category ? [post.category] : [],
    },
    alternates: {
      canonical: `https://lumaruskin.com/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Página do post
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: BlogPost | null = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Schema.org para Artigo (BlogPosting)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Lumaru",
      url: "https://lumaruskin.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Lumaru",
      logo: {
        "@type": "ImageObject",
        url: "https://lumaruskin.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lumaruskin.com/blog/${slug}`,
    },
    ...(post.coverImage && {
      image: {
        "@type": "ImageObject",
        url: `https://lumaruskin.com${post.coverImage}`,
      },
    }),
  };

  return (
    <>
      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-primary hover:underline mb-8 text-sm"
          >
            ← Back to Blog
          </Link>

          <article className="prose prose-lg max-w-none">
            {post.coverImage && (
              // Imagem sem cortes: usa object-contain para mostrar a imagem inteira
              <div className="relative w-full min-h-[200px] md:min-h-[300px] rounded-2xl overflow-hidden bg-primary-light/10 mb-8">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-text/50 mb-4">
              <time dateTime={post.date}>{post.date}</time>
              {post.category && (
                <>
                  <span>•</span>
                  <span className="bg-primary-light/20 text-primary px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </>
              )}
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-6">
              {post.title}
            </h1>

            <div className="text-text/70 prose-headings:text-text prose-headings:font-semibold prose-a:text-primary prose-strong:text-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-primary-light/20 text-center">
            <h3 className="text-xl font-semibold text-text mb-2">
              Want more skincare tips?
            </h3>
            <p className="text-text/60 mb-4">
              Check out our other articles or visit our blog homepage.
            </p>
            <Link
              href="/blog"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 inline-block"
            >
              Browse All Articles →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}