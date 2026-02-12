import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowRight, ShieldAlert, Package, Info } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side: Visual */}
                    <div className="relative">
                        <div className="text-[180px] md:text-[240px] font-black text-white/5 leading-none select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pt-8">
                            <div className="relative">
                                <div className="w-32 h-32 md:w-48 md:h-48 bg-teal rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                                    <Search className="w-16 h-16 md:w-24 md:h-24 text-navy -rotate-12" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                                    <ShieldAlert className="w-6 h-6 text-rose-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="text-center lg:text-left space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                Lost in the <span className="text-teal text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-400">Nexux?</span>
                            </h1>
                            <p className="text-white/50 text-lg leading-relaxed">
                                The page you're looking for has moved or no longer exists. Let's get you back to the right path.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/"
                                className="w-full sm:w-auto bg-teal text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-navy transition-all group shadow-xl shadow-teal/20"
                            >
                                <Home className="w-5 h-5" /> Return Home
                            </Link>
                            <Link
                                href="/products"
                                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                            >
                                View Catalog <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Destination</p>
                            <div className="grid grid-cols-2 gap-4">
                                <Link href="/products" className="flex items-center gap-3 text-white/40 hover:text-teal transition-colors text-sm font-bold">
                                    <Package className="w-4 h-4" /> Products
                                </Link>
                                <Link href="/about" className="flex items-center gap-3 text-white/40 hover:text-teal transition-colors text-sm font-bold">
                                    <Info className="w-4 h-4" /> About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
