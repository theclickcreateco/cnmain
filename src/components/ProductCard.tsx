import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import { useInquiry } from '@/context/InquiryContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        category: string;
        description: string;
        image: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToInquiry, isInInquiry, removeFromInquiry } = useInquiry();
    const isSelected = isInInquiry(product.id);

    const handleInquiryToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSelected) {
            removeFromInquiry(product.id);
        } else {
            addToInquiry(product);
        }
    };

    return (
        <div className="group bg-white rounded-3xl border border-navy/5 overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full relative">
            <div className="aspect-square bg-white flex items-center justify-center relative overflow-hidden">
                {product.image.startsWith('/') ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="text-8xl group-hover:scale-110 transition-transform duration-500 opacity-20">
                        {product.image}
                    </div>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                        href={`/products/${product.id}`}
                        className="w-10 h-10 bg-white text-navy rounded-full flex items-center justify-center shadow-lg hover:bg-teal hover:text-white transition-all"
                        title="View Details"
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={handleInquiryToggle}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all",
                            isSelected
                                ? "bg-teal text-white"
                                : "bg-white text-navy hover:bg-teal hover:text-white"
                        )}
                        title={isSelected ? "Remove from Inquiry" : "Add to Inquiry"}
                    >
                        {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="text-[10px] font-bold text-teal uppercase tracking-widest mb-2">{product.category}</div>
                <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-teal transition-colors leading-tight">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-navy/50 text-sm line-clamp-2 leading-relaxed mb-6">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={`/products/${product.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-navy/40 hover:text-teal transition-colors"
                    >
                        View Details
                    </Link>
                    {isSelected && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-teal bg-teal/5 px-2 py-1 rounded-full uppercase tracking-tighter animate-pulse">
                            Selected
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
