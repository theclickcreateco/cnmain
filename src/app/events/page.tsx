'use client';
 
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { events } from '@/lib/events';

export default function EventsPage() {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Event Subscriber',
                    email,
                    subject: 'Newsletter Subscription (Events Page)',
                    message: `User (${email}) requested to be notified about future events.`
                })
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-navy text-white pt-32 pb-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal/20 via-transparent to-transparent opacity-50"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto space-y-6 relative z-10"
                >
                    <span className="inline-block px-4 py-1.5 bg-teal/20 text-teal-light rounded-full text-sm font-bold tracking-widest uppercase mb-4 border border-teal/30">
                        Exhibitions & Showcases
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Our Journey at <span className="text-teal">Textile Asia</span></h1>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        A retrospective of our participation in one of the world's leading textile technology exhibitions, showcasing innovation and sustainability.
                    </p>
                </motion.div>
            </section>

            {/* Events Vertical Grid */}
            <section className="max-w-3xl mx-auto px-4 py-24">
                <div className="space-y-16">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <Link href={`/events/${event.slug}`} className="block">
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                    {/* Year/Date Column */}
                                    <div className="hidden md:flex flex-col items-center pt-4">
                                        <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-teal font-bold text-xl mb-4 group-hover:bg-teal group-hover:text-white transition-colors duration-500 shadow-sm">
                                            {event.year}
                                        </div>
                                        <div className="w-0.5 h-full bg-navy/5 flex-1 min-h-[100px]"></div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-1 w-full">
                                        <div className="bg-white rounded-[40px] p-6 border border-navy/5 shadow-sm hover:shadow-2xl hover:border-teal/20 transition-all duration-500 group-hover:-translate-y-2">
                                            <div className="relative aspect-video rounded-[30px] overflow-hidden bg-navy/5 mb-8">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-6 left-6 flex gap-2">
                                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-navy flex items-center gap-2 shadow-sm">
                                                        <Award className="w-4 h-4 text-teal" /> {event.booth}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4 px-2">
                                                <div className="flex items-center gap-4 text-teal font-semibold text-sm uppercase tracking-widest md:hidden">
                                                    <Calendar className="w-4 h-4" /> {event.year}
                                                </div>
                                                <h3 className="text-3xl font-bold text-navy tracking-tight group-hover:text-teal transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-navy/60 leading-relaxed font-medium">
                                                    {event.description}
                                                </p>
                                                
                                                <div className="pt-6 flex items-center justify-between gap-6 border-t border-navy/5">
                                                    <div className="flex items-center gap-2 text-navy/40 text-sm">
                                                        <MapPin className="w-4 h-4" /> Textile Asia Expo
                                                    </div>
                                                    <span className="text-teal font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-all">
                                                        View Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                <div className="bg-navy rounded-[50px] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-teal/20 via-transparent to-transparent"></div>
                    <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold">Join Us at Our Next Event</h2>
                        <p className="text-xl text-white/70 leading-relaxed">
                            We are constantly evolving and showcasing our latest innovations worldwide. Stay updated on our upcoming exhibitions.
                        </p>
                        
                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-teal/20 border border-teal/30 p-8 rounded-3xl"
                            >
                                <div className="w-16 h-16 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-2xl">✓</div>
                                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                                <p className="text-white/70">We'll notify you as soon as our next event is announced.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 text-sm font-bold text-teal hover:text-white transition-colors"
                                >
                                    Add another email
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
                                <input 
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:bg-white/20 transition-all"
                                />
                                <button 
                                    disabled={status === 'loading'}
                                    className="bg-teal text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:bg-teal-light hover:-translate-y-1 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === 'loading' ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Get Notified'
                                    )}
                                </button>
                            </form>
                        )}
                        
                        {status === 'error' && (
                            <p className="text-rose-400 text-sm font-medium pt-2">
                                Failed to subscribe. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
