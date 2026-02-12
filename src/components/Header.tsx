"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { parentCategories, entities } from "@/lib/data";

const categories = parentCategories.map(cat => ({
  name: cat.name,
  href: `/products?parent=${encodeURIComponent(cat.id)}`
}));

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoExists, setLogoExists] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        isScrolled
          ? "bg-white/50 shadow-sm py-2 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoExists ? (
            <div className="relative h-12 w-50 flex items-center">
              <Image
                src="/logo.png"
                alt="Clothing Nexus Logo"
                // width=[200]
                fill
                priority
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                onError={() => setLogoExists(false)}
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-navy leading-none">
                CLOTHING NEXUS
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy/60 leading-none mt-1.5 font-bold">
                Group of Companies
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-navy/80 hover:text-teal transition-colors"
          >
            Home
          </Link>
          <div className="relative group/menu">
            <button className="flex items-center gap-1 text-sm font-medium text-navy/80 group-hover/menu:text-teal transition-colors">
              Products <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full -left-4 w-64 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300">
              <div className="bg-white border border-navy/5 shadow-xl rounded-xl p-4 grid gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="text-sm text-navy/70 hover:text-teal hover:bg-teal/5 px-3 py-2 rounded-lg transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group/menu">
            <button className="flex items-center gap-1 text-sm font-medium text-navy/80 group-hover/menu:text-teal transition-colors">
              Entities <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full -left-4 w-64 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300">
              <div className="bg-white border border-navy/5 shadow-xl rounded-xl p-4 grid gap-2">
                {entities.map((entity) => (
                  <a
                    key={entity.name}
                    href={entity.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy/70 hover:text-teal hover:bg-teal/5 px-3 py-2 rounded-lg transition-all"
                  >
                    {entity.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className="text-sm font-medium text-navy/80 hover:text-teal transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-navy/80 hover:text-teal transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-navy/80 hover:text-teal transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button
            className="p-2 text-navy/60 hover:text-teal transition-colors"
            title="Search products"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
          </button> */}
          <Link
            href="/contact"
            className="bg-navy text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal transform hover:-translate-y-0.5 transition-all shadow-md active:scale-95"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-white border-t border-navy/5 md:hidden transition-all duration-300 shadow-2xl overflow-hidden",
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="p-6 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-navy"
          >
            Home
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-wider text-navy/40 font-bold">
              Products
            </span>
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setIsOpen(false)}
                className="text-navy/70 pl-2"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-wider text-navy/40 font-bold">
              Group of Companies
            </span>
            {entities.map((entity) => (
              <a
                key={entity.name}
                href={entity.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-navy/70 pl-2"
              >
                {entity.name}
              </a>
            ))}
          </div>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-navy"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-navy"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-navy text-white text-center py-3 rounded-xl font-medium mt-4"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
