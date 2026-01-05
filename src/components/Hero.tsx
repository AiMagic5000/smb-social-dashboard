import {
  Play, ArrowRight, CheckCircle2, Sparkles,
  Instagram, Youtube, Facebook, Twitter, Linkedin, Music2,
  Zap, Shield, Clock, TrendingUp, Star,
  Users, Globe, ChevronDown, ChevronUp, Headphones, Award,
  Search, Target, BarChart3, MessageSquare, Send, Hash,
  Camera, Video, Podcast, Radio, Newspaper, Rss, AtSign
} from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onWatchDemo }) => {
  const [showDemoTooltip, setShowDemoTooltip] = useState(false);
  const features = [
    { icon: <Zap className="w-5 h-5" />, text: 'Ultra-Realistic AI Content' },
    { icon: <Clock className="w-5 h-5" />, text: '24/7/365 Autopilot' },
    { icon: <Shield className="w-5 h-5" />, text: '30 Days FREE' },
    { icon: <Headphones className="w-5 h-5" />, text: '7-Day Support' }
  ];

  const platforms = [
    { icon: <Instagram className="w-6 h-6" />, name: 'Instagram', color: '#E4405F' },
    { icon: <Youtube className="w-6 h-6" />, name: 'YouTube', color: '#FF0000' },
    { icon: <Facebook className="w-6 h-6" />, name: 'Facebook', color: '#1877F2' },
    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter/X', color: '#1DA1F2' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', color: '#0A66C2' },
    { icon: <Music2 className="w-6 h-6" />, name: 'TikTok', color: '#000000' },
    { icon: <Send className="w-6 h-6" />, name: 'Telegram', color: '#26A5E4' },
    { icon: <MessageSquare className="w-6 h-6" />, name: 'WhatsApp', color: '#25D366' },
    { icon: <Camera className="w-6 h-6" />, name: 'Snapchat', color: '#FFFC00' },
    { icon: <Hash className="w-6 h-6" />, name: 'Threads', color: '#000000' },
    { icon: <AtSign className="w-6 h-6" />, name: 'Discord', color: '#5865F2' },
    { icon: <Rss className="w-6 h-6" />, name: 'Reddit', color: '#FF4500' },
    { icon: <Video className="w-6 h-6" />, name: 'Vimeo', color: '#1AB7EA' },
    { icon: <Globe className="w-6 h-6" />, name: 'Google Biz', color: '#4285F4' },
    { icon: <Newspaper className="w-6 h-6" />, name: 'Medium', color: '#000000' },
    { icon: <Radio className="w-6 h-6" />, name: 'Tumblr', color: '#36465D' },
    { icon: <Podcast className="w-6 h-6" />, name: 'Pinterest', color: '#E60023' },
    { icon: <MessageSquare className="w-6 h-6" />, name: 'Slack', color: '#4A154B' },
    { icon: <Users className="w-6 h-6" />, name: 'Nextdoor', color: '#00B246' },
    { icon: <Star className="w-6 h-6" />, name: 'Yelp', color: '#D32323' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-smb-blue/20 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-smb-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4 text-smb-gold" />
            <span className="text-sm font-medium text-gray-700">
              Included FREE with Every Business Build-Out
            </span>
            <span className="px-2 py-0.5 bg-smb-blue text-white text-xs font-bold rounded-full">
              NEW
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Social Media on
            <span className="gradient-text block sm:inline"> Autopilot</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            <span className="font-bold text-smb-blue">Ultra-realistic AI-generated</span> images, videos, and copy
            posted automatically to your social accounts{' '}
            <span className="font-semibold">24/7/365</span>.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Whether you're adding it to your business build-out or need your personal or business
            accounts automated with quality content—this is where professionals get{' '}
            <span className="font-semibold text-smb-blue">7-day support</span> on all social media.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm"
              >
                <div className="text-smb-blue">{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://dashboard.startmybusiness.us/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-smb-blue text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="relative">
              <button
                onClick={() => setShowDemoTooltip(true)}
                onMouseLeave={() => setTimeout(() => setShowDemoTooltip(false), 2000)}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-smb-blue/10 rounded-full flex items-center justify-center group-hover:bg-smb-blue/20 transition-colors">
                  <Play className="w-5 h-5 text-smb-blue ml-0.5" />
                </div>
                Watch Demo
              </button>

              {/* Tooltip popup near button */}
              {showDemoTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-3 bg-amber-500 text-white rounded-xl shadow-xl animate-fade-in z-50 whitespace-nowrap">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rotate-45" />
                  <div className="relative flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span className="font-medium">Demo video coming soon!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platform Icons - Infinite Scroll */}
          <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto">
            <p className="text-sm text-gray-500">Works with all major platforms</p>
            <div className="relative w-full overflow-hidden">
              {/* Gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

              {/* Scrolling container */}
              <div className="flex animate-marquee">
                {/* First set */}
                {platforms.map((platform, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-14 h-14 mx-2 bg-white rounded-xl shadow-md flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg"
                    title={platform.name}
                  >
                    <div style={{ color: platform.color }}>{platform.icon}</div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {platforms.map((platform, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-14 h-14 mx-2 bg-white rounded-xl shadow-md flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg"
                    title={platform.name}
                  >
                    <div style={{ color: platform.color }}>{platform.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-12 border-t border-gray-200/50">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">$50 Setup Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// Features Section Component with Benefits
export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Ultra-Realistic AI Content',
      description: 'Hyper-realistic images and videos created by fal.ai and Higgsfield AI. Professional quality that stands out.',
      color: '#2563eb'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7/365 Autopilot',
      description: 'Posts go live at optimal times automatically. AM and PM slots for maximum engagement, even while you sleep.',
      color: '#7c3aed'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real Analytics',
      description: 'Track likes, comments, reach, and conversions. See exactly how your content performs in real-time.',
      color: '#10b981'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: '7-Day Support',
      description: 'Professional support available 7 days a week. We\'re here to help with all your social media needs.',
      color: '#f59e0b'
    }
  ];

  const benefits = [
    { icon: <Globe className="w-5 h-5" />, text: 'Presence on all top media platforms' },
    { icon: <Search className="w-5 h-5" />, text: 'Increase Domain Authority in search' },
    { icon: <Star className="w-5 h-5" />, text: 'More brand awareness' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'Cover both marketing & Off-page SEO' },
    { icon: <Target className="w-5 h-5" />, text: 'New targeted customers' },
    { icon: <TrendingUp className="w-5 h-5" />, text: 'Possible increase in sales' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our automation handles content creation, scheduling, and posting so you can focus on closing deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <div style={{ color: feature.color }}>{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="bg-gradient-to-r from-smb-blue/5 to-purple-500/5 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Benefits of Social Media Automation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="text-smb-blue">{benefit.icon}</div>
                <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section Component with 3 Tiers + FAQ
export const PricingSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tiers = [
    {
      name: 'Starter',
      price: 55,
      description: 'Perfect for personal brands',
      accounts: 2,
      postsPerDay: 2,
      features: [
        'Up to 2 social media accounts',
        '2 posts per day (1 per platform)',
        'AI-generated images',
        'Optimal posting times',
        'Basic analytics dashboard',
        'Email support'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: 125,
      description: 'Best for growing businesses',
      accounts: 6,
      postsPerDay: 4,
      features: [
        'Up to 6 social media accounts',
        '4 posts per day (2 IG + 2 YT)',
        'Ultra-realistic AI images & videos',
        'Optimal posting times',
        'Full analytics dashboard',
        'Real engagement tracking',
        '24/7 automated posting',
        'Priority support'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 249,
      description: 'Maximum automation power',
      accounts: 5,
      postsPerDay: 4,
      features: [
        'Up to 5 social media accounts',
        'Up to 4 posts per day per channel',
        'Ultra-realistic images & videos',
        'AI-generated reviews & copy',
        'Runs on autopilot 24/7/365',
        'Full analytics & reporting',
        'Dedicated account manager',
        'Custom content strategy'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Can I buy this separately without a business build-out?',
      answer: 'Yes! While our social media automation is included FREE for 30 days with every business build-out package, you can absolutely purchase it as a standalone service. Simply sign up and choose your preferred tier to get started immediately.'
    },
    {
      question: "If I don't have my business or personal social media accounts set up yet, can you do it for me?",
      answer: 'Absolutely! We offer a $50 setup service that includes setting up to 5 social media accounts with full optimization. This includes custom cover design, logo setup, custom URL, social links, hashtag integration, CTA buttons, about page optimization, and website integration for Shopify/WordPress/Wix. 2-day delivery guaranteed.'
    },
    {
      question: 'Does the monthly price include API costs?',
      answer: 'No, the monthly subscription ($55 or $125) does not include API costs. We connect you directly to wholesale AI generation accounts (fal.ai for images, Higgsfield for videos) at their actual cost—no markup. This keeps your costs transparent and as low as possible.'
    },
    {
      question: 'What platforms do you support for account setup?',
      answer: 'We can set up accounts on Facebook, Instagram, LinkedIn, Pinterest, TikTok, Reddit, Twitter/X, Threads, Snapchat, YouTube, Tumblr, Telegram, Medium, Google Business, Discord, WhatsApp, and more.'
    },
    {
      question: 'How long until I see results?',
      answer: 'Most clients see increased engagement within the first week. Our AI posts at optimal times when your audience is most active. By the end of your 30-day trial, you\'ll have comprehensive analytics showing reach, engagement, clicks, and conversions.'
    }
  ];

  const setupFeatures = [
    'Open & setup business accounts',
    'Custom designed cover & logo',
    'Custom URL setup',
    'Interlink accounts',
    'Social live links',
    'Trendy hashtags',
    'FB IG cross-posting',
    'Address integration',
    'CTA button setup',
    'About page optimization',
    'Proper category setup',
    'Website integration',
    'Full access details'
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            30 days FREE included with every business build-out
          </p>
          <p className="text-sm text-gray-500">
            Monthly prices do not include API costs (connected directly to wholesale AI accounts)
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`glass-card p-8 relative overflow-hidden ${
                tier.popular ? 'ring-2 ring-smb-blue shadow-xl scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-smb-gold text-smb-dark text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-smb-blue">${tier.price}</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">After 30-day free trial</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 py-3 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-smb-blue">{tier.accounts}</p>
                  <p className="text-xs text-gray-500">Accounts</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-smb-blue">{tier.postsPerDay}</p>
                  <p className="text-xs text-gray-500">Posts/Day</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://dashboard.startmybusiness.us/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 font-semibold rounded-xl transition-colors block text-center ${
                  tier.popular
                    ? 'bg-smb-blue text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Setup Service */}
        <div className="bg-gradient-to-r from-smb-blue to-purple-600 rounded-3xl p-8 mb-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                <Award className="w-4 h-4" />
                <span>Professional Setup Service</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Don't Have Accounts Set Up Yet?
              </h3>
              <p className="text-lg text-blue-100 mb-4">
                We'll create and optimize up to <span className="font-bold text-white">5 social media accounts</span> for your business or personal brand. 2-day delivery guaranteed.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold">$50</span>
                <span className="text-xl text-blue-200">one-time setup</span>
              </div>
              <a
                href="https://dashboard.startmybusiness.us/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-smb-blue font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {setupFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Helped Stats */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-smb-blue" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">1,000+</p>
                <p className="text-sm text-gray-500">Startups Helped</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-smb-gold" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">Satisfaction Guarantee</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Headphones className="w-8 h-8 text-green-500" />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">7 Days</p>
                <p className="text-sm text-gray-500">After-Sales Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
