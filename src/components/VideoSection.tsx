'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Play } from 'lucide-react';
import Link from 'next/link';

export default function VideoSection() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section className="py-32 px-4 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div
                    className="relative aspect-square rounded-[40px] overflow-hidden bg-navy/5 cursor-pointer group"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <video
                            src="/honyip-latest-video.mp4"
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
                        Elevating industries with <span className="text-teal">sustainable solutions</span>
                    </h2>
                    <p className="text-navy/60 text-lg leading-relaxed">
                        Our expertise spans trims, apparel, and packaging, combining innovation with eco-conscious processes. At Clothing Nexus, we deliver excellence while prioritizing ethical practices and environmental responsibility.
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full font-bold hover:bg-teal transition-colors shadow-lg shadow-navy/20">
                        More About Us <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Video Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-10 h-10" />
                    </button>
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <video
                            src="/honyip-latest-video.mp4"
                            className="w-full h-full"
                            controls
                            autoPlay
                        />
                    </div>
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
                </div>
            )}
        </section>
    );
}
