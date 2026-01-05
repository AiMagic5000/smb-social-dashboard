// Type definitions for SMB Social Dashboard

export interface Post {
  id: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin';
  type: 'image' | 'video' | 'carousel' | 'reel' | 'short' | 'story';
  scheduledDate: string;
  scheduledTime: 'AM' | 'PM';
  category: 'ai-seo' | 'automation' | 'business-credit' | 'success-stories';
  topic: string;
  caption: string;
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  status: 'scheduled' | 'posted' | 'failed' | 'pending';
  postedAt?: string;
  engagement?: PostEngagement;
  apiCost: number;
}

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  saves: number;
  reach: number;
  impressions: number;
}

export interface DaySchedule {
  date: string;
  dayOfWeek: string;
  posts: Post[];
}

export interface CalendarWeek {
  weekNumber: number;
  days: DaySchedule[];
}

export interface Stats {
  totalPosts: number;
  postsThisWeek: number;
  totalEngagement: number;
  avgLikesPerPost: number;
  avgCommentsPerPost: number;
  totalReach: number;
  totalImpressions: number;
  websiteClicks: number;
  leadsGenerated: number;
  customersAcquired: number;
  projectedRevenue: number;
  apiCostTotal: number;
  displayCostTotal: number;
}

export interface CostBreakdown {
  falai: number;
  higgsfield: number;
  instagramPost: number;
  youtubeShort: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface FunnelData {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface PlatformStats {
  platform: string;
  posts: number;
  engagement: number;
  growth: number;
  color: string;
}

export interface ClientConfig {
  clientId: string;
  clientName: string;
  businessName: string;
  logo?: string;
  primaryColor: string;
  accentColor: string;
  socialAccounts: SocialAccount[];
  n8nInstanceUrl: string;
  n8nApiKey: string;
  trialDaysRemaining: number;
  subscriptionStatus: 'trial' | 'active' | 'expired';
}

export interface SocialAccount {
  platform: 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin';
  username: string;
  accountId: string;
  connected: boolean;
  followers?: number;
}

export interface N8nWebhookPayload {
  postId: string;
  platform: string;
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  postedAt: string;
  engagement?: PostEngagement;
}

export interface AdminAccess {
  isAdmin: boolean;
  showRealCosts: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
