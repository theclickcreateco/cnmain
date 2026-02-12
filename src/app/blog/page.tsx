import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
    return (
        <div className="pb-24">
            {/* Header */}
            <section className="bg-navy/5 pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <div className="text-teal font-bold uppercase tracking-[0.3em] text-xs">The Official Blog</div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-navy">Clothing Nexus Insights</h1>
                    <p className="text-navy/50 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest trends in garment accessories, manufacturing excellence, and industrial design.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <article key={i} className="group bg-white rounded-3xl overflow-hidden border border-navy/5 flex flex-col hover:shadow-2xl transition-all h-full">
                            <div className="aspect-[16/10] bg-navy/5 relative flex items-center justify-center overflow-hidden">
                                <div className="text-6xl group-hover:scale-110 transition-transform duration-500 opacity-20">📰</div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-teal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1 gap-4">
                                <div className="flex items-center gap-4 text-xs text-navy/40">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-navy group-hover:text-teal transition-colors leading-snug">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <p className="text-navy/50 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-6">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-navy font-bold text-sm flex items-center gap-2 group/btn"
                                    >
                                        Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-teal" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="max-w-7xl mx-auto px-4 pt-10">
                <div className="bg-navy rounded-[40px] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-[80px] -z-0" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white relative z-10">Subscribe to Our Newsletter</h2>
                    <p className="text-white/50 max-w-xl mx-auto relative z-10">Get the latest news and product updates delivered to your inbox.</p>
                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-teal transition-all"
                        />
                        <button className="bg-teal text-navy font-bold px-8 py-4 rounded-full hover:bg-white transition-all whitespace-nowrap">
                            Join Now
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
