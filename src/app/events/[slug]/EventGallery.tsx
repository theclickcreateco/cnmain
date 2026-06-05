'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Eye, Grid } from 'lucide-react';

interface EventGalleryProps {
    images: string[];
    eventTitle: string;
    eventBooth: string;
}

const IMAGES_PER_PAGE = 24;

export default function EventGallery({ images, eventTitle, eventBooth }: EventGalleryProps) {
    const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Load more images function
    const loadMore = () => {
        setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, images.length));
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (activeIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setActiveIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
            } else if (e.key === 'Escape') {
                setActiveIndex(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Disable body scroll when lightbox is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [activeIndex, images.length]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    };

    const visibleImages = images.slice(0, visibleCount);

    return (
        <div className="space-y-12">
            {/* Gallery Stats Info */}
            <div className="flex items-center justify-between border-b border-navy/5 pb-4">
                <span className="text-sm font-semibold text-navy/60 inline-flex items-center gap-2">
                    <Grid className="w-4 h-4 text-teal" /> Showing {Math.min(visibleCount, images.length)} of {images.length} Photos
                </span>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleImages.map((image, idx) => (
                    <motion.div
                        key={image}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                        className="group relative aspect-square bg-slate-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-navy/5"
                        onClick={() => setActiveIndex(idx)}
                    >
                        <img
                            src={image}
                            alt={`${eventTitle} - ${eventBooth} - image ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full border border-white/20 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-md">
                                <Eye className="w-6 h-6" />
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < images.length && (
                <div className="text-center pt-8">
                    <button
                        onClick={loadMore}
                        className="bg-teal text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:bg-teal-light hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
                    >
                        Load More Images
                    </button>
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveIndex(null)}
                        className="fixed inset-0 z-[150] bg-navy/95 backdrop-blur-md flex flex-col items-center justify-center select-none"
                    >
                        {/* Top bar */}
                        <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between text-white bg-gradient-to-b from-navy/55 to-transparent">
                            <div className="font-semibold text-white/80">
                                {eventTitle} — {eventBooth}
                            </div>
                            <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest">
                                {activeIndex + 1} / {images.length}
                            </div>
                            <button
                                onClick={() => setActiveIndex(null)}
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy transition-all border border-white/10 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation and Main Image container */}
                        <div className="relative w-full max-w-7xl px-4 flex items-center justify-between gap-4">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrev}
                                className="hidden sm:flex w-14 h-14 rounded-full bg-white/10 items-center justify-center text-white/70 hover:bg-white hover:text-navy hover:scale-105 transition-all border border-white/10 shrink-0 cursor-pointer shadow-lg"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Main Image */}
                            <div className="flex-1 flex items-center justify-center max-h-[75vh] relative" onClick={(e) => e.stopPropagation()}>
                                <motion.img
                                    key={activeIndex}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                    src={images[activeIndex]}
                                    alt={`${eventTitle} Image ${activeIndex + 1}`}
                                    className="max-w-full max-h-[75vh] rounded-[24px] object-contain shadow-2xl border border-white/5"
                                />
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                className="hidden sm:flex w-14 h-14 rounded-full bg-white/10 items-center justify-center text-white/70 hover:bg-white hover:text-navy hover:scale-105 transition-all border border-white/10 shrink-0 cursor-pointer shadow-lg"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Swipe / Tap Area Instructions or indicators */}
                        <div className="absolute bottom-6 inset-x-0 text-center sm:hidden">
                            <div className="flex justify-center gap-8 px-4">
                                <button
                                    onClick={handlePrev}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy transition-all border border-white/10 cursor-pointer"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy transition-all border border-white/10 cursor-pointer"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
