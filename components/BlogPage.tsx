import React from 'react';
import { motion } from 'framer-motion';
import InternalPageLayout from './InternalPageLayout';
import { blogPosts } from '../data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';

const BlogPage: React.FC = () => {
  return (
    <InternalPageLayout>
      <Helmet>
        <title>Blog | Rostra Agency - Insights on Web Design & Marketing</title>
        <meta name="description" content="Read the latest insights on web design, SEO, branding, and digital marketing from the experts at Rostra Agency." />
      </Helmet>

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#E02424] text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Our Journal</span>
            <h1 className="text-[clamp(48px,8vw,96px)] font-bold leading-[0.9] tracking-tighter text-white mb-8">
              Insights & <br />
              <span className="text-white/30">Innovations.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
              Explore our latest thoughts on the intersection of design, technology, and business growth.
            </p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={`#blog/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:bg-white/[0.08] transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-6 text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#E02424]" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#E02424]" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-[#E02424] transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <p className="text-white/50 text-[15px] leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-3 text-white font-bold text-[12px] uppercase tracking-widest group/btn">
                  Read Article
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-[#E02424] group-hover/btn:border-[#E02424] transition-all">
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      
      <Footer />
    </InternalPageLayout>
  );
};

export default BlogPage;
