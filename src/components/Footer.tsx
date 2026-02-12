"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";
import { parentCategories, entities } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoExists, setLogoExists] = useState(true);

  return (
    <footer className="bg-navy text-white/90 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            {logoExists ? (
              <div className="relative h-12 w-50 flex items-center">
                <Image
                  src="/logo.png"
                  alt="Clothing Nexus Logo"
                  // width=[200]
                  fill
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300 filter brightness-0 invert"
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
          <p className="text-white/60 text-sm leading-relaxed">
            A global leader in sustainable trims and accessories. Elevating
            industries through innovation and eco-conscious processes.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-navy transition-all"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-navy transition-all"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-navy transition-all"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-navy transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/" className="hover:text-teal transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-teal transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-teal transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-teal transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-6">Categories</h4>
          <ul className="space-y-4 text-sm">
            {parentCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/products?parent=${encodeURIComponent(cat.id)}`}
                  className="hover:text-teal transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Entities */}
        <div>
          <h4 className="text-white font-semibold mb-6">Group Entities</h4>
          <ul className="space-y-4 text-sm">
            {entities.map((entity) => (
              <li key={entity.name}>
                <a
                  href={entity.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  {entity.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-semibold mb-6">Global Offices</h4>
          <ul className="space-y-6 text-sm">
            <li className="space-y-1">
              <div className="flex items-center gap-2 text-teal font-bold uppercase text-[10px] tracking-widest">
                <Globe className="w-3 h-3" /> USA (HQ)
              </div>
              <span className="text-white/60 leading-relaxed block">
                6200 Savoy Drive, Suite #495,
                <br />
                Houston Texas
              </span>
            </li>
            <li className="space-y-1">
              <div className="flex items-center gap-2 text-teal font-bold uppercase text-[10px] tracking-widest">
                <MapPin className="w-3 h-3" /> China
              </div>
              <span className="text-white/60 leading-relaxed block">
                Huizhou City, Guangdong Province
              </span>
            </li>
            <li className="space-y-1">
              <div className="flex items-center gap-2 text-teal font-bold uppercase text-[10px] tracking-widest">
                <Phone className="w-3 h-3" /> Pakistan
              </div>
              <span className="text-white/60 leading-relaxed block">
                Suite# 12 Rafi Mansion, Karachi
              </span>
            </li>
            <li className="pt-2 border-t border-white/5">
              <Link
                href="/contact"
                className="flex items-center gap-3 text-white/60 hover:text-teal transition-colors"
              >
                <Mail className="w-4 h-4" /> info@clothingnexus.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>
          © {currentYear} Clothing Nexus Group of Companies. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-white transition-colors">
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
