import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import { blogPosts, BlogPost } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';

interface BlogPostPageProps {
  slug: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost || null);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <InternalPageLayout>
        <div className="flex flex-col items-center justify-center py-40">
          <h1 className="text-4xl font-bold text-white mb-8">Post Not Found</h1>
          <a href="#blog" className="text-[#E02424] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
            <ArrowLeft size={18} />
            Back to Journal
          </a>
        </div>
      </InternalPageLayout>
    );
  }

  return (
    <InternalPageLayout>
      <Helmet>
        <title>{post.title} | Rostra Agency</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph / SEO Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E02424] z-[3000] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-[900px] mx-auto">
        {/* Back Link */}
        <motion.a
          href="#blog"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#E02424] transition-colors font-bold text-[11px] uppercase tracking-widest mb-12"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </motion.a>

        {/* Hero Section */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-[clamp(32px,6vw,64px)] font-bold leading-[1.1] tracking-tighter text-white mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/40 text-[11px] font-bold uppercase tracking-widest pb-12 border-b border-white/5">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#E02424]" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#E02424]" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#E02424]" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-[40px] overflow-hidden mb-20 shadow-2xl"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <article className="prose prose-invert prose-xl max-w-none mb-32">
          <div className="text-white/70 leading-[1.8] space-y-10 text-[20px]">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-white pt-8 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-white pt-6 pb-3" {...props} />,
                p: ({node, ...props}) => <p className="mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-4 mb-6" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Footer Actions */}
        <div className="flex items-center justify-between py-12 border-t border-white/5 mb-32">
          <div className="flex items-center gap-4">
            <button 
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#E02424] hover:border-[#E02424] transition-all"
              onClick={() => {
                navigator.share?.({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href,
                }).catch(() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                });
              }}
            >
              <Share2 size={18} />
            </button>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">Share this article</span>
          </div>
          
          <a href="#blog" className="text-white hover:text-[#E02424] font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-colors">
            Next Article
            <ArrowLeft size={16} className="rotate-180" />
          </a>
        </div>
      </div>

      <Footer />
    </InternalPageLayout>
  );
};

export default BlogPostPage;
