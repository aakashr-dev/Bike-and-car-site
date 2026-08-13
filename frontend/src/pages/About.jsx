import React from 'react';
import HeroSection from '../components/HeroSection';
import { ShieldCheck, Award, Users, Wrench, Flame, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            THE AUTOMOTIVE <span className="text-[#ff5500]">VAULT</span>
          </>
        }
        subtitle="Built by automobile enthusiasts for riders and drivers who refuse to compromise on transparency and performance."
        badgeText="ABOUT RPM VAULT"
        backgroundImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80"
        breadcrumbs={[{ label: 'About Us' }]}
        primaryCtaText="EXPLORE INVENTORY"
        primaryCtaLink="/bikes"
      />

      {/* STORY & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#ff5500] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30">
              OUR HERITAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-['Outfit'] leading-tight">
              REDEFINING PRE-OWNED VEHICLE TRUST SINCE 2018
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              RPM Vault was founded with a singular mission: eliminate the guesswork, shady broker commissions, and undisclosed accident histories from the used car and motorcycle marketplace.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every bike and car featured in our inventory undergoes a rigorous 200+ point mechanical, electronic, and chassis inspection conducted by master certified technicians.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-3xl font-black text-[#ff5500] font-['Outfit']">5,400+</span>
                <span className="text-xs text-gray-400 block font-semibold">Vehicles Delivered</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#ff5500] font-['Outfit']">200+</span>
                <span className="text-xs text-gray-400 block font-semibold">Inspection Checks</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="RPM Garage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-[#141418]/60 border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-white uppercase font-['Outfit']">
              THE VAULT PROMISE
            </h2>
            <p className="text-gray-400 text-sm">Four pillars of excellence behind every vehicle sale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#ff5500]" />
              <h4 className="font-extrabold text-white text-base font-['Outfit']">100% Non-Accidental</h4>
              <p className="text-xs text-gray-400">Strict zero-tolerance policy for structural flood or major accident damage.</p>
            </div>

            <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl space-y-3">
              <Wrench className="w-8 h-8 text-[#ff5500]" />
              <h4 className="font-extrabold text-white text-base font-['Outfit']">Free Engine Warranty</h4>
              <p className="text-xs text-gray-400">6 months coverage on engine and gearbox components included free.</p>
            </div>

            <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl space-y-3">
              <Users className="w-8 h-8 text-[#ff5500]" />
              <h4 className="font-extrabold text-white text-base font-['Outfit']">Verified Owners</h4>
              <p className="text-xs text-gray-400">RTO ownership records and RC documents 100% verified before listing.</p>
            </div>

            <div className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl space-y-3">
              <Award className="w-8 h-8 text-[#ff5500]" />
              <h4 className="font-extrabold text-white text-base font-['Outfit']">7-Day Return Policy</h4>
              <p className="text-xs text-gray-400">Love your machine or return it within 7 days for a 100% money back guarantee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
