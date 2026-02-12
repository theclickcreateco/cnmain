'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
}

interface InquiryContextType {
    selectedProducts: Product[];
    addToInquiry: (product: Product) => void;
    removeFromInquiry: (productId: string) => void;
    clearInquiry: () => void;
    isInInquiry: (productId: string) => boolean;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const addToInquiry = (product: Product) => {
        setSelectedProducts(prev => {
            if (prev.find(p => p.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromInquiry = (productId: string) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    };

    const clearInquiry = () => setSelectedProducts([]);

    const isInInquiry = (productId: string) => {
        return selectedProducts.some(p => p.id === productId);
    };

    return (
        <InquiryContext.Provider value={{
            selectedProducts,
            addToInquiry,
            removeFromInquiry,
            clearInquiry,
            isInInquiry
        }}>
            {children}
        </InquiryContext.Provider>
    );
}

export function useInquiry() {
    const context = useContext(InquiryContext);
    if (context === undefined) {
        throw new Error('useInquiry must be used within an InquiryProvider');
    }
    return context;
}
