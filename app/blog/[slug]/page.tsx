import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, BlogPost } from "../../../lib/blog";
import BlogEmailBanner from "@/components/BlogEmailBanner";

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
      authors: post.author ? [post.author] : ["Lumaru"],
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

  // Definição dos slugs que têm TL;DR
  const tldrSlugs = [
    "dark-circle-types-guide",
    "why-you-look-tired-after-sleep"
  ];
  
  const hasTldr = tldrSlugs.includes(slug);

  // Conteúdo do TL;DR baseado no slug
  const getTldrContent = () => {
    if (slug === "dark-circle-types-guide") {
      return (
        <div className="bg-primary-light/10 border-l-4 border-primary rounded-r-xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            TL;DR — The Short Version
          </h2>
          <ul className="space-y-2 text-text/80">
            <li>✓ Dark circles aren't one thing — there are 4 distinct types: Vascular (blue/purple, poor circulation), Pigmentary (brown, excess melanin), Structural (shadow from facial structure), and Mixed (a combination).</li>
            <li>✓ Each type has a different cause — and treating the wrong type is why most eye creams feel useless.</li>
            <li>✓ You can self-diagnose in 10 seconds: stretch the skin (fades = vascular), check the color (brown = pigmentary), tilt toward light (shadow shifts = structural).</li>
            <li>✓ The fix matches the cause: Ginkgo Biloba for vascular, sunscreen + vitamin C for pigmentary, deep hydration for structural. For mixed, layer all three.</li>
          </ul>
        </div>
      );
    }
    
    if (slug === "why-you-look-tired-after-sleep") {
      return (
        <div className="bg-primary-light/10 border-l-4 border-primary rounded-r-xl p-6 mb-10">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            TL;DR — The Short Version
          </h2>
          <ul className="space-y-2 text-text/80">
            <li>✓ Sleeping 8 hours isn't enough — under-eye darkness has 3 hidden causes that rest alone can't fix.</li>
            <li>✓ Sluggish microcirculation makes blood pool and show through thin skin as a bluish tint.</li>
            <li>✓ Fluid retention from sodium, alcohol, or lying flat causes morning puffiness that compounds over time.</li>
            <li>✓ Skin thinning with age makes underlying vessels and shadows more visible — hydration and sunscreen slow this down.</li>
          </ul>
        </div>
      );
    }
    
    return null;
  };

  const tldrContent = hasTldr ? getTldrContent() : null;

  // Schema.org para Artigo (BlogPosting)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Lumaru",
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

            {/* ✅ Metadados com autor */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-text/50 mb-4">
              {post.author && (
                <>
                  <span>By {post.author}</span>
                  <span>•</span>
                </>
              )}
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

            {/* TL;DR - apenas para slugs específicos */}
            {tldrContent}

            <div className="text-text/70 prose-headings:text-text prose-headings:font-semibold prose-a:text-primary prose-strong:text-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <BlogEmailBanner />

          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="text-primary/70 hover:text-primary text-sm transition-colors"
            >
              ← Browse all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}