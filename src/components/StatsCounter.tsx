'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatsCounterProps {
    end: number;
    label: string;
    duration?: number;
    suffix?: string;
    icon?: React.ReactNode;
}

export default function StatsCounter({ end, label, duration = 2000, suffix = '', icon }: StatsCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(end * ease));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return (
        <div ref={ref} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-teal/30 transition-colors">
            {icon && <div className="mb-4 flex justify-center text-teal">{icon}</div>}
            <div className="text-4xl md:text-5xl font-bold text-teal mb-2">
                {count}{suffix}
            </div>
            <p className="text-white/60 font-medium max-w-[200px] mx-auto leading-relaxed">
                {label}
            </p>
        </div>
    );
}
