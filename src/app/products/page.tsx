'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { products, categories, parentCategories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [activeParent, setActiveParent] = useState('all');
    const [activeSubCategory, setActiveSubCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const parentParam = searchParams.get('parent');
        const catParam = searchParams.get('category');

        if (catParam) {
            // Find the parent for this specific category
            const subCat = categories.find(c => c.id === catParam);
            if (subCat) {
                setActiveParent(subCat.parent);
                setActiveSubCategory(catParam);
            } else {
                setActiveSubCategory(catParam);
            }
        } else if (parentParam) {
            setActiveParent(parentParam);
            setActiveSubCategory('all');
        } else {
            setActiveParent('all');
            setActiveSubCategory('all');
        }
    }, [searchParams]);

    const filteredProducts = products.filter(product => {
        const matchesParent = activeParent === 'all' || product.parentCategory === activeParent;
        const matchesSub = activeSubCategory === 'all' || product.category === activeSubCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesParent && matchesSub && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleParentChange = (parentId: string) => {
        setActiveParent(parentId);
        setActiveSubCategory('all');
        setCurrentPage(1);
    };

    const handleSubCategoryChange = (subId: string) => {
        setActiveSubCategory(subId);
        setCurrentPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="pb-24">
            {/* Header */}
            <section className="bg-navy pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Product Catalog</h1>
                        <p className="text-white/50 max-w-2xl">
                            From precision-engineered fasteners to decorative trims, explore our comprehensive collection of metal garment accessories.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {/* Search Bar */}
                        <div className="relative w-full max-w-3xl mx-auto group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 to-teal/0 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-teal transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search from hundreds of premium products..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-teal focus:bg-white/10 transition-all shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap justify-center gap-3">
                                <button
                                    onClick={() => handleParentChange('all')}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border backdrop-blur-sm",
                                        activeParent === 'all'
                                            ? "bg-teal border-teal text-white shadow-[0_8px_20px_-4px_rgba(58,191,173,0.4)] scale-105"
                                            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <span className="text-lg">✨</span>
                                    <span>All Products</span>
                                </button>
                                {parentCategories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleParentChange(cat.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border backdrop-blur-sm",
                                            activeParent === cat.id
                                                ? "bg-teal border-teal text-white shadow-[0_8px_20px_-4px_rgba(58,191,173,0.4)] scale-105"
                                                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <span className="text-lg">{cat.icon}</span>
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Sub-category Selector */}
                            {activeParent !== 'all' && (
                                <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleSubCategoryChange('all')}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                                            activeSubCategory === 'all'
                                                ? "bg-white/20 border-white/30 text-white shadow-lg"
                                                : "bg-white/5 border-white/5 text-white/40 hover:text-white/60 hover:bg-white/10"
                                        )}
                                    >
                                        All {activeParent}
                                    </button>
                                    {categories
                                        .filter(sub => sub.parent === activeParent)
                                        .map(sub => (
                                            <button
                                                key={sub.id}
                                                onClick={() => handleSubCategoryChange(sub.id)}
                                                className={cn(
                                                    "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                                                    activeSubCategory === sub.id
                                                        ? "bg-teal/20 border-teal/30 text-teal shadow-lg"
                                                        : "bg-white/5 border-white/5 text-white/40 hover:text-white/60 hover:bg-white/10"
                                                )}
                                            >
                                                {sub.icon && <span className="mr-2">{sub.icon}</span>}
                                                {sub.name}
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                {filteredProducts.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {paginatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-2 pt-12 border-t border-navy/5">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-3 rounded-xl border border-navy/10 text-navy disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal hover:border-teal hover:text-white transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        // Show first, last, current, and pages around current
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl text-sm font-bold transition-all",
                                                        currentPage === page
                                                            ? "bg-teal text-white shadow-lg"
                                                            : "text-navy/40 hover:text-navy hover:bg-navy/5"
                                                    )}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        } else if (
                                            page === currentPage - 2 ||
                                            page === currentPage + 2
                                        ) {
                                            return <span key={page} className="px-2 text-navy/20">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-3 rounded-xl border border-navy/10 text-navy disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal hover:border-teal hover:text-white transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-navy/5 rounded-[40px] border border-dashed border-navy/10">
                        <div className="text-6xl mb-6 opacity-20 text-navy">🔍</div>
                        <h3 className="text-2xl font-bold text-navy">No products found</h3>
                        <p className="text-navy/40 mt-2">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-navy flex items-center justify-center"><div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductsContent />
        </Suspense>
    );
}
