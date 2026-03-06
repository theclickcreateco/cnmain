import React from 'react';
import { Target, Users, Award, ShieldCheck, Briefcase, Globe, Phone } from 'lucide-react';
import Link from 'next/link';
import { entities } from '@/lib/data';

const managingDirector = {
    name: 'Saud Farooqui',
    role: 'Managing Director',
    image: '/team-members/saud-farooqui.webp'
};

const teamMembers = [
    { name: 'Muneeb Ahmed', role: 'Managing Partner', image: '/team-members/muneeb-ahmed.jpeg' },
    { name: 'Owais Siddiqui', role: 'Managing Partner', image: '/team-members/owais-siddiqui.webp' },
    { name: 'Kashif Feroz', role: 'Managing Partner', image: '/team-members/owais-siddiqui.webp' },
    { name: 'Muhammad Huzaifa', role: 'Managing Partner IT', image: '/team-members/muhammad-huzaifa.webp' },
];

const marketSales = [
    { name: 'Adnan', category: 'GM Marketing & Sales', image: '/team-members/adnan-cn.png' },
    { name: 'Faraz Jafri', category: 'Manager Merchandiser', image: '/team-members/adnan-cn.png' },
    { name: 'Waqas Jafri', category: 'Manager Operations', image: '/team-members/waqas-cn.png' },
    { name: 'Osama Ahmed', category: 'Sales Executive', image: '/team-members/usama-cn.png' },
    { name: 'Tanveer Shah', category: 'Sales Executive', image: '/team-members/tanveer-cn.png' },
    { name: 'Haris Ahmed', category: 'Sales Executive', image: '/team-members/tanveer-cn.png' },
    { name: 'Ibrahim Sultan', category: 'Asst. Merchandiser', image: '/team-members/ahadi-cn.png' },
    { name: 'Arham Ahmed Siddiqui', category: 'Asst. Merchandiser', image: '/team-members/arham-cn.png' },
    { name: 'Muhamamd Ali Siddiqui', category: 'Asst. Merchandiser', image: '/team-members/ali-cn.png' },
    { name: 'Abdul Hadi', category: 'Asst. Merchandiser', image: '/team-members/ahadi-cn.png' },
];

const adminTeam = [
    { name: 'S.M.Faisal Farooqui', category: 'Director Admin / HR', image: '/team-members/faisal-cn.png' },
    { name: 'Mehmood Khan', category: 'Manager Accounts', image: '/team-members/mehmood-cn.png' },
];

const TeamCard = ({ name, role, image }: { name: string, role?: string, image: string }) => (
    <div className="group relative flex flex-col bg-white rounded-[24px] p-2 border border-navy/5 hover:border-teal/20 hover:bg-teal/5 shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
        <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden mb-4 bg-navy/5">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[20px]"></div>
        </div>
        <div className="text-center px-2 pb-2 flex-1 flex flex-col justify-end">
            <h3 className="text-[15px] leading-tight font-bold text-navy tracking-wide mb-1 opacity-90">{name}</h3>
            <p className="text-[11px] text-teal font-semibold tracking-wider uppercase">{role}</p>
        </div>
    </div>
);

export default function AboutPage() {
    return (
        <div className="pb-24">
            {/* Header */}
            <section className="bg-navy text-white pt-32 pb-24 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Leading the Way in Sustainable Innovation!</h1>
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                        Clothing Nexus is a global leader in sustainable trims and accessories, representing Honyip Metal Products, China. With a focus on eco-friendly and innovative solutions, we specialize in providing metal, plastic, and wooden trims made from both conventional and recycled materials.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[40px] bg-gradient-to-br from-teal/5 to-teal/10 border border-teal/10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-teal text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-bold text-navy">Our Mission</h2>
                            <p className="text-navy/60 text-lg leading-relaxed">
                                To deliver sustainable, high-quality trims and accessories that empower the fashion and manufacturing sectors, promoting environmentally responsible practices through innovation and excellence.
                            </p>
                        </div>
                    </div>

                    <div className="p-10 rounded-[40px] bg-gradient-to-br from-navy/5 to-navy/10 border border-navy/10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Award className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-bold text-navy">Our Vision</h2>
                            <p className="text-navy/60 text-lg leading-relaxed">
                                To be the global benchmark for sustainability and innovation in the trims and accessories industry, inspiring transformative change toward a greener future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Entities */}
            <section className="bg-navy py-24 px-4 overflow-hidden relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Our Group Entities</h2>
                        <p className="text-white/50">Exploring diverse industries with the same commitment to excellence.</p>
                    </div>
                    <div className="grid lg:grid-cols-4 gap-8">
                        {entities.map((entity, i) => (
                            <a
                                key={i}
                                href={entity.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group flex flex-col items-center text-center"
                            >
                                <div className={`w-12 h-12 ${entity.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{entity.name}</h3>
                                <p className="text-white/40 text-sm mb-6">{entity.href.replace('https://', '')}</p>
                                <span className="text-teal font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                    Visit Website <Briefcase className="w-4 h-4" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-[90rem] mx-auto px-4 py-24 space-y-32">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight">Our Dedicated Team</h2>
                    <p className="text-navy/60 text-lg leading-relaxed">
                        The creative minds and strategic thinkers driving our daily operations and customer success.
                    </p>
                </div>

                {/* Managing Director */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-navy/80 font-serif">Leadership</h3>
                        <div className="w-12 h-1 bg-teal mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                            <TeamCard name={managingDirector.name} role={managingDirector.role} image={managingDirector.image} />
                        </div>
                    </div>
                </div>

                {/* Managing Partners */}
                <div className="space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {teamMembers.map((member, i) => (
                            <TeamCard key={i} name={member.name} role={member.role} image={member.image} />
                        ))}
                    </div>
                </div>

                {/* Marketing & Sales */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-navy/80 font-serif">Marketing & Sales</h3>
                        <div className="w-12 h-1 bg-teal mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {marketSales.map((member, i) => (
                            <TeamCard key={i} name={member.name} role={member.category} image={member.image} />
                        ))}
                    </div>
                </div>

                {/* Admin / HR */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-navy/80 font-serif">Administration & HR</h3>
                        <div className="w-12 h-1 bg-teal mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="flex justify-center gap-6 flex-wrap">
                        {adminTeam.map((member, i) => (
                            <div key={i} className="w-full max-w-[16rem]">
                                <TeamCard name={member.name} role={member.category} image={member.image} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 bg-teal rounded-[40px] p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-3xl font-bold">Looking for business opportunity?</h3>
                        <p className="text-xl opacity-90 font-medium">Request for a call today.</p>
                        <button className="bg-white text-teal px-10 py-4 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto">
                            <Phone className="w-5 h-5" /> Contact Us
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
                </div>
            </section>

            {/* Values */}
            <section className="bg-navy/5 py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-navy">Our Core Pillars</h2>
                        <p className="text-navy/50 max-w-2xl mx-auto">The principles that guide every trim we create and every partnership we foster.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Sustainability', desc: 'Focusing on eco-friendly materials and ethical production processes.', icon: <Award className="w-8 h-8" /> },
                            { title: 'Innovation', desc: 'Expertise in metal, plastic, and wooden trims from recycled materials.', icon: <Target className="w-8 h-8" /> },
                            { title: 'Global Reach', desc: 'Dedicated support via offices in USA, China, and Pakistan.', icon: <Users className="w-8 h-8" /> },
                        ].map((value, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-navy/5">
                                <div className="w-16 h-16 bg-teal/10 text-teal rounded-2xl flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-navy mb-4">{value.title}</h3>
                                <p className="text-navy/50 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="space-y-4 mb-16">
                    <h2 className="text-4xl font-bold text-navy">Certified Excellence & Trusted Partnerships</h2>
                    <p className="text-navy/60 max-w-2xl mx-auto">Clothing Nexus is proud to uphold international standards of sustainability and quality.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60">
                    <div className="h-20 bg-navy/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-dashed border-navy/20">
                        <span className="font-bold text-navy/40">PARTNER 1</span>
                    </div>
                    <div className="h-20 bg-navy/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-dashed border-navy/20">
                        <span className="font-bold text-navy/40">PARTNER 2</span>
                    </div>
                    <div className="h-20 bg-navy/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-dashed border-navy/20">
                        <span className="font-bold text-navy/40">PARTNER 3</span>
                    </div>
                    <div className="h-20 bg-navy/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-dashed border-navy/20">
                        <span className="font-bold text-navy/40">PARTNER 4</span>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-8 mt-24">
                    <ShieldCheck className="w-16 h-16 text-teal mx-auto" />
                    <h2 className="text-3xl font-bold text-navy text-center">Global Standards Compliance</h2>
                    <p className="text-navy/60 leading-relaxed italic border-l-4 border-teal pl-6 text-left">
                        "We test all of our products to meet restricted substance standards in the U.S. Our products are developed to withstand home laundered washes. Our factories have been audited by some of the largest brands in the world."
                    </p>
                    <p className="text-navy/40 text-sm">
                        Nickel-Free · Lead-Free · AZO-Free · Phthalates-Free · ISO 9001:2008
                    </p>
                </div>
            </section>
        </div>
    );
}
