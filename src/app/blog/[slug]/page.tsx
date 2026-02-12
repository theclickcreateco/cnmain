import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link2, ChevronRight, Clock } from 'lucide-react';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

    if (!post) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-4xl font-bold text-navy">Post Not Found</h1>
                <Link href="/blog" className="mt-6 text-teal font-bold inline-flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen relative">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[100]">
                <div className="h-full bg-teal animate-progress" style={{ width: '0%' }}></div>
            </div>

            {/* Header / Hero */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-navy">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-[120px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] -ml-48 -mb-48" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-teal font-bold text-xs uppercase tracking-[0.2em] mb-12 hover:gap-3 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Insights
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <span className="bg-teal/20 text-teal border border-teal/20 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-6 text-white/40 text-xs font-medium uppercase tracking-wider">
                                <span className="flex items-center gap-2 border-l border-white/10 pl-6"><Calendar className="w-4 h-4 text-teal" /> {post.date}</span>
                                <span className="flex items-center gap-2 border-l border-white/10 pl-6"><Clock className="w-4 h-4 text-teal" /> 5 Min Read</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-12">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal text-xl font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Written by</div>
                                <div className="text-white font-bold text-lg">{post.author}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-[1fr,350px] gap-20">
                    {/* Article Body */}
                    <div className="relative">
                        {/* Sticky Socials (Mobile Hidden) */}
                        <div className="hidden lg:flex flex-col gap-4 absolute -left-20 top-0">
                            {[Facebook, Twitter, Linkedin, Link2].map((Icon, idx) => (
                                <button key={idx} className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/40 hover:bg-teal hover:text-white transition-all shadow-sm">
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>

                        <article className="prose prose-xl prose-navy max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-navy/70 prose-p:leading-relaxed prose-strong:text-navy prose-a:text-teal font-medium">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Article Footer */}
                        <div className="mt-20 pt-10 border-t border-navy/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-navy/30 uppercase tracking-widest">Global Reach:</span>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-navy/5" />
                                    ))}
                                </div>
                                <span className="text-[10px] font-bold text-navy/50">Joined by 200+ Readers</span>
                            </div>
                            <button className="flex items-center gap-3 bg-teal text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-teal/20 transition-all">
                                <Share2 className="w-5 h-5" /> Share Article
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-12">
                        {/* Sidebar Widget 1: Related */}
                        <div className="bg-navy/[0.02] border border-navy/5 rounded-[40px] p-8 space-y-8">
                            <h4 className="text-lg font-bold text-navy flex items-center gap-3">
                                <div className="w-2 h-8 bg-teal rounded-full" />
                                More Insights
                            </h4>
                            <div className="space-y-6">
                                {relatedPosts.map((rp, idx) => (
                                    <Link key={idx} href={`/blog/${rp.slug}`} className="group block space-y-3">
                                        <div className="text-[10px] font-bold text-teal flex items-center gap-2 group-hover:gap-3 transition-all">
                                            {rp.category} <ChevronRight className="w-3 h-3" />
                                        </div>
                                        <h5 className="font-bold text-navy group-hover:text-teal transition-colors leading-snug">
                                            {rp.title}
                                        </h5>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Widget 2: Subscribe */}
                        <div className="bg-teal p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-teal/20">
                            <div className="relative z-10 space-y-8">
                                <h4 className="text-2xl font-black leading-tight">Join Our Global Network</h4>
                                <p className="text-white/80 text-sm leading-relaxed">Get our latest industrial insights and product launches directly.</p>
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full bg-white/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/30 transition-all"
                                    />
                                    <button className="w-full bg-white text-teal font-extrabold py-4 rounded-2xl hover:bg-navy hover:text-white transition-all">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
