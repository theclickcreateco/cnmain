'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import {
    ChevronLeft,
    CheckCircle2,
    Package,
    Globe,
    ShieldCheck,
    Mail,
    MessageCircle,
    Plus,
    Check,
    Facebook,
    Twitter,
    Linkedin,
    X,
    Send
} from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useInquiry } from '@/context/InquiryContext';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const { addToInquiry, isInInquiry, removeFromInquiry } = useInquiry();

    const product = products.find(p => p.id === params.id);

    if (!product) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-4xl font-bold text-navy">Product Not Found</h1>
                <button onClick={() => router.push('/products')} className="mt-6 text-teal font-bold flex items-center justify-center gap-2 mx-auto">
                    <ChevronLeft className="w-5 h-5" /> Back to Products
                </button>
            </div>
        );
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const email = "info@clothingnexus.com";
    const phone = "+923212481412";
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this ${product.name} from Clothing Nexus!`;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: `Hi, I would like to learn more about the ${product.name}.`
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleInquiryToggle = () => {
        if (isInInquiry(product.id)) {
            removeFromInquiry(product.id);
        } else {
            addToInquiry(product);
        }
    };

    const handleDirectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: `Product Inquiry: ${product.name}`,
                    products: [product]
                })
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    setIsModalOpen(false);
                    setStatus('idle');
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="pb-32 bg-slate-50/50">
            {/* Header / Breadcrumb Area */}
            <div className="bg-white border-b border-navy/5">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <button
                        onClick={() => router.push('/products')}
                        className="flex items-center gap-2 text-navy/40 hover:text-teal font-bold mb-6 transition-colors uppercase tracking-widest text-[10px]"
                    >
                        <ChevronLeft className="w-3 h-3" /> Back to Catalog
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-teal/10 text-teal text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    {product.parentCategory}
                                </span>
                                <span className="text-navy/20">•</span>
                                <span className="text-navy/40 text-[10px] font-bold uppercase tracking-widest">
                                    {product.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">{product.name}</h1>
                        </div>

                        {/* Social Sharing */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Like this product? Share with friends:</span>
                            <div className="flex gap-2">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white transition-all">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white transition-all">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Image & Gallery */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="aspect-square bg-white rounded-[40px] flex items-center justify-center shadow-xl shadow-navy/5 border border-navy/5 relative overflow-hidden group">
                            {product.image.startsWith('/') ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="text-[12rem] opacity-20">{product.image}</div>
                            )}
                        </div>

                        {/* Trust Cards Section */}
                        <div className="grid gap-4">
                            <div className="bg-navy rounded-3xl p-6 text-white border border-white/5 space-y-3 shadow-xl shadow-navy/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-teal rounded-xl flex items-center justify-center">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider">Why Choose Us?</h4>
                                </div>
                                <p className="text-white/60 text-xs leading-relaxed">
                                    Clothing Nexus is a professional manufacturer and exporter concerned with the design, development, and production of premium metal garment accessories.
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl p-6 border border-navy/5 space-y-3 shadow-xl shadow-navy/5">
                                <div className="flex items-center gap-3 text-navy">
                                    <div className="w-8 h-8 bg-navy/5 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-teal" />
                                    </div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider">Quality Management</h4>
                                </div>
                                <p className="text-navy/40 text-xs leading-relaxed">
                                    Since 2007, we've passed OEKO-Tex Standard 100 Class and ISO9001:2008 Quality Management System, ensuring international standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Actions */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Main Overview */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-navy/5 shadow-xl shadow-navy/5">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-navy flex items-center gap-3">
                                        <Package className="w-5 h-5 text-teal" />
                                        Product Overview
                                    </h3>
                                    <p className="text-navy/50 text-lg leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Quick Specs Summary */}
                                <div className="grid grid-cols-2 gap-6 p-8 bg-slate-50/50 rounded-3xl border border-navy/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Category</p>
                                        <p className="text-sm font-bold text-navy">{product.category}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Standard Size</p>
                                        <p className="text-sm font-bold text-teal">{product.size || 'Contact for sizes'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px) font-bold text-navy/30 uppercase tracking-widest">Product Style</p>
                                        <p className="text-sm font-bold text-navy">Premium Trim</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px) font-bold text-navy/30 uppercase tracking-widest">Material</p>
                                        <p className="text-sm font-bold text-navy">{(product as any).material || 'Mixed Metals'}</p>
                                    </div>
                                </div>

                                {/* Features Grid */}
                                {(product as any).features && (product as any).features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {(product as any).features.map((feature: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 text-navy/60 bg-navy/5 px-4 py-3 rounded-xl border border-navy/5">
                                                <CheckCircle2 className="w-4 h-4 text-teal" />
                                                <span className="text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                    <button
                                        onClick={handleInquiryToggle}
                                        className={cn(
                                            "flex items-center justify-center gap-3 py-5 rounded-3xl font-extrabold transition-all border-2",
                                            isInInquiry(product.id)
                                                ? "bg-white border-teal text-teal shadow-xl shadow-teal/10"
                                                : "bg-teal border-teal text-white hover:bg-navy hover:border-navy shadow-xl shadow-teal/20"
                                        )}
                                    >
                                        {isInInquiry(product.id) ? (
                                            <>
                                                <Check className="w-5 h-5" /> Added to Inquiry
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" /> Select for Bulk Inquiry
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center justify-center gap-3 bg-navy text-white py-5 rounded-3xl font-extrabold hover:bg-teal transition-all shadow-xl shadow-navy/20"
                                    >
                                        <Mail className="w-5 h-5" /> Leave a Message
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-navy/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <MessageCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">WhatsApp Inquiry</p>
                                            <a href={`https://wa.me/${phone.replace('+', '')}`} className="text-sm font-bold text-navy hover:text-teal transition-colors">{phone}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-teal" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Email Address</p>
                                            <span className="text-sm font-bold text-navy hover:text-teal transition-colors font-mono">{email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 space-y-12">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold text-navy tracking-tight">Related Products</h2>
                                <p className="text-navy/40 text-sm italic">You might also be interested in these {product.category} items</p>
                            </div>
                            <Link href="/products" className="text-sm font-bold text-teal hover:text-navy transition-colors flex items-center gap-2">
                                View Entire Catalog <ChevronLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Direct Message Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-navy/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 text-navy/20 hover:text-navy transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {status === 'success' ? (
                            <div className="text-center py-8 space-y-4">
                                <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
                                <h3 className="text-2xl font-bold text-navy">Message Sent!</h3>
                                <p className="text-navy/60">Thank you for your interest. Our team will contact you shortly.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-navy mb-2">Inquiry for {product.name}</h3>
                                    <p className="text-navy/50 text-sm">Please provide your details below.</p>
                                </div>

                                <form onSubmit={handleDirectSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all resize-none"
                                            placeholder="Tell us what you need..."
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-sm font-medium">
                                            Oops! Failed to send. Please try again or use WhatsApp.
                                        </div>
                                    )}

                                    <button
                                        disabled={status === 'loading'}
                                        className="w-full bg-navy text-white font-bold py-5 rounded-2xl hover:bg-teal transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {status === 'loading' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
