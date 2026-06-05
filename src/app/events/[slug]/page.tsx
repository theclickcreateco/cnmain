import { events } from '@/lib/events';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Award, MapPin } from 'lucide-react';
import EventGallery from './EventGallery';
import eventImages from '@/lib/event-images.json';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return events.map((event) => ({
        slug: event.slug,
    }));
}

export default async function EventDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);

    if (!event) {
        notFound();
    }

    // Load images from the pre-generated static JSON mapping
    const images: string[] = (eventImages as Record<string, string[]>)[event.booth] || [];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b border-navy/5">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-navy/60 hover:text-teal font-bold mb-6 transition-colors uppercase tracking-widest text-[10px]"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" /> Back to Events
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-teal/10 text-teal text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> {event.year}
                                </span>
                                <span className="text-navy/20">•</span>
                                <span className="bg-navy/5 text-navy/60 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                                    <Award className="w-3 h-3 text-teal" /> {event.booth}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">{event.title} Exhibition</h1>
                        </div>

                        <div className="flex items-center gap-2 text-navy/40 text-sm font-medium">
                            <MapPin className="w-4 h-4 text-teal" /> Textile Asia Expo
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="bg-white rounded-[40px] p-8 md:p-12 border border-navy/5 shadow-xl shadow-navy/5 space-y-8">
                    <div className="space-y-3 max-w-3xl">
                        <h2 className="text-2xl font-bold text-navy">Exhibition Showcase Gallery</h2>
                        <p className="text-navy/80 leading-relaxed font-medium">
                            {event.description} Here is a selection of images capturing our team, visitor interactions, and highlighted products displayed at {event.booth}.
                        </p>
                    </div>

                    {images.length > 0 ? (
                        <EventGallery images={images} eventTitle={event.title} eventBooth={event.booth} />
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-navy/5">
                            <p className="text-navy/40 font-medium">No images found for this event.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
