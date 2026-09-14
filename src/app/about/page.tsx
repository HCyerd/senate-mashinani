'use client';

import React, { useState, useEffect, useRef } from 'react';
// Using lucide-react for icons as an alternative to phosphor for standard React projects
import { 
    Users, 
    ArrowDown, 
    MapPin, 
    CalendarCheck, 
    Handshake, 
    Target, 
    Eye, 
    Scale, 
    Search, 
    MessageSquare, 
    CalendarPlus,
    Sun,
    Moon
} from 'lucide-react';

export default function AboutPage() {
    // --- State & Refs ---
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        setMounted(true);
        
        // Initial check
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);

        // Set up a MutationObserver to watch for class changes on the html element
        // This allows external navbars to toggle the theme and have this component react
        const htmlObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isNowDark = document.documentElement.classList.contains('dark');
                    setIsDarkMode(isNowDark);
                }
            });
        });

        htmlObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            htmlObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const revealElements = document.querySelectorAll('.reveal');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observerRef.current?.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            observerRef.current?.observe(el);
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [mounted]);

    // In a real Next.js app, this would be in tailwind.config.ts and globals.css
    // We include it here to ensure the single-file works perfectly.
    const customStyles = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        .dark .glow-effect {
            box-shadow: 0 0 40px -10px rgba(199, 172, 70, 0.15); /* Gold glow */
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }

        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }

        /* Using inline styles for colors to simulate the custom Tailwind config from previous step */
        :root {
            --brand-50: #f0f4f8;
            --brand-100: #d9e2ec;
            --brand-400: #486581;
            --brand-500: #2A3C7D;
            --brand-600: #1e2b5e;
            --brand-900: #0f1630;
            --brand-950: #070b18;
            
            --accent-100: #fcf3c7;
            --accent-400: #ead252;
            --accent-500: #C7AC46;
            --accent-600: #a38b34;
        }
    `;

    return (
        <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#2A3C7D] selection:text-white ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <title>About - Parliamentary Service Commission</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
                {/* Background Image with Low Opacity */}
                {/* Note: You can replace the URL below with a local image path like '/parliament_building.jpg' */}
                <div 
                    className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-[0.05] mix-blend-luminosity transition-opacity duration-500"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=2070&auto=format&fit=crop')" }}
                ></div>

                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob bg-[#2A3C7D]/10 dark:bg-[#2A3C7D]/20"></div>
                    <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 bg-[#C7AC46]/10 dark:bg-[#C7AC46]/20"></div>
                    <div className="absolute bottom-[10%] left-[30%] w-96 h-96 bg-slate-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-slate-700/20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        
                        {/* Left: Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border text-sm font-semibold tracking-wide uppercase mb-8 reveal bg-[#f0f4f8] border-[#d9e2ec] text-[#0f1630] dark:bg-[#070b18] dark:border-[#0f1630] dark:text-[#d9e2ec]">
                                <Scale className="text-[#C7AC46]" size={18} />
                                Constitutional Body
                            </span>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 reveal delay-100 leading-tight">
                                Parliamentary <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A3C7D] to-[#C7AC46] dark:from-[#486581] dark:to-[#ead252]">Service Commission</span>
                            </h1>
                            
                            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 reveal delay-200 leading-relaxed">
                                Established under Article 127 of the Constitution of Kenya, 2010 to provide services and facilities that ensure the efficient and effective functioning of Parliament.
                            </p>
                            
                            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 reveal delay-300">
                                <a href="#mission" className="px-8 py-4 rounded-full bg-[#2A3C7D] text-white font-medium hover:bg-[#1e2b5e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                                    <span>Discover Our Mandate</span>
                                    <ArrowDown size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Right: Logo Graphic */}
                        <div className="flex-1 w-full max-w-md mx-auto lg:max-w-none relative reveal delay-200">
                            <div className="relative w-full aspect-square flex items-center justify-center">
                                {/* Decorative circles behind logo */}
                                <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-800 animate-[spin_60s_linear_infinite]"></div>
                                <div className="absolute inset-10 rounded-full border border-dashed border-[#d9e2ec] dark:border-[#0f1630] animate-[spin_40s_linear_infinite_reverse]"></div>
                                
                                {/* Logo container */}
                               
                                    <img src="/sessions_images/parliament.png" alt="Parliament of Kenya Emblem" className="w-full h-auto object-contain drop-shadow-md rounded-full" />
                                
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {}
            <section className="py-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-700">
                        <div className="reveal">
                            <div className="flex items-center justify-center mb-2 text-[#C7AC46]"><Users size={28} /></div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white mb-1 mt-3">National Assembly</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Service</p>
                        </div>
                        <div className="reveal delay-100">
                            <div className="flex items-center justify-center mb-2 text-[#2A3C7D]"><Users size={28} /></div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white mb-1 mt-3">The Senate</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Service</p>
                        </div>
                        <div className="reveal delay-200">
                            <div className="flex items-center justify-center mb-2 text-[#C7AC46]"><Handshake size={28} /></div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white mb-1 mt-3">Joint Services</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Administration</p>
                        </div>
                        <div className="reveal delay-300">
                            <div className="flex items-center justify-center mb-2 text-[#2A3C7D]"><Target size={28} /></div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white mb-1 mt-3">CPST</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Training & Studies</p>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section id="mission" className="py-24 relative bg-slate-50 dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 reveal">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Our Driving Force</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-[#2A3C7D] to-[#C7AC46] mx-auto rounded-full mb-8"></div>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            The Parliamentary Service Commission strives to serve members of Parliament, employees, and the public by providing quality, impartial and efficient services anchored on the values and principles enshrined in the Constitution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 reveal delay-100">
                        {/* Vision Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7AC46]/10 rounded-bl-full transition-transform group-hover:scale-110"></div>

                            <div className="w-16 h-16 rounded-2xl bg-[#fcf3c7] dark:bg-[#a38b34]/20 flex items-center justify-center text-[#C7AC46] mb-6 relative z-10 border border-[#ead252]/30 dark:border-[#a38b34]/30">
                                <Eye size={32} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-2xl mb-4 relative z-10">Vision</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed relative z-10">
                                "Democratic and people centred Parliament."
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A3C7D]/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-[#f0f4f8] dark:bg-[#0f1630]/30 flex items-center justify-center text-[#2A3C7D] mb-6 relative z-10 border border-[#d9e2ec] dark:border-[#0f1630]/50">
                                <Target size={32} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-2xl mb-4 relative z-10">Mission</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed relative z-10">
                                "To facilitate the Members of Parliament to efficiently and effectively discharge their constitutional mandate of representation, legislation and oversight."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 reveal">
                        <span className="text-[#2A3C7D] dark:text-[#486581] font-semibold tracking-wider uppercase text-sm mb-2 block">Foundation</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">The Parliamentary Service is committed to upholding the following core values in the discharge of its mandate.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#486581] dark:hover:border-[#486581] transition-all duration-300 group reveal">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2A3C7D] shadow-sm mb-6 group-hover:bg-[#2A3C7D] group-hover:text-white transition-colors duration-300">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Professionalism</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall maintain a high level of competence and team work in our work.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#ead252] dark:hover:border-[#a38b34] transition-all duration-300 group reveal delay-100">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#C7AC46] shadow-sm mb-6 group-hover:bg-[#C7AC46] group-hover:text-white transition-colors duration-300">
                                <Scale size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Impartiality</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall remain objective and non-partisan in the delivery of service.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#486581] dark:hover:border-[#486581] transition-all duration-300 group reveal delay-200">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2A3C7D] shadow-sm mb-6 group-hover:bg-[#2A3C7D] group-hover:text-white transition-colors duration-300">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Responsiveness</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall be customer focused and provide high quality service in a timely and reliable manner.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#ead252] dark:hover:border-[#a38b34] transition-all duration-300 group reveal">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#C7AC46] shadow-sm mb-6 group-hover:bg-[#C7AC46] group-hover:text-white transition-colors duration-300">
                                <Search size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Integrity & Accountability</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall maintain the highest level of ethics, transparency and accountability in discharging our duties.
                            </p>
                        </div>

                        {/* Value 5 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#486581] dark:hover:border-[#486581] transition-all duration-300 group reveal delay-100">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#2A3C7D] shadow-sm mb-6 group-hover:bg-[#2A3C7D] group-hover:text-white transition-colors duration-300">
                                <Handshake size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Cooperation & Consultation</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall maintain the spirit of cooperation based on consultation and communication.
                            </p>
                        </div>

                        {/* Value 6 */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800 hover:border-[#ead252] dark:hover:border-[#a38b34] transition-all duration-300 group reveal delay-200">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[#C7AC46] shadow-sm mb-6 group-hover:bg-[#C7AC46] group-hover:text-white transition-colors duration-300">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Inclusiveness</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We shall recognize diverse backgrounds to promote National integration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section className="py-20 relative overflow-hidden bg-[#0f1630]">
                {/* Decorative subtle pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
                
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center reveal">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Functions</h2>
                    <p className="text-[#d9e2ec] text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                        As set out in Article 127(6) of the Constitution, the PSC is mandated to provide services and facilities, constitute offices in the Parliamentary Service, exercise budgetary control, and undertake programmes to promote the ideals of Parliamentary democracy.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C7AC46] text-[#0f1630] font-bold hover:bg-[#ead252] transition-colors shadow-lg hover:shadow-xl">
                            <span>Read the Full Mandate</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}