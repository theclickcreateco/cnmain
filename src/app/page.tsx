import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Box,
  ShieldCheck,
  Zap,
  Globe,
  Users,
  Trophy,
  Target,
  Leaf,
  Cpu,
  Sparkles,
  Calendar,
  User,
} from "lucide-react";
import StatsCounter from "@/components/StatsCounter";
import VideoSection from "@/components/VideoSection";
import HeroCarousel from "@/components/HeroCarousel";
import { blogPosts } from "@/lib/blog-data";
import { categories } from "@/lib/data";

export default function Home() {
  const featuredCategoryIds = [
    "jeans-button",
    "rivet",
    "snap-button",
    "zipper-slider",
  ];

  const featuredCategories = categories
    .filter((cat) => featuredCategoryIds.includes(cat.id))
    .map((cat) => {
      const descriptions: Record<string, string> = {
        "jeans-button": "Durable tack & snap buttons for denim and heavy garments.",
        rivet: "High-strength metal rivets for reinforcing pocket corners and stress points.",
        "snap-button": "Precision-engineered press studs for reliable and stylish fastening.",
        "zipper-slider": "Premium metal sliders and pullers for smooth zipper operation.",
      };
      return {
        ...cat,
        description: descriptions[cat.id] || "Premium metal garment accessories.",
      };
    });

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Leading Manufacturer Since 2004
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
            Elevating Fashion with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-emerald-300">
              Premium
            </span>{" "}
            Accessories
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
            Clothing Nexus Group of Companies provides world-class metal trims
            and garment accessories. From iconic jeans buttons to
            precision-engineered zippers, we define the details that matter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-teal text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-teal/90 transform hover:-translate-y-1 transition-all shadow-xl shadow-teal/20"
            >
              Explore Collections <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="bg-navy py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-white text-white rounded-2xl flex items-center justify-center mb-6 text-3xl">
              🏭
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Innovative Manufacturing
            </h3>
            <p className="text-white/60 leading-relaxed">
              Revolutionizing the industry with advanced technology and
              streamlined processes for excellence.
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-white text-white rounded-2xl flex items-center justify-center mb-6 text-3xl">
              🌍
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Global Partnerships
            </h3>
            <p className="text-white/60 leading-relaxed">
              Building strong relationships worldwide to ensure consistent
              quality and innovation in every product we deliver.
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-white text-white rounded-2xl flex items-center justify-center mb-6 text-3xl">
              🌱
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Eco-Driven Solutions
            </h3>
            <p className="text-white/60 leading-relaxed">
              Combining creativity and responsibility to design products that
              support a sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Elevating Industries Image/Video Section */}
      <VideoSection />

      {/* Stats Section */}
      <section className="bg-navy py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Business strategies and top performance ideas
            </h2>
            <p className="text-white/60 text-lg">
              Our approach thrives at the intersection between data-driven
              market research and traditional management consultancies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StatsCounter
              end={55}
              label="People who are commited to their management tasks."
              icon={<Users className="w-10 h-10" />}
            />
            <StatsCounter
              end={193}
              label="Signed projects that have been confirmed complete!"
              icon={<Target className="w-10 h-10" />}
            />
            <StatsCounter
              end={82}
              label="International awards and cups for design projects."
              icon={<Trophy className="w-10 h-10" />}
            />
          </div>
        </div>
      </section>

      {/* Expertise in Business (Entities) */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-navy">
            Expertise in business
          </h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            Our approach thrives at the intersection between data-driven market
            research and traditional management consultancies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "CN Apparel",
              desc: "Providing premium, sustainable apparel solutions designed to meet modern ethical standards worldwide.",
              icon: <Zap className="w-8 h-8 text-blue-500" />,
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
              link: "https://cn-apparels.com",
            },
            {
              title: "CN Packaging",
              desc: "We deliver innovative, eco-conscious packaging solutions tailored to meet industry-specific needs.",
              icon: <Box className="w-8 h-8 text-purple-500" />,
              bg: "bg-purple-500/10",
              border: "border-purple-500/20",
              link: "https://cnpackages.com",
            },
            {
              title: "CN IT Solutions",
              desc: "Providing cutting-edge IT solutions, including software development, UI/UX design, and digital transformation.",
              icon: <Cpu className="w-8 h-8 text-emerald-500" />,
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
              link: "https://cnitsolutions.com",
            },
            {
              title: "CN Fragrances",
              desc: "Premium fragrance solutions that complement the lifestyle of modern luxury and elegance.",
              icon: <Sparkles className="w-8 h-8 text-rose-500" />,
              bg: "bg-rose-500/10",
              border: "border-rose-500/20",
              link: "https://cnfragrances.com",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-8 rounded-[32px] ${item.bg} border ${item.border} hover:shadow-xl transition-all group flex flex-col`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">
                {item.title}
              </h3>
              <p className="text-navy/60 leading-relaxed mb-8 flex-grow">
                {item.desc}
              </p>
              {item.link !== "#" && (
                <Link
                  href={item.link}
                  className="flex items-center gap-2 text-navy font-bold text-sm hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4 text-teal" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar (Preserved) */}
      <section className="bg-navy/5 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale">
          {/* Placeholders for logos mentioned in the search */}
          <span className="text-2xl font-black italic">ASIAN</span>
          <span className="text-2xl font-black italic">EUROPE</span>
          <span className="text-2xl font-black italic">N.AMERICA</span>
          <span className="text-2xl font-black italic">MIDDLE EAST</span>
          <span className="text-2xl font-black italic">S.E. ASIA</span>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="bg-slate-50 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-navy">Latest Insights</h2>
              <p className="text-navy/50 max-w-md">
                Stay updated with the latest trends, industrial news, and
                manufacturing excellence.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-teal font-bold flex items-center gap-2 group"
            >
              View All Articles{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post: any, i: number) => (
              <article
                key={i}
                className="group bg-white rounded-[32px] overflow-hidden border border-navy/5 flex flex-col hover:shadow-xl transition-all h-full"
              >
                <div className="aspect-[16/10] bg-navy/5 relative flex items-center justify-center overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500 opacity-20">
                    📰
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-navy/30 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-navy/50 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-navy font-bold text-xs flex items-center gap-2 group/btn"
                    >
                      Read Article{" "}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-teal" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-navy">
              Featured Categories
            </h2>
            <p className="text-navy/50 max-w-md">
              Discover our wide range of premium metal garment accessories
              tailored for excellence.
            </p>
          </div>
          <Link
            href="/products"
            className="text-teal font-bold flex items-center gap-2 group"
          >
            View All Products{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((cat, i) => {
            return (
              <Link
                key={i}
                href={`/products?category=${cat.id}`}
                className="group bg-white border border-navy/5 p-8 rounded-[32px] hover:border-teal/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                <div className="w-20 h-20 bg-navy/5 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:bg-teal group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                  {cat.name}
                </h3>
                <p className="text-navy/50 text-base leading-relaxed mb-8 flex-grow">
                  {cat.description}
                </p>
                <div className="flex items-center gap-3 text-teal font-bold text-sm">
                  <span>Explore</span>
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
