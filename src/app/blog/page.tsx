"use client";

import { BLOG_POSTS } from "./data";

const CATEGORIES = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Digital Strategy",
  "Database & Systems",
  "Brand Strategy",
];

const ALL_TAGS = Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).sort();

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="max-w-3xl text-center mx-auto" data-aos="fade-up" data-aos-duration="800">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Blog & Resources
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Insights on <span className="text-primary">Digital</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto">
              Practical guides, tutorials, and strategy articles from the CWorks team.
            </p>
          </div>
        </div>
        <div className="absolute w-50 h-50 bg-gradient-to-bl from-[#0815A6] to-[#050F67] blur-400 rounded-full -top-64 -right-14 -z-1" aria-hidden="true" />
        <div className="absolute w-40 h-40 bg-gradient-to-tr from-[#1E0339] to-[#050F67] blur-300 rounded-full -bottom-32 -left-20 -z-1" aria-hidden="true" />
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-dark_grey/30">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12" role="tablist" aria-label="Blog categories">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                className="px-5 py-2 rounded-full text-sm font-medium bg-dark_grey bg-opacity-40 text-muted hover:text-white border border-dark_border border-opacity-20 transition-all duration-300 hover:border-primary/40"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-dark_border border-opacity-20 bg-darkmode p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Meta header */}
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <span className="text-primary font-medium">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-white group-hover:text-primary transition-colors leading-snug">
                  <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </a>
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-muted text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dark_border bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                  <span>By {post.author}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination (placeholder for future dynamic pagination) */}
          <nav className="mt-16 flex justify-center gap-2" aria-label="Pagination">
            <span className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm">1</span>
            <span className="px-4 py-2 rounded-lg bg-dark_grey bg-opacity-40 text-muted text-sm border border-dark_border border-opacity-20">
              2
            </span>
            <span className="px-4 py-2 rounded-lg bg-dark_grey bg-opacity-40 text-muted text-sm border border-dark_border border-opacity-20">
              3
            </span>
            <span className="px-4 py-2 rounded-lg bg-dark_grey bg-opacity-40 text-muted text-sm border border-dark_border border-opacity-20">
              Next →
            </span>
          </nav>
        </div>
      </section>

      {/* All Tags Cloud */}
      <section className="py-20">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="text-center" data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-2xl font-bold text-white">Browse by Topic</h2>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {ALL_TAGS.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-5 py-2 rounded-full text-sm bg-dark_grey bg-opacity-40 text-muted hover:text-white hover:bg-primary hover:bg-opacity-20 border border-dark_border border-opacity-20 transition-all duration-300"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 max-w-xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
            <p className="mt-3 text-muted text-sm">
              Get the latest articles on web development, design, and digital strategy delivered to your inbox.
            </p>
            <form className="mt-6 flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="flex-1 rounded-xl border border-dark_border bg-dark_grey px-4 py-3 text-white placeholder-muted text-sm transition-colors focus:border-primary/40 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary border border-primary rounded-lg text-white font-medium hover:bg-transparent hover:text-primary py-3 px-6 text-sm transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
