'use client';

import React from 'react';
import { useInquiry } from '@/context/InquiryContext';
import { Mail, MessageCircle, Phone, X, ShoppingBag, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InquiryFooter() {
    const { selectedProducts, removeFromInquiry, clearInquiry } = useInquiry();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (selectedProducts.length === 0) return null;

    const phone = "+923212481412";
    const whatsappBody = encodeURIComponent(`Hi, I'm interested in these products from Clothing Nexus:\n${selectedProducts.map(p => `- ${p.name} (ID: ${p.id})`).join('\n')}`);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: 'Bulk Inquiry from Basket',
                    products: selectedProducts
                })
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    clearInquiry();
                    setIsModalOpen(false);
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <>
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
                <div className="bg-navy rounded-[32px] shadow-2xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-teal rounded-2xl flex items-center justify-center relative">
                            <ShoppingBag className="text-white w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-white text-navy text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-teal shadow-lg">
                                {selectedProducts.length}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">Inquiry Basket</h4>
                            <p className="text-white/40 text-xs">Request a quote for all items</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
                        <button
                            onClick={clearInquiry}
                            className="px-6 py-4 rounded-2xl text-white/40 font-bold hover:text-white transition-colors text-sm"
                        >
                            Clear All
                        </button>
                        <a
                            href={`https://wa.me/${phone.replace('+', '')}?text=${whatsappBody}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all text-sm shadow-xl shadow-green-500/10"
                        >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-teal/20 transition-all text-sm"
                        >
                            <Mail className="w-4 h-4" /> Send Inquiry
                        </button>
                    </div>
                </div>
            </div>

            {/* Inquiry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-navy/80 backdrop-blur-sm animate-in fade-in duration-300">
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
                                <h3 className="text-2xl font-bold text-navy">Inquiry Sent!</h3>
                                <p className="text-navy/60">We will get back to you at {formData.email} shortly.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-navy mb-2">Complete Your Inquiry</h3>
                                    <p className="text-navy/50 text-sm">Please provide your details so we can send you a formal quote.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
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
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40 ml-4">Additional Note (Optional)</label>
                                        <textarea
                                            rows={3}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all resize-none"
                                            placeholder="Any specific requirements?"
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-sm font-medium">
                                            Oops! Failed to send. Please try again.
                                        </div>
                                    )}

                                    <button
                                        disabled={status === 'loading'}
                                        className="w-full bg-navy text-white font-bold py-5 rounded-2xl hover:bg-teal transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {status === 'loading' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                                        {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
