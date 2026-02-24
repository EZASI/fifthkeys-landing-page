import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Brain, MessageSquare, Sparkles, Target,
  Calendar, TrendingUp, Users, Settings,
  ArrowRight, CheckCircle2, Play, Star,
  BarChart3, Globe, Menu, X,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface AIFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const aiFeatures: AIFeature[] = [
  {
    icon: Brain,
    title: 'AI Revenue Optimization',
    description: 'Dynamic pricing that analyzes 200+ signals in real-time',
    metric: '+35% RevPAR average increase',
  },
  {
    icon: MessageSquare,
    title: 'AI Guest Concierge',
    description: 'Handles 97% of guest queries in 100+ languages instantly',
    metric: '24/7 instant responses',
  },
  {
    icon: Sparkles,
    title: 'AI Upsell Engine',
    description: 'Personalized offers that convert 8x better than generic',
    metric: '+$67 average per stay',
  },
  {
    icon: Target,
    title: 'Predictive Operations',
    description: 'Anticipate maintenance, staffing, and inventory needs',
    metric: '-40% operational costs',
  },
];

const features: Feature[] = [
  {
    icon: Calendar,
    title: 'Reservations & Bookings',
    description: 'Manage all your bookings from one place with real-time availability and automated confirmations.',
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Revenue Management',
    description: 'Our AI analyzes 200+ market signals and adjusts rates up to 48 times daily, delivering 35% average RevPAR increases.',
  },
  {
    icon: Users,
    title: 'AI Guest Concierge',
    description: '24/7 AI concierge handles guest queries in 100+ languages with 97% resolution rate, plus personalized upselling.',
  },
  {
    icon: Settings,
    title: 'Operations Management',
    description: 'Streamline daily operations with housekeeping automation, maintenance scheduling, and staff coordination.',
  },
];

const stats = [
  { value: '10M+', label: 'AI Decisions Daily' },
  { value: '97%', label: 'Guest Query Resolution' },
  { value: '3.2x', label: 'Faster Than Human Response' },
];

// ─── Components ─────────────────────────────────────────────────────────────

const AIFeatureCard: React.FC<{ feature: AIFeature; index: number }> = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <div
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-3">{feature.description}</p>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <span className="text-emerald-400 text-xs font-bold">{feature.metric}</span>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
};

// ─── Revenue Calculator ─────────────────────────────────────────────────────

const RevenueCalculator: React.FC = () => {
  const [rooms, setRooms] = useState(150);
  const [adr, setAdr] = useState(150);
  const [propertyType, setPropertyType] = useState('Hotel');

  const occupancy = 0.75;
  const currentRevenue = rooms * adr * 365 * occupancy;
  const multiplier = propertyType === 'Resort' ? 1.40 : propertyType === 'Boutique' ? 1.38 : propertyType === 'Hostel' ? 1.30 : 1.35;
  const potentialRevenue = currentRevenue * multiplier;
  const additionalRevenue = potentialRevenue - currentRevenue;

  const formatCurrency = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-10">
      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
        <BarChart3 size={20} className="text-amber-400" />
        Revenue Impact Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">Number of Rooms</label>
            <input
              type="range" min={10} max={500} value={rooms}
              onChange={e => setRooms(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <span className="text-white font-bold text-lg">{rooms}</span>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Average Daily Rate ($)</label>
            <input
              type="range" min={50} max={500} value={adr}
              onChange={e => setAdr(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <span className="text-white font-bold text-lg">${adr}</span>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Property Type</label>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/60"
            >
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Boutique">Boutique</option>
              <option value="Hostel">Hostel</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/[0.04] border border-white/10 rounded-xl">
            <p className="text-xs text-white/40 mb-1">Current Annual Revenue</p>
            <p className="text-white font-bold text-2xl">{formatCurrency(currentRevenue)}</p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-xs text-blue-400 mb-1">Potential with FifthKeys</p>
            <p className="text-white font-bold text-2xl">{formatCurrency(potentialRevenue)}</p>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-xs text-emerald-400 mb-1">Additional Revenue</p>
            <p className="text-emerald-400 font-bold text-2xl">+{formatCurrency(additionalRevenue)}</p>
          </div>
          <button className="w-full py-3 bg-amber-400 text-black font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors">
            Get Personalized ROI Report
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Demo Form ──────────────────────────────────────────────────────────────

const DemoForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section className="py-28 border-t border-white/5 bg-[#040D1A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4">
            See FifthKeys <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">in action</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Book a personalized demo with our hospitality experts and discover how FifthKeys can transform your property operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Play size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Live Product Demo</h3>
                  <p className="text-white/50 text-sm">See all features in action with real hotel data examples</p>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Star size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Tailored to Your Property</h3>
                  <p className="text-white/50 text-sm">Custom demo based on your hotel type and specific needs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-6">Book Your Free Demo</h3>
            {formState === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
                <p className="text-white font-bold text-lg">Demo request submitted!</p>
                <p className="text-white/50 text-sm mt-2">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">First Name *</label>
                    <input required type="text" className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-400/60" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">Last Name *</label>
                    <input required type="text" className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-400/60" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Work Email *</label>
                  <input required type="email" className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-400/60" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Hotel/Company Name *</label>
                  <input required type="text" className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-400/60" />
                </div>
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full py-4 bg-amber-400 text-black font-bold rounded-xl text-sm hover:bg-amber-300 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {formState === 'loading' ? 'Submitting...' : 'Book My Free Demo'}
                  {formState !== 'loading' && <ArrowRight size={16} />}
                </button>
                <p className="text-xs text-white/30 text-center">We respect your privacy. Your information will only be used to schedule your demo.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020B18] text-white font-sans overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#020B18]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">F</div>
            <span className="font-semibold text-lg tracking-tight">FifthKeys</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="text-sm text-white/50 hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
            <a href="#demo" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
            <div className="w-px h-4 bg-white/20" />
            <button className="text-sm text-white/60 hover:text-white transition-colors">Login</button>
            <a href="#demo" className="bg-amber-400 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-300 transition-colors">
              Start Free Trial
            </a>
          </nav>

          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#020B18]/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-2">
            <a href="#features" onClick={() => setMenuOpen(false)} className="block p-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors text-sm">Features</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)} className="block p-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors text-sm">Solutions</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="block p-3 text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors text-sm">Pricing</a>
            <a href="#demo" onClick={() => setMenuOpen(false)} className="block text-center p-3 bg-amber-400 text-black rounded-xl font-bold text-sm">Start Free Trial</a>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 1,000+ Hotels Worldwide
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05] mb-6">
              <span className="text-white">The world's first</span><br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                AI-Native
              </span>{' '}
              <span className="text-white">hotel platform.</span><br />
              <span className="text-white/60 text-4xl md:text-5xl lg:text-6xl">Built for the future of hospitality.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              FifthKeys isn't just another PMS with AI features bolted on. We're the only platform built from the ground up with AI at its core — powering everything from revenue optimization to guest experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="#demo"
                className="flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-base hover:bg-amber-300 hover:scale-105 transition-all duration-200 shadow-2xl shadow-amber-500/20"
              >
                See AI in Action <ArrowRight size={18} />
              </a>
              <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={16} className="text-white ml-0.5" />
                </div>
                Watch AI Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dashboard Preview ──────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🏨</span>
                <div>
                  <h3 className="text-white font-bold">FifthKeys Dashboard</h3>
                  <p className="text-white/40 text-sm">Hotel Management System Preview</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Revenue Up 24%</p>
                  <p className="text-white/40 text-xs">This month vs. last month</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <p className="text-blue-400 text-sm font-medium mb-1">98 New Bookings</p>
                  <p className="text-white/40 text-xs">In the last 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI-Native Architecture ─────────────────────────────────────── */}
        <section id="features" className="py-28 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="text-base">🤖</span> AI-Native Architecture
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                AI that actually works{' '}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">for hotels</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                Unlike legacy systems with "AI add-ons", FifthKeys was engineered with AI from day one. Every feature is enhanced by machine learning that gets smarter with every guest interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFeatures.map((feature, i) => (
                <AIFeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Grid ──────────────────────────────────────────────── */}
        <section id="solutions" className="py-28 border-t border-white/5 bg-[#040D1A]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
                Everything you need to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">run your hotel</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                A complete property management system designed for modern hospitality
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(feature => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Revenue Calculator ──────────────────────────────────────────── */}
        <section id="pricing" className="py-28 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4">
                Calculate Your{' '}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Revenue Potential</span>
              </h2>
              <p className="text-lg text-white/50">See how much additional revenue FifthKeys could generate for your property</p>
            </div>
            <RevenueCalculator />
          </div>
        </section>

        {/* ── Demo Form ──────────────────────────────────────────────────── */}
        <div id="demo">
          <DemoForm />
        </div>

        {/* ── Final CTA ──────────────────────────────────────────────────── */}
        <section className="py-28 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 leading-tight">
              Ready to transform your{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">hotel operations?</span>
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
              Join over 1,000 hotels worldwide that trust FifthKeys to streamline their operations and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <a
                href="#demo"
                className="flex items-center gap-2 bg-amber-400 text-black px-8 py-4 rounded-full font-bold text-base hover:bg-amber-300 transition-colors shadow-2xl shadow-amber-500/20"
              >
                Start 30-Day Free Trial <ArrowRight size={18} />
              </a>
              <a href="#pricing" className="text-white/50 hover:text-white text-sm font-medium transition-colors">
                View Pricing
              </a>
            </div>
            <p className="text-xs text-white/30">No credit card required &bull; Full access to all features &bull; Cancel anytime</p>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-14 bg-[#010810]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold text-sm">F</div>
            <div>
              <span className="font-semibold text-lg tracking-tight block leading-none">FifthKeys</span>
              <span className="text-white/30 text-xs">AI-native hotel management.</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <button type="button" className="hover:text-white transition-colors">Privacy Policy</button>
            <button type="button" className="hover:text-white transition-colors">Terms of Service</button>
            <button type="button" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Globe size={12} /> English
            </button>
          </div>
          <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} FifthKeys. All rights reserved.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        ::selection { background: rgba(245,158,11,0.2); }
      `}} />
    </div>
  );
}
