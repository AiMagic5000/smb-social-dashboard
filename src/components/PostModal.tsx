import React, { useState, useEffect } from 'react';
import {
  X, Instagram, Youtube, Heart, MessageCircle, Share2, Bookmark,
  Eye, TrendingUp, Clock, Calendar, ChevronDown, ChevronUp,
  ExternalLink, Download, Copy, Check
} from 'lucide-react';
import { Post } from '../types';
import { CATEGORIES, PLATFORMS, REAL_COSTS, DISPLAY_COSTS } from '../data/contentCalendar';
import { formatNumber, formatCurrency } from '../hooks/useAnimatedCounter';

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  showRealCosts: boolean;
}

export const PostModal: React.FC<PostModalProps> = ({
  post,
  isOpen,
  onClose,
  showRealCosts
}) => {
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const category = CATEGORIES[post.category];
  const platform = PLATFORMS[post.platform];
  const PlatformIcon = post.platform === 'youtube' ? Youtube : Instagram;
  const cost = showRealCosts ? post.apiCost : post.apiCost * 1.5;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(post.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Social media account URLs
  const socialUrls = {
    instagram: 'https://www.instagram.com/startmybusinessinc/',
    youtube: 'https://www.youtube.com/@StartMyBusinessInc'
  };

  // Get image URL based on post status
  const getImageUrl = () => {
    // If post has a real image URL from GitHub, use it
    if (post.imageUrl && post.imageUrl.includes('github')) {
      return post.imageUrl;
    }

    // Check if post is in the future (scheduled)
    const postDate = new Date(post.scheduledDate);
    const now = new Date();
    const isScheduled = post.status === 'scheduled' || postDate > now;

    if (isScheduled) {
      // Placeholder for scheduled/future posts
      const platformColor = post.platform === 'youtube' ? 'dc2626' : 'e4405f';
      const contentType = post.platform === 'youtube' ? 'Video Short' : 'Image';
      return `https://placehold.co/1080x1920/${platformColor}/ffffff?text=${encodeURIComponent(
        `AI-Generated ${contentType}\n\n` +
        `This content will be\n` +
        `generated & posted on:\n\n` +
        `${postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n` +
        `at ${post.scheduledTime === 'AM' ? '10:00 AM' : '2:00 PM'}\n\n` +
        `Powered by fal.ai`
      )}`;
    }

    // For posted content, try GitHub image
    const dateStr = postDate.toISOString().split('T')[0];
    return `https://raw.githubusercontent.com/AiMagic5000/smb-social-images/main/${post.platform}/${dateStr}-${post.id}.png`;
  };

  // Get the correct social URL based on platform
  const getSocialUrl = () => {
    return post.platform === 'youtube' ? socialUrls.youtube : socialUrls.instagram;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Image/Video Section */}
          <div className="relative w-full md:w-1/2 bg-gray-900 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-smb-blue border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={getImageUrl()}
              alt={post.topic}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Video indicator */}
            {post.type === 'short' || post.type === 'video' ? (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Video Short
              </div>
            ) : null}

            {/* Platform Badge */}
            <div
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: platform.color }}
            >
              <PlatformIcon className="w-4 h-4" />
              {platform.name}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col max-h-[500px] md:max-h-none overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: platform.color }}
                >
                  <PlatformIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">@startmybusinessinc</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.scheduledDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.scheduledTime === 'AM' ? '10:00 AM' : '2:00 PM'}</span>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: `${category.color}15`, color: category.color }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Topic */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {post.topic}
              </h3>

              {/* Caption */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Caption</span>
                  <button
                    onClick={handleCopyCaption}
                    className="flex items-center gap-1 text-xs text-smb-blue hover:underline"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className={`text-sm text-gray-700 whitespace-pre-line ${
                    !captionExpanded ? 'line-clamp-4' : ''
                  }`}>
                    {post.caption}
                    {'\n\n'}
                    🔗 Register FREE at StartMyBusiness.us
                    {'\n'}
                    💬 DM 'AUTOMATE' for free setup
                    {'\n\n'}
                    #StartMyBusiness #BusinessAutomation #Entrepreneur #SmallBusiness #SocialMedia #AI
                  </p>
                  <button
                    onClick={() => setCaptionExpanded(!captionExpanded)}
                    className="flex items-center gap-1 mt-2 text-xs text-smb-blue hover:underline"
                  >
                    {captionExpanded ? (
                      <>Show less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                      <>Show more <ChevronDown className="w-3 h-3" /></>
                    )}
                  </button>
                </div>
              </div>

              {/* Engagement Stats (if posted) */}
              {post.engagement && (
                <div className="mb-6">
                  <span className="text-sm font-semibold text-gray-700 mb-3 block">
                    Engagement
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <EngagementStat
                      icon={<Heart className="w-4 h-4" />}
                      label="Likes"
                      value={post.engagement.likes}
                      color="#ef4444"
                    />
                    <EngagementStat
                      icon={<MessageCircle className="w-4 h-4" />}
                      label="Comments"
                      value={post.engagement.comments}
                      color="#3b82f6"
                    />
                    <EngagementStat
                      icon={<Share2 className="w-4 h-4" />}
                      label="Shares"
                      value={post.engagement.shares}
                      color="#10b981"
                    />
                    <EngagementStat
                      icon={<Bookmark className="w-4 h-4" />}
                      label="Saves"
                      value={post.engagement.saves}
                      color="#f59e0b"
                    />
                  </div>

                  {/* Additional metrics */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs">Reach</span>
                      </div>
                      <p className="font-bold text-gray-900">
                        {formatNumber(post.engagement.reach)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Impressions</span>
                      </div>
                      <p className="font-bold text-gray-900">
                        {formatNumber(post.engagement.impressions)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Cost</span>
                  <span className={`font-semibold ${showRealCosts ? 'text-green-600' : 'text-gray-900'}`}>
                    {formatCurrency(cost)}
                  </span>
                </div>
                {post.type === 'short' && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>• fal.ai (image)</span>
                      <span>{formatCurrency(showRealCosts ? REAL_COSTS.falai : DISPLAY_COSTS.falai)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>• Higgsfield (video)</span>
                      <span>{formatCurrency(showRealCosts ? REAL_COSTS.higgsfield : DISPLAY_COSTS.higgsfield)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'posted'
                        ? 'bg-green-100 text-green-700'
                        : post.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <a
                    href={getSocialUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-smb-blue text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">View on {platform.name}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Engagement Stat Component
const EngagementStat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="bg-gray-50 rounded-lg p-3 text-center">
    <div className="flex items-center justify-center mb-1" style={{ color }}>
      {icon}
    </div>
    <p className="font-bold text-gray-900">{formatNumber(value)}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default PostModal;
