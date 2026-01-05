import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Youtube, Filter, Eye } from 'lucide-react';
import { Post } from '../types';
import { CATEGORIES, PLATFORMS, START_DATE } from '../data/contentCalendar';
import { formatCurrency } from '../hooks/useAnimatedCounter';

interface CalendarProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  showRealCosts: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  posts,
  onPostClick,
  showRealCosts
}) => {
  const [currentDate, setCurrentDate] = useState(START_DATE);
  const [selectedPlatform, setSelectedPlatform] = useState<string | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Get week start for weekly view
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  // Get calendar data for month view
  const monthCalendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days: { date: Date; posts: Post[]; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, posts: [], isCurrentMonth: false });
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];

      const dayPosts = posts.filter((post) => {
        if (post.scheduledDate !== dateStr) return false;
        if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
        if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
        return true;
      });

      days.push({ date, posts: dayPosts, isCurrentMonth: true });
    }

    // Next month padding
    const remaining = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, posts: [], isCurrentMonth: false });
    }

    return days;
  }, [currentDate, posts, selectedPlatform, selectedCategory]);

  // Get calendar data for week view
  const weekCalendarData = useMemo(() => {
    const weekStart = getWeekStart(currentDate);
    const days: { date: Date; posts: Post[]; isCurrentMonth: boolean }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      const dayPosts = posts.filter((post) => {
        if (post.scheduledDate !== dateStr) return false;
        if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
        if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
        return true;
      });

      days.push({ date, posts: dayPosts, isCurrentMonth: true });
    }

    return days;
  }, [currentDate, posts, selectedPlatform, selectedCategory]);

  // Use appropriate data based on view mode
  const calendarData = viewMode === 'month' ? monthCalendarData : weekCalendarData;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === 'next' ? 1 : -1),
        1
      ));
    } else {
      // Navigate by week
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      setCurrentDate(newDate);
    }
  };

  // Get header text based on view mode
  const getHeaderText = () => {
    if (viewMode === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
      const weekStart = getWeekStart(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      } else {
        return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;
      }
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Calendar Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 min-w-[280px] text-center">
              {getHeaderText()}
            </h2>
            <button
              onClick={() => navigate('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Platform Filter */}
            <div className="relative">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-smb-blue"
              >
                <option value="all">All Platforms</option>
                {Object.entries(PLATFORMS).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
              <Filter className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-smb-blue"
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORIES).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold text-gray-500 bg-gray-50"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarData.map((day, index) => (
          <CalendarDay
            key={index}
            date={day.date}
            posts={day.posts}
            isCurrentMonth={day.isCurrentMonth}
            isToday={isToday(day.date)}
            onPostClick={onPostClick}
            showRealCosts={showRealCosts}
            isWeekView={viewMode === 'week'}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs text-gray-500 font-medium">Categories:</span>
          {Object.entries(CATEGORIES).map(([key, { name, color }]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Calendar Day
const CalendarDay: React.FC<{
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onPostClick: (post: Post) => void;
  showRealCosts: boolean;
  isWeekView?: boolean;
}> = ({ date, posts, isCurrentMonth, isToday, onPostClick, showRealCosts, isWeekView = false }) => {
  const totalCost = posts.reduce((sum, p) => sum + p.apiCost, 0);
  const displayCost = showRealCosts ? totalCost : totalCost * 1.5;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div
      className={`${isWeekView ? 'min-h-[200px] sm:min-h-[300px]' : 'min-h-[80px] sm:min-h-[120px]'} p-1 sm:p-2 border-b border-r border-gray-100 transition-colors ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
      } ${isToday ? 'bg-blue-50' : ''}`}
    >
      {/* Date Header */}
      <div className={`flex items-center justify-between ${isWeekView ? 'mb-3 pb-2 border-b border-gray-100' : 'mb-1'}`}>
        <div className={isWeekView ? 'flex flex-col' : ''}>
          {isWeekView && (
            <span className="text-xs text-gray-500 font-medium">{dayNames[date.getDay()]}</span>
          )}
          <span
            className={`${isWeekView ? 'text-lg' : 'text-xs sm:text-sm'} font-medium ${
              isToday
                ? `${isWeekView ? 'w-8 h-8' : 'w-6 h-6 sm:w-7 sm:h-7'} flex items-center justify-center bg-smb-blue text-white rounded-full`
                : isCurrentMonth
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            {date.getDate()}
          </span>
        </div>
        {posts.length > 0 && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            showRealCosts ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {formatCurrency(displayCost)}
          </span>
        )}
      </div>

      {/* Posts */}
      <div className={`space-y-1 ${isWeekView ? 'overflow-y-auto max-h-[220px]' : ''}`}>
        {posts.slice(0, isWeekView ? 10 : 4).map((post) => (
          <PostPill key={post.id} post={post} onClick={() => onPostClick(post)} isWeekView={isWeekView} />
        ))}
        {posts.length > (isWeekView ? 10 : 4) && (
          <button className="text-xs text-smb-blue font-medium hover:underline">
            +{posts.length - (isWeekView ? 10 : 4)} more
          </button>
        )}
      </div>
    </div>
  );
};

// Post Pill Component
const PostPill: React.FC<{ post: Post; onClick: () => void; isWeekView?: boolean }> = ({ post, onClick, isWeekView = false }) => {
  const category = CATEGORIES[post.category];
  const PlatformIcon = post.platform === 'youtube' ? Youtube : Instagram;

  if (isWeekView) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all hover:scale-[1.01] post-card group bg-white shadow-sm border border-gray-100"
      >
        <div
          className="w-1.5 h-full min-h-[40px] rounded-full flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <PlatformIcon className="w-4 h-4 flex-shrink-0" style={{ color: PLATFORMS[post.platform].color }} />
            <span className="text-xs font-medium text-gray-900 truncate">
              {post.topic}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
              {category.name}
            </span>
            <span>{post.scheduledTime}</span>
          </div>
        </div>
        <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-1 p-1 rounded text-left transition-all hover:scale-[1.02] post-card group"
      style={{ backgroundColor: `${category.color}15` }}
    >
      <div
        className="w-1 h-4 rounded-full flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      <PlatformIcon className="w-3 h-3 flex-shrink-0" style={{ color: PLATFORMS[post.platform].color }} />
      <span className="text-[10px] sm:text-xs text-gray-700 truncate flex-1">
        {post.topic}
      </span>
      <span className="text-[8px] text-gray-400 hidden sm:inline">
        {post.scheduledTime}
      </span>
      <Eye className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default Calendar;
