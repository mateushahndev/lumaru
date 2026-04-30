import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, BlogPost } from "../../../lib/blog";

// Gerar rotas estáticas no build
export async function generateStaticParams() {
  const posts: BlogPost[] = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Gerar metadados dinâmicos - CORRIGIDO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← Desembrulha a Promise
  const post: BlogPost | null = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Lumaru Blog`,
    description: post.excerpt,
  };
}

// Página do post - CORRIGIDO
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← Desembrulha a Promise
  const post: BlogPost | null = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
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
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px" // ← Adicionado sizes para performance
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-text/50 mb-4">
            <span>{post.date}</span>
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
            Subscribe to our newsletter for weekly insights.
          </p>
          <Link
            href="/#newsletter"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 inline-block"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}