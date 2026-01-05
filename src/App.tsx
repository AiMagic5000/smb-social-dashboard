import { useState, useMemo } from 'react';
import {
  BarChart3, Calendar as CalendarIcon, Users, DollarSign,
  TrendingUp, MousePointer, Target, Lock, Unlock,
  Bell, BellOff, Instagram, Youtube, Sparkles, Info,
  LayoutDashboard, PieChart, Settings
} from 'lucide-react';

// Components
import { Hero, FeaturesSection, PricingSection } from './components/Hero';
import { StatCard } from './components/StatCard';
import { FunnelChart, WaterfallChart } from './components/FunnelChart';
import { Calendar } from './components/Calendar';
import { PostModal } from './components/PostModal';
import { AdminModal } from './components/AdminModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer, useToasts } from './components/Toast';

// Data & Utils
import {
  generateCalendarPosts,
  REAL_COSTS,
  DISPLAY_COSTS,
  ADMIN_CODE,
  TOTAL_REVENUE,
  FUNNEL_DATA,
  PLATFORM_STATS,
  generateDailySparkline,
  CONVERSION_FUNNEL,
  START_DATE
} from './data/contentCalendar';
import { Post } from './types';
import { formatCurrency, formatNumber } from './hooks/useAnimatedCounter';
import './index.css';

function App() {
  // State
  const [posts] = useState<Post[]>(() => generateCalendarPosts());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRealCosts, setShowRealCosts] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<'overview' | 'analytics' | 'calendar' | 'settings'>('overview');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  // Toast notifications
  const { toasts, dismissToast, success, info, warning } = useToasts();

  // Navigation handlers
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (tab: 'overview' | 'analytics' | 'calendar' | 'settings') => {
    setActiveNavTab(tab);
    switch (tab) {
      case 'overview':
        scrollToSection('dashboard-stats');
        break;
      case 'analytics':
        scrollToSection('dashboard-analytics');
        break;
      case 'calendar':
        scrollToSection('calendar');
        break;
      case 'settings':
        setShowSettingsModal(true);
        break;
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    info(`Theme changed to ${newTheme}`);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const postedPosts = posts.filter(p => p.status === 'posted');
    const totalEngagement = postedPosts.reduce((sum, p) => {
      if (!p.engagement) return sum;
      return sum + p.engagement.likes + p.engagement.comments + p.engagement.shares;
    }, 0);

    const totalLikes = postedPosts.reduce((sum, p) => sum + (p.engagement?.likes || 0), 0);
    const totalReach = postedPosts.reduce((sum, p) => sum + (p.engagement?.reach || 0), 0);

    const realCost = posts.reduce((sum, p) => sum + p.apiCost, 0);

    return {
      totalPosts: posts.length,
      postsThisWeek: 28,
      totalEngagement,
      avgLikesPerPost: postedPosts.length ? Math.round(totalLikes / postedPosts.length) : 0,
      totalReach,
      websiteClicks: CONVERSION_FUNNEL.clicks,
      leadsGenerated: CONVERSION_FUNNEL.leads,
      customersAcquired: CONVERSION_FUNNEL.customers,
      projectedRevenue: TOTAL_REVENUE,
      apiCostTotal: realCost,
      displayCostTotal: realCost * 1.5
    };
  }, [posts]);

  // Sparkline data
  const sparklineData = useMemo(() => generateDailySparkline(), []);

  // Handle post click
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      success('Email notifications enabled! You\'ll receive updates when posts are published.');
    } else {
      info('Email notifications disabled.');
    }
  };

  // Handle admin access
  const handleAdminSuccess = () => {
    setShowRealCosts(true);
    success('Admin access granted. Now viewing real API costs.');
  };

  // Scroll to dashboard section
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get current costs based on admin status
  const currentCosts = showRealCosts ? REAL_COSTS : DISPLAY_COSTS;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        onGetStarted={scrollToDashboard}
        onWatchDemo={() => warning('Demo video coming soon!')}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Dashboard Section */}
      <section id="dashboard" className="py-8 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard App Header */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-smb-dark to-slate-800 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Logo & App Name */}
                <div className="flex items-center gap-4">
                  <div className="h-10 bg-white rounded-xl flex items-center justify-center px-2">
                    <img
                      src="https://cdn.prod.website-files.com/6784053e7b7422e48efa5a84/6833a36f90c60fba010cee72_start_my_business_logo-removebg-preview.png"
                      alt="Start My Business Logo"
                      className="h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '<span class="text-blue-600 font-bold text-lg">SMB</span>';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-lg">Social Automation Dashboard</h1>
                    <p className="text-gray-400 text-sm">Start My Business Inc.</p>
                  </div>
                </div>

                {/* Dashboard Navigation */}
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavClick('overview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeNavTab === 'overview'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Overview</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('analytics')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeNavTab === 'analytics'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <PieChart className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Analytics</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('calendar')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeNavTab === 'calendar'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Calendar</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('settings')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeNavTab === 'settings'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">Settings</span>
                  </button>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleNotifications}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      notificationsEnabled
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => showRealCosts ? setShowRealCosts(false) : setShowAdminModal(true)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      showRealCosts
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {showRealCosts ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span className="text-sm font-medium hidden sm:inline">
                      {showRealCosts ? 'Admin' : 'Login'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Sub-header */}
            <div className="bg-white/50 backdrop-blur-sm px-6 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Live Dashboard</h2>
                  <p className="text-gray-600 text-sm">
                    Real-time analytics starting {START_DATE.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live
                  </span>
                  {showRealCosts && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Admin Mode
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - 2 rows of 3 */}
          <div id="dashboard-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Row 1 */}
            <StatCard
              title="Total Posts"
              value={stats.totalPosts}
              suffix=" scheduled"
              trend={12}
              trendLabel="vs last month"
              icon={<BarChart3 className="w-6 h-6" />}
              color="#2563eb"
              sparklineData={sparklineData}
            />
            <StatCard
              title="Total Engagement"
              value={stats.totalEngagement}
              trend={18}
              trendLabel="growing fast"
              icon={<TrendingUp className="w-6 h-6" />}
              color="#7c3aed"
              sparklineData={sparklineData.map(v => v * 1.2)}
            />
            <StatCard
              title="Projected Revenue"
              value={TOTAL_REVENUE}
              isCurrency
              trend={24}
              trendLabel="this month"
              icon={<DollarSign className="w-6 h-6" />}
              color="#10b981"
              sparklineData={sparklineData.map(v => v * 50)}
            />

            {/* Row 2 */}
            <StatCard
              title="Website Clicks"
              value={stats.websiteClicks}
              trend={15}
              trendLabel="from social"
              icon={<MousePointer className="w-6 h-6" />}
              color="#f59e0b"
              sparklineData={sparklineData.map(v => v * 0.8)}
            />
            <StatCard
              title="Leads Generated"
              value={stats.leadsGenerated}
              trend={22}
              trendLabel="qualified leads"
              icon={<Users className="w-6 h-6" />}
              color="#ec4899"
              sparklineData={sparklineData.map(v => v * 0.5)}
            />
            <StatCard
              title="New Customers"
              value={stats.customersAcquired}
              trend={8}
              trendLabel="conversions"
              icon={<Target className="w-6 h-6" />}
              color="#06b6d4"
              sparklineData={sparklineData.map(v => v * 0.2)}
            />
          </div>

          {/* Charts Row */}
          <div id="dashboard-analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Funnel Chart */}
            <FunnelChart
              data={FUNNEL_DATA}
              title="Engagement Funnel"
              showConversion
            />

            {/* Waterfall Chart */}
            <WaterfallChart
              data={[
                { label: 'Impressions', value: 65200, percentage: 100, color: '#3b82f6' },
                { label: 'Reach', value: 54800, percentage: 84, color: '#6366f1' },
                { label: 'Engagement', value: 12400, percentage: 19, color: '#8b5cf6' },
                { label: 'Clicks', value: 2400, percentage: 3.7, color: '#a855f7' },
                { label: 'Leads', value: 144, percentage: 0.2, color: '#d946ef' }
              ]}
              title="Conversion Waterfall"
            />
          </div>

          {/* Cost Breakdown */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Cost Breakdown
                {showRealCosts && (
                  <span className="ml-2 text-xs font-normal text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    Real Costs
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-gray-600">60 posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">60 shorts</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Per IG Post</p>
                <p className={`text-2xl font-bold ${showRealCosts ? 'text-green-600' : 'text-gray-900'}`}>
                  {formatCurrency(currentCosts.instagramPost)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Per YT Short</p>
                <p className={`text-2xl font-bold ${showRealCosts ? 'text-green-600' : 'text-gray-900'}`}>
                  {formatCurrency(currentCosts.youtubeShort)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Weekly Total</p>
                <p className={`text-2xl font-bold ${showRealCosts ? 'text-green-600' : 'text-gray-900'}`}>
                  {formatCurrency(currentCosts.weekly)}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Monthly Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(currentCosts.monthly)}
                </p>
              </div>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h3>
            <div className="space-y-4">
              {PLATFORM_STATS.map((platform) => (
                <div key={platform.platform} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.platform === 'Instagram' ? (
                      <Instagram className="w-5 h-5" />
                    ) : (
                      <Youtube className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{platform.platform}</span>
                      <span className="text-sm text-gray-500">{platform.posts} posts</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full progress-fill"
                        style={{
                          backgroundColor: platform.color,
                          width: `${Math.min(platform.growth * 5, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatNumber(platform.engagement)}</p>
                    <p className="text-xs text-green-600">+{platform.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
                Content Calendar
              </h2>
              <p className="text-gray-600 mt-1">
                30-day automated posting schedule
              </p>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-800">Interactive Calendar</p>
              <p className="text-sm text-blue-700">
                Click on any post in the calendar to view the full details including the AI-generated image,
                caption, engagement metrics, and more. Each post is automatically created and scheduled by our automation system.
              </p>
            </div>
            <Sparkles className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          </div>

          <Calendar
            posts={posts}
            onPostClick={handlePostClick}
            showRealCosts={showRealCosts}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Automate Your Social Media?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get 30 days of fully automated posting FREE with your business build-out package.
          </p>
          <a
            href="https://dashboard.startmybusiness.us/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Start Your Free Trial
            <span className="text-sm font-normal">(No credit card required)</span>
          </a>
        </div>
      </section>

      {/* Modals */}
      <PostModal
        post={selectedPost}
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        showRealCosts={showRealCosts}
      />

      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminSuccess}
        correctCode={ADMIN_CODE}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        theme={theme}
        onThemeChange={handleThemeChange}
        notificationsEnabled={notificationsEnabled}
        onNotificationsToggle={toggleNotifications}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
