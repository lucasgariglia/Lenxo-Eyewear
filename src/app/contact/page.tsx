"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import LayoutStage from '@/components/layout-stage';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.5
            });

            gsap.from(".contact-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                delay: 1
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <LayoutStage>
            <div ref={containerRef} className="min-h-screen bg-black text-white pt-40 px-6 lg:px-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5"></div>

                <div className="relative z-10 max-w-[1600px] mx-auto">
                    {/* Header */}
                    <div className="mb-20 lg:mb-32">
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] block mb-8 reveal-text">Communique</span>
                        <h1 className="font-display text-[80px] lg:text-[140px] leading-[0.8] uppercase tracking-tighter mix-blend-difference">
                            <span className="reveal-text block">Initiate</span>
                            <span className="reveal-text block italic text-white/50">Dialogue</span>
                        </h1>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
                        
                        {/* Left Column: Info */}
                        <div className="space-y-20">
                            {/* Headquarters */}
                            <div className="contact-card group">
                                <div className="flex items-center gap-4 mb-6 text-[#C5A880]">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Global HQ</span>
                                </div>
                                <h3 className="font-display text-3xl mb-4">San Francisco</h3>
                                <p className="font-sans text-sm text-white/60 leading-relaxed uppercase tracking-widest mb-6">
                                    425 Market Street, Suite 2200 <br/>
                                    San Francisco, CA 94105 <br/>
                                    United States
                                </p>
                                <a href="https://www.google.com/maps/search/?api=1&query=425+Market+Street,+San+Francisco,+CA+94105" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-[#C5A880] hover:text-white transition-colors">
                                    Get Directions <ArrowUpRight className="w-3 h-3" />
                                </a>
                            </div>

                            {/* Atelier */}
                            <div className="contact-card group">
                                <div className="flex items-center gap-4 mb-6 text-[#C5A880]">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Design Atelier</span>
                                </div>
                                <h3 className="font-display text-3xl mb-4">Tokyo</h3>
                                <p className="font-sans text-sm text-white/60 leading-relaxed uppercase tracking-widest mb-6">
                                    6-10-1 Roppongi, Minato-ku <br/>
                                    Tokyo 106-6108 <br/>
                                    Japan
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Inquiries */}
                        <div className="space-y-12">
                             <div className="contact-card p-10 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-8 text-[#C5A880]">
                                    <Mail className="w-5 h-5" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Digital Inquiry</span>
                                </div>
                                <p className="font-sans text-sm text-white/60 leading-relaxed mb-10">
                                    For general inquiries, press, and wholesale partnerships.
                                </p>
                                <a href="mailto:hello@lenxo.com" className="font-display text-4xl hover:text-[#C5A880] transition-colors">hello@lenxo.com</a>
                             </div>

                             <div className="contact-card p-10 border border-white/10 bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-8 text-[#C5A880]">
                                    <Phone className="w-5 h-5" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Concierge</span>
                                </div>
                                <p className="font-sans text-sm text-white/60 leading-relaxed mb-10">
                                    Immediate assistance for orders and sizing.
                                </p>
                                <a href="tel:+14155550123" className="font-display text-4xl hover:text-[#C5A880] transition-colors">+1 (415) 555-0123</a>
                             </div>
                        </div>
                    </div>

                     {/* Footer Note */}
                    <div className="mt-40 pt-10 border-t border-white/10 flex justify-between items-center text-white/30 font-mono text-[9px] tracking-[0.2em]">
                        <span>RESPONSE TIME: &lt; 24 HOURS</span>
                        <span>SECURE CHANNEL ENCRYPTED</span>
                    </div>
                </div>
            </div>
        </LayoutStage>
    );
}