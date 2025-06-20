import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  PlayCircle, 
  Brain, 
  MessageSquare, 
  Target, 
  Calendar,
  TrendingUp,
  Users,
  Settings,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Calculator,
  Video,
  MessageCircle,
  ArrowUp
} from 'lucide-react';
import './App.css';

interface StatItem {
  value: string;
  label: string;
}

interface AIFeature {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  metric: string;
}

interface Feature {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

interface DemoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  rooms: string;
  propertyType: string;
  currentSystem: string;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [calculatorInputs, setCalculatorInputs] = useState({
    rooms: 50,
    avgRate: 150,
    propertyType: 'hotel'
  });
  
  const [demoForm, setDemoForm] = useState<DemoFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    rooms: '',
    propertyType: '',
    currentSystem: ''
  });

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ROI Calculator logic
  const calculateROI = () => {
    const { rooms, avgRate, propertyType } = calculatorInputs;
    const occupancyRate = 0.75; // 75% average occupancy
    const currentRevenue = rooms * avgRate * 365 * occupancyRate;
    
    let improvementFactor = 1.35; // Base 35% improvement
    if (propertyType === 'resort') improvementFactor = 1.45;
    if (propertyType === 'boutique') improvementFactor = 1.40;
    if (propertyType === 'hostel') improvementFactor = 1.30;
    
    const potentialRevenue = currentRevenue * improvementFactor;
    const additionalRevenue = potentialRevenue - currentRevenue;
    
    return {
      current: currentRevenue,
      potential: potentialRevenue,
      additional: additionalRevenue
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const roi = calculateROI();

  // Hero stats data
  const heroStats: StatItem[] = [
    { value: '10M+', label: 'AI Decisions Daily' },
    { value: '97%', label: 'Guest Query Resolution' },
    { value: '3.2x', label: 'Faster Than Human Response' }
  ];

  // AI Features data
  const aiFeatures: AIFeature[] = [
    {
      icon: Brain,
      title: 'AI Revenue Optimization',
      description: 'Dynamic pricing that analyzes 200+ signals in real-time',
      metric: '+35% RevPAR average increase'
    },
    {
      icon: MessageSquare,
      title: 'AI Guest Concierge',
      description: 'Handles 97% of guest queries in 100+ languages instantly',
      metric: '24/7 instant responses'
    },
    {
      icon: Sparkles,
      title: 'AI Upsell Engine',
      description: 'Personalized offers that convert 8x better than generic',
      metric: '+$67 average per stay'
    },
    {
      icon: Target,
      title: 'Predictive Operations',
      description: 'Anticipate maintenance, staffing, and inventory needs',
      metric: '-40% operational costs'
    }
  ];

  // Core features data
  const features: Feature[] = [
    {
      icon: Calendar,
      title: 'Reservations & Bookings',
      description: 'Manage all your bookings from one place with real-time availability and automated confirmations.'
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Revenue Management',
      description: 'Our AI analyzes 200+ market signals and adjusts rates up to 48 times daily, delivering 35% average RevPAR increases.'
    },
    {
      icon: Users,
      title: 'AI Guest Concierge',
      description: '24/7 AI concierge handles guest queries in 100+ languages with 97% resolution rate, plus personalized upselling.'
    },
    {
      icon: Settings,
      title: 'Operations Management',
      description: 'Streamline daily operations with housekeeping automation, maintenance scheduling, and staff coordination.'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Demo form submitted:', demoForm);
    alert('Thank you! We\'ll contact you soon to schedule your demo.');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <span className="logo-text">FifthKeys</span>
              </a>
            </div>
            
            <nav className="main-nav">
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#solutions">Solutions</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>

            <div className="header-right">
              <a href="#" className="btn btn-outline">Login</a>
              <a href="#" className="btn btn-primary">Start Free Trial</a>
              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div 
          className="mobile-nav"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <nav>
            <ul>
              <li><a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
              <li><a href="#solutions" onClick={() => setIsMobileMenuOpen(false)}>Solutions</a></li>
              <li><a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a></li>
              <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Trusted by 1,000+ Hotels Worldwide
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="line">The world's first</span>
              <span className="line"><span className="highlight">AI-Native</span> hotel platform.</span>
              <span className="line">Built for the future of hospitality.</span>
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              FifthKeys isn't just another PMS with AI features bolted on. We're the only platform 
              built from the ground up with AI at its core - powering everything from revenue 
              optimization to guest experiences.
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="#demo-booking" className="btn btn-primary btn-lg">
                See AI in Action
                <Sparkles size={20} />
              </a>
              <a href="#ai-demo" className="btn btn-outline btn-lg">
                Watch AI Demo
                <PlayCircle size={20} />
              </a>
            </motion.div>
            
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="dashboard-preview">
              <div className="dashboard-placeholder">
                <div className="dashboard-content">
                  <div className="dashboard-title">🏨 FifthKeys Dashboard</div>
                  <div className="dashboard-subtitle">Hotel Management System Preview</div>
                </div>
              </div>
              
              <motion.div 
                className="floating-card card-1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="card-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="card-content">
                  <h4>Revenue Up 24%</h4>
                  <p>This month vs. last month</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="floating-card card-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="card-icon">
                  <Users size={20} />
                </div>
                <div className="card-content">
                  <h4>98 New Bookings</h4>
                  <p>In the last 24 hours</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="ai-features-showcase">
        <div className="container">
          <div className="badge">🤖 AI-Native Architecture</div>
          <h2 className="section-title">AI that actually works for hotels</h2>
          <p className="section-subtitle">
            Unlike legacy systems with "AI add-ons", FifthKeys was engineered with AI 
            from day one. Every feature is enhanced by machine learning that gets 
            smarter with every guest interaction.
          </p>
          
          <div className="ai-features-grid">
            {aiFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="ai-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="ai-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="ai-metric">{feature.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-overview" id="features">
        <div className="container">
          <h2 className="section-title">Everything you need to run your hotel</h2>
          <p className="section-subtitle">A complete property management system designed for modern hospitality</p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="calculator-section" id="roi-calculator">
        <div className="container">
          <div className="calculator-content">
            <div className="calculator-info">
              <h2 className="section-title">Calculate Your Revenue Potential</h2>
              <p className="section-subtitle">See how much additional revenue FifthKeys could generate for your property</p>
            </div>
            
            <div className="calculator-widget">
              <div className="calculator-card">
                <h3>Revenue Impact Calculator</h3>
                <div className="calculator-inputs">
                  <div className="input-group">
                    <label htmlFor="rooms">Number of Rooms</label>
                    <input 
                      type="number" 
                      id="rooms" 
                      value={calculatorInputs.rooms}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, rooms: parseInt(e.target.value) || 0})}
                      min="1" 
                      max="1000"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="avgRate">Average Daily Rate ($)</label>
                    <input 
                      type="number" 
                      id="avgRate" 
                      value={calculatorInputs.avgRate}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, avgRate: parseInt(e.target.value) || 0})}
                      min="50" 
                      max="1000"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="propertyType">Property Type</label>
                    <select 
                      id="propertyType"
                      value={calculatorInputs.propertyType}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, propertyType: e.target.value})}
                    >
                      <option value="hotel">Hotel</option>
                      <option value="resort">Resort</option>
                      <option value="boutique">Boutique</option>
                      <option value="hostel">Hostel</option>
                    </select>
                  </div>
                </div>
                
                <div className="calculator-results">
                  <div className="result-item">
                    <span className="result-label">Current Annual Revenue</span>
                    <span className="result-value">{formatCurrency(roi.current)}</span>
                  </div>
                  <div className="result-item highlight">
                    <span className="result-label">Potential with FifthKeys</span>
                    <span className="result-value">{formatCurrency(roi.potential)}</span>
                  </div>
                  <div className="result-item success">
                    <span className="result-label">Additional Revenue</span>
                    <span className="result-value">+{formatCurrency(roi.additional)}</span>
                  </div>
                </div>
                
                <div className="calculator-cta">
                  <button className="btn btn-primary btn-block">
                    Get Personalized ROI Report
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Section */}
      <section className="demo-booking-section" id="demo-booking">
        <div className="container">
          <div className="demo-content">
            <div className="demo-info">
              <h2>See FifthKeys in action</h2>
              <p className="lead">Book a personalized demo with our hospitality experts and discover how FifthKeys can transform your property operations.</p>
              
              <div className="demo-benefits">
                <div className="demo-benefit">
                  <Video size={24} />
                  <div>
                    <h4>Live Product Demo</h4>
                    <p>See all features in action with real hotel data examples</p>
                  </div>
                </div>
                <div className="demo-benefit">
                  <Target size={24} />
                  <div>
                    <h4>Tailored to Your Property</h4>
                    <p>Custom demo based on your hotel type and specific needs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="demo-form-container">
              <form onSubmit={handleDemoFormSubmit} className="demo-form">
                <h3>Book Your Free Demo</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      value={demoForm.firstName}
                      onChange={(e) => setDemoForm({...demoForm, firstName: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      value={demoForm.lastName}
                      onChange={(e) => setDemoForm({...demoForm, lastName: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Hotel/Company Name *</label>
                  <input 
                    type="text" 
                    id="company" 
                    value={demoForm.company}
                    onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                    required 
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Book My Free Demo
                  <Calendar size={20} />
                </button>
                
                <p className="form-note">
                  <Shield size={16} />
                  We respect your privacy. Your information will only be used to schedule your demo.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your hotel operations?</h2>
            <p>Join over 1,000 hotels worldwide that trust FifthKeys to streamline their operations and boost revenue.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                Start 30-Day Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="btn btn-outline btn-lg">
                View Pricing
              </button>
            </div>
            <p className="cta-note">No credit card required • Full access to all features • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className={`chat-widget ${isChatOpen ? 'active' : ''}`}>
        <button 
          className="chat-toggle"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Toggle chat"
        >
          {isChatOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
        
        {isChatOpen && (
          <motion.div 
            className="chat-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header">
              <h4>FifthKeys Support</h4>
              <p>We're here to help!</p>
            </div>
            <div className="chat-messages">
              <div className="message bot">
                <p>Hi! How can I help you today?</p>
              </div>
            </div>
            <div className="quick-replies">
              <button className="quick-reply">Book a demo</button>
              <button className="quick-reply">Pricing information</button>
              <button className="quick-reply">Features overview</button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button 
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default App;
