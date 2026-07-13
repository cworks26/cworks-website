import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/app/blog/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | CWorks Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      {/* Article Hero */}
      <article className="relative pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm" aria-label="Breadcrumb">
              <Link href="/blog" className="text-muted hover:text-primary transition-colors">
                ← Back to Blog
              </Link>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-muted mb-4">
              <span className="text-primary font-medium">{post.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4 border-t border-dark_border border-opacity-20 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <p className="text-muted text-sm">{post.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1" aria-hidden="true" />
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1" aria-hidden="true" />
      </article>

      {/* Article Content */}
      <section className="py-16 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-li:text-muted prose-li:leading-relaxed
                prose-code:bg-dark_grey prose-code:text-primary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-dark_grey prose-pre:border prose-pre:border-dark_border prose-pre:rounded-xl
                prose-blockquote:border-l-primary prose-blockquote:text-muted
                prose-table:border-dark_border
                prose-th:text-white prose-th:font-semibold
                prose-td:text-muted"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^### (.*$)/gm, "<h3>$1</h3>")
                  .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                  .replace(/^# (.*$)/gm, "<h1>$1</h1>")
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/^- (.*$)/gm, "<li>$1</li>")
                  .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
                  .replace(/`([^`]+)`/g, "<code>$1</code>")
                  .replace(
                    /```(\w*)\n([\s\S]*?)```/g,
                    "<pre><code>$2</code></pre>"
                  )
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/^(?!<[hup])/gm, (line) =>
                    line.trim() ? `<p>${line.trim()}` : ""
                  )
                  .replace(/^(<p>.*<\/p>)$/gm, "$1")
                  .replace(/<\/p><p>/g, "</p>\n<p>"),
              }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-dark_border border-opacity-20">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-dark_border bg-white/5 px-3 py-1 text-xs text-muted hover:text-white hover:border-primary/40 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous / Next Navigation */}
      <section className="py-16">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-8">
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group rounded-2xl border border-dark_border border-opacity-20 bg-darkmode p-6 transition-all duration-300 hover:border-primary/30"
                >
                  <span className="text-xs text-muted">← Previous Article</span>
                  <h3 className="mt-2 text-white font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.title}
                  </h3>
                  <p className="mt-1 text-muted text-sm">{prevPost.readTime}</p>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group rounded-2xl border border-dark_border border-opacity-20 bg-darkmode p-6 transition-all duration-300 hover:border-primary/30 text-right"
                >
                  <span className="text-xs text-muted">Next Article →</span>
                  <h3 className="mt-2 text-white font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                  <p className="mt-1 text-muted text-sm">{nextPost.readTime}</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold text-white">Enjoyed this article?</h2>
            <p className="mt-3 text-muted">
              Subscribe to our newsletter for more insights on web development, design, and digital strategy.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-block bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-8 transition-all duration-300"
            >
              Browse More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
