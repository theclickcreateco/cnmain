'use client';

import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: 'Bulk Order Inquiry',
        message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: 'Bulk Order Inquiry', message: '' });
                setStatusMessage(result.message);
            } else {
                setStatus('error');
                setStatusMessage(result.message);
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage('Oops! Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="pb-24">
            {/* Header */}
            <section className="bg-navy text-white pt-32 pb-24 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Let's Build the <span className="text-teal">Future</span> Together</h1>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl">
                            Partner with a leading global manufacturer for your premium garment accessory needs. Our team is ready to bring your designs to life.
                        </p>

                        <div className="grid gap-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal group-hover:text-navy transition-all shrink-0">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">USA HQ</div>
                                    <div className="text-base font-bold">6200 Savoy Drive, Suite #495, Houston Texas</div>
                                    <div className="text-teal font-medium">+1 832 628-4560</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal group-hover:text-navy transition-all shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">China Factory</div>
                                    <div className="text-base font-bold">Road 10 Jinqing, Xiaojin Kou Town, Huizhou City, Guangdong</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal group-hover:text-navy transition-all shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Pakistan Office</div>
                                    <div className="text-base font-bold">Suite# 12 Rafi Mansion, Shahrah-e-Faisal, Karachi</div>
                                    <div className="text-teal font-medium">+92-213-4585575</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group pt-4">
                                <div className="w-12 h-12 rounded-2xl bg-teal text-navy flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Direct Email</div>
                                    <div className="text-lg font-bold">info@clothingnexus.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/20 text-navy relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full -mr-16 -mt-16" />
                        <h2 className="text-2xl font-bold mb-8">Send an Inquiry</h2>

                        {status === 'success' ? (
                            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
                                <h3 className="text-2xl font-bold">Message Sent!</h3>
                                <p className="text-navy/60">{statusMessage}</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-teal font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all appearance-none cursor-pointer"
                                    >
                                        <option>Bulk Order Inquiry</option>
                                        <option>Custom Design Request</option>
                                        <option>Sample Request</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-navy/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:bg-white border border-transparent focus:border-teal transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-sm font-medium">
                                        {statusMessage}
                                    </div>
                                )}

                                <button
                                    disabled={status === 'loading'}
                                    className="w-full bg-navy text-white font-bold py-5 rounded-2xl hover:bg-teal transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {status === 'loading' ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Office Info */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center text-navy">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy">Business Hours</h3>
                        <p className="text-navy/50 text-sm leading-relaxed">
                            Monday — Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 10:00 AM - 2:00 PM<br />
                            Sunday: Closed
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-navy/5 border border-navy/10 rounded-2xl flex items-center justify-center text-navy">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy">Global Network</h3>
                        <p className="text-navy/50 text-sm leading-relaxed">
                            Serving clients across Asia, North America, Europe, Middle East, and Southeast Asia from our hub in Guangdong.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-teal/10 border border-teal/20 rounded-2xl flex items-center justify-center text-teal">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-navy">Visit Our Factory</h3>
                        <p className="text-navy/50 text-sm leading-relaxed">
                            Schedule a facility tour to witness our production process and R&D capabilities firsthand.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
