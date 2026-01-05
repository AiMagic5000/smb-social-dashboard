import { Post, CostBreakdown, FunnelData, PlatformStats, ChartDataPoint } from '../types';

// Start date: January 5, 2026
export const START_DATE = new Date('2026-01-05');

// Real API Costs (internal)
export const REAL_COSTS: CostBreakdown = {
  falai: 0.03,
  higgsfield: 0.563,
  instagramPost: 0.03,
  youtubeShort: 0.593,
  daily: 1.246,
  weekly: 8.72,
  monthly: 37.50
};

// Display Costs (50% markup for sales)
export const DISPLAY_COSTS: CostBreakdown = {
  falai: 0.045,
  higgsfield: 0.84,
  instagramPost: 0.045,
  youtubeShort: 0.89,
  daily: 1.87,
  weekly: 13.08,
  monthly: 56.25
};

// Admin code for unlocking real costs
export const ADMIN_CODE = '1970';

// Total revenue target
export const TOTAL_REVENUE = 7847.50;

// Content categories with colors
export const CATEGORIES = {
  'ai-seo': { name: 'AI-SEO-AEO Framework', color: '#10b981', bgColor: 'bg-emerald-500' },
  'automation': { name: 'Social Media Automation', color: '#7c3aed', bgColor: 'bg-purple-500' },
  'business-credit': { name: 'Business Credit & Funding', color: '#f59e0b', bgColor: 'bg-amber-500' },
  'success-stories': { name: 'Entrepreneur Success', color: '#ec4899', bgColor: 'bg-pink-500' }
};

// Platform configurations
export const PLATFORMS = {
  instagram: { name: 'Instagram', color: '#E4405F', icon: 'Instagram' },
  youtube: { name: 'YouTube', color: '#FF0000', icon: 'Youtube' },
  tiktok: { name: 'TikTok', color: '#000000', icon: 'Music2' },
  facebook: { name: 'Facebook', color: '#1877F2', icon: 'Facebook' },
  twitter: { name: 'Twitter/X', color: '#1DA1F2', icon: 'Twitter' },
  linkedin: { name: 'LinkedIn', color: '#0A66C2', icon: 'Linkedin' }
};

// Content topics for 30 days
export const CONTENT_TOPICS = [
  // AI-SEO-AEO Framework (8 topics)
  { category: 'ai-seo', topic: 'Technical SEO Foundation Guide', description: 'Master the basics of technical SEO that AI search engines love' },
  { category: 'ai-seo', topic: 'Structured Data Mastery', description: 'How to implement schema markup for AI visibility' },
  { category: 'ai-seo', topic: 'Citation Mining Playbook', description: 'Get cited by ChatGPT, Perplexity & Claude' },
  { category: 'ai-seo', topic: 'AI Rank Perception Tracking', description: 'Track how AI assistants perceive your brand' },
  { category: 'ai-seo', topic: 'Query Fan-Out Content Strategy', description: 'Create content that answers every related question' },
  { category: 'ai-seo', topic: 'N8N Technical Automation', description: 'Automate your SEO workflows with n8n' },
  { category: 'ai-seo', topic: 'N8N Intelligence Automation', description: 'Smart automation for competitive intelligence' },
  { category: 'ai-seo', topic: 'Implementation Sales Operations', description: 'Turn SEO into revenue with this framework' },

  // Social Media Automation (8 topics)
  { category: 'automation', topic: 'Find Your Perfect Niche', description: 'How we help identify your ideal market' },
  { category: 'automation', topic: 'Viral Content Blueprint', description: 'Our system for creating engaging content at scale' },
  { category: 'automation', topic: 'AI Caption Generation', description: 'Write converting captions in seconds' },
  { category: 'automation', topic: 'Hashtag & Hook Strategy', description: 'Optimized hashtags we configure for you' },
  { category: 'automation', topic: '30-Day Content Calendars', description: 'Pre-planned content for the entire month' },
  { category: 'automation', topic: 'Monetization Paths', description: 'How clients monetize their automated presence' },
  { category: 'automation', topic: 'Full Automation Setup', description: 'Our complete 6-account automation service' },
  { category: 'automation', topic: 'Automation Results & ROI', description: 'Real results from our automation clients' },

  // Business Credit & Funding (8 topics)
  { category: 'business-credit', topic: 'Business Credit 101', description: 'Start building credit with your EIN' },
  { category: 'business-credit', topic: '0% Interest Funding', description: 'Access capital without paying interest' },
  { category: 'business-credit', topic: 'Vendor Accounts Strategy', description: 'Build credit with net-30 accounts' },
  { category: 'business-credit', topic: 'DUNS Number Setup', description: 'Get your D&B profile optimized' },
  { category: 'business-credit', topic: 'SBA Loan Preparation', description: 'Qualify for government-backed loans' },
  { category: 'business-credit', topic: 'Credit Line Hybrid', description: 'Combine multiple funding sources' },
  { category: 'business-credit', topic: 'Fundability Score', description: 'Maximize your approval chances' },
  { category: 'business-credit', topic: '$120K+ Funding Blueprint', description: 'The path to six-figure funding' },

  // Success Stories (6 topics)
  { category: 'success-stories', topic: 'From Side Hustle to Full-Time', description: 'How Sarah quit her 9-5 in 90 days' },
  { category: 'success-stories', topic: 'First Client in 7 Days', description: 'Mike\'s rapid launch story' },
  { category: 'success-stories', topic: '$10K Month Achievement', description: 'Lisa\'s breakthrough moment' },
  { category: 'success-stories', topic: '6-Figure Business Launch', description: 'The complete transformation' },
  { category: 'success-stories', topic: 'Automation Success Story', description: 'How automation changed everything' },
  { category: 'success-stories', topic: 'Your Success Awaits', description: 'Why you should start today' }
];

// Generate 30 days of posts starting from January 5, 2026
export function generateCalendarPosts(): Post[] {
  const posts: Post[] = [];
  let topicIndex = 0;

  for (let day = 0; day < 30; day++) {
    const currentDate = new Date(START_DATE);
    currentDate.setDate(currentDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];

    // AM Instagram Post
    const amTopic = CONTENT_TOPICS[topicIndex % CONTENT_TOPICS.length];
    posts.push({
      id: `ig-am-${day}`,
      platform: 'instagram',
      type: 'image',
      scheduledDate: dateStr,
      scheduledTime: 'AM',
      category: amTopic.category as Post['category'],
      topic: amTopic.topic,
      caption: amTopic.description,
      status: day < 3 ? 'posted' : 'scheduled',
      engagement: day < 3 ? generateMockEngagement() : undefined,
      apiCost: REAL_COSTS.instagramPost
    });

    // AM YouTube Short
    posts.push({
      id: `yt-am-${day}`,
      platform: 'youtube',
      type: 'short',
      scheduledDate: dateStr,
      scheduledTime: 'AM',
      category: amTopic.category as Post['category'],
      topic: amTopic.topic,
      caption: amTopic.description,
      status: day < 3 ? 'posted' : 'scheduled',
      engagement: day < 3 ? generateMockEngagement(true) : undefined,
      apiCost: REAL_COSTS.youtubeShort
    });

    topicIndex++;

    // PM Instagram Post
    const pmTopic = CONTENT_TOPICS[topicIndex % CONTENT_TOPICS.length];
    posts.push({
      id: `ig-pm-${day}`,
      platform: 'instagram',
      type: 'image',
      scheduledDate: dateStr,
      scheduledTime: 'PM',
      category: pmTopic.category as Post['category'],
      topic: pmTopic.topic,
      caption: pmTopic.description,
      status: day < 3 ? 'posted' : 'scheduled',
      engagement: day < 3 ? generateMockEngagement() : undefined,
      apiCost: REAL_COSTS.instagramPost
    });

    // PM YouTube Short
    posts.push({
      id: `yt-pm-${day}`,
      platform: 'youtube',
      type: 'short',
      scheduledDate: dateStr,
      scheduledTime: 'PM',
      category: pmTopic.category as Post['category'],
      topic: pmTopic.topic,
      caption: pmTopic.description,
      status: day < 3 ? 'posted' : 'scheduled',
      engagement: day < 3 ? generateMockEngagement(true) : undefined,
      apiCost: REAL_COSTS.youtubeShort
    });

    topicIndex++;
  }

  return posts;
}

// Generate mock engagement data
function generateMockEngagement(isVideo = false): Post['engagement'] {
  const baseViews = isVideo ? Math.floor(Math.random() * 5000) + 1000 : Math.floor(Math.random() * 2000) + 500;
  return {
    likes: Math.floor(baseViews * (Math.random() * 0.1 + 0.05)),
    comments: Math.floor(baseViews * (Math.random() * 0.02 + 0.005)),
    shares: Math.floor(baseViews * (Math.random() * 0.01 + 0.002)),
    views: baseViews,
    saves: Math.floor(baseViews * (Math.random() * 0.03 + 0.01)),
    reach: Math.floor(baseViews * (Math.random() * 0.8 + 0.6)),
    impressions: Math.floor(baseViews * (Math.random() * 1.5 + 1.2))
  };
}

// Funnel data for engagement visualization
export const FUNNEL_DATA: FunnelData[] = [
  { label: 'Impressions', value: 65200, percentage: 100, color: '#3b82f6' },
  { label: 'Reach', value: 54800, percentage: 84, color: '#6366f1' },
  { label: 'Engagement', value: 48600, percentage: 75, color: '#8b5cf6' },
  { label: 'Profile Visits', value: 12400, percentage: 19, color: '#a855f7' },
  { label: 'Website Clicks', value: 2400, percentage: 3.7, color: '#d946ef' }
];

// Platform statistics
export const PLATFORM_STATS: PlatformStats[] = [
  { platform: 'Instagram', posts: 60, engagement: 24500, growth: 12.5, color: '#E4405F' },
  { platform: 'YouTube', posts: 60, engagement: 31200, growth: 18.3, color: '#FF0000' }
];

// Weekly engagement trend data
export function generateWeeklyTrend(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const startDate = new Date(START_DATE);

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + (i * 7));
    data.push({
      date: weekStart.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 5000) + 10000 + (i * 2000),
      label: `Week ${i + 1}`
    });
  }

  return data;
}

// Daily posting performance sparkline data
export function generateDailySparkline(): number[] {
  return Array.from({ length: 14 }, () => Math.floor(Math.random() * 100) + 50);
}

// Conversion funnel data
export const CONVERSION_FUNNEL = {
  impressions: 50000,
  clicks: 2400,
  leads: 144,
  customers: 14,
  revenue: TOTAL_REVENUE
};

// Service pricing from startmybusiness.us
export const SERVICE_PRICING = {
  businessBuildout: 299,
  premiumAutomation: 199,
  creditCoaching: 499,
  averageOrderValue: 299
};
