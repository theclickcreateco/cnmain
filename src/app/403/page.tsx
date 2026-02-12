import React from 'react';
import Link from 'next/link';
import { ShieldX, Home, Lock, Phone } from 'lucide-react';

export default function Forbidden() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Minimal Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#12233b_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="max-w-xl w-full relative z-10 text-center space-y-12">
                <div className="relative inline-block">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-navy/5 rounded-full flex items-center justify-center animate-pulse">
                        <Lock className="w-10 h-10 md:w-14 md:h-14 text-navy" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg text-white">
                        <ShieldX className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">Access Restricted</h1>
                    <p className="text-navy/50 text-lg leading-relaxed max-w-md mx-auto">
                        Sorry, you don't have permission to access this area of Clothing Nexus. This could be due to security protocols or a restricted link.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-navy text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal transition-all shadow-xl shadow-navy/20"
                    >
                        <Home className="w-5 h-5" /> Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto bg-navy/5 text-navy px-10 py-5 rounded-2xl font-bold hover:bg-navy/10 transition-all flex items-center justify-center gap-3"
                    >
                        <Phone className="w-5 h-5" /> Contact Support
                    </Link>
                </div>

                <div className="pt-8 text-[10px] font-bold text-navy/20 uppercase tracking-[0.3em]">
                    Error Code: 403 Forbidden
                </div>
            </div>
        </div>
    );
}
