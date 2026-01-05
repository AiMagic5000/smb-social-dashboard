import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAnimatedCounter, formatNumber, formatCurrency } from '../hooks/useAnimatedCounter';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  color: string;
  sparklineData?: number[];
  isCurrency?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendLabel,
  icon,
  color,
  sparklineData,
  isCurrency = false
}) => {
  const { value: animatedValue } = useAnimatedCounter(value, 2000);

  const displayValue = isCurrency
    ? formatCurrency(animatedValue)
    : `${prefix}${formatNumber(animatedValue)}${suffix}`;

  const getTrendIcon = () => {
    if (!trend) return <Minus className="w-3 h-3" />;
    return trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-500 bg-gray-100';
    return trend > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  // Generate smooth sparkline path with bezier curves
  const generateSparklinePath = () => {
    if (!sparklineData || sparklineData.length === 0) return '';

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 100;
    const height = 30;
    const stepX = width / (sparklineData.length - 1);

    // Calculate points
    const points = sparklineData.map((val, i) => ({
      x: i * stepX,
      y: height - ((val - min) / range) * (height - 4) - 2 // Add padding
    }));

    if (points.length < 2) return '';

    // Generate smooth bezier curve
    let path = `M${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      // Calculate control points for smooth curve
      const tension = 0.3;
      const prev = points[i - 1] || current;
      const afterNext = points[i + 2] || next;

      const cp1x = current.x + (next.x - prev.x) * tension;
      const cp1y = current.y + (next.y - prev.y) * tension;
      const cp2x = next.x - (afterNext.x - current.x) * tension;
      const cp2y = next.y - (afterNext.y - current.y) * tension;

      path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }

    return path;
  };

  // Generate area fill path
  const generateAreaPath = () => {
    const linePath = generateSparklinePath();
    if (!linePath) return '';
    return `${linePath} L100,30 L0,30 Z`;
  };

  return (
    <div className="glass-card stat-card p-6 relative overflow-hidden group">
      {/* Background gradient accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"
        style={{ background: color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            <div style={{ color }}>{icon}</div>
          </div>

          {trend !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <p className="text-3xl font-bold text-gray-900 animate-count">
            {displayValue}
          </p>
          <p className="text-sm text-gray-500 mt-1">{title}</p>
        </div>

        {/* Sparkline - Smooth and fluid */}
        {sparklineData && (
          <div className="mt-4">
            <svg className="w-full h-10" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                  <stop offset="50%" stopColor={color} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <filter id={`glow-${title.replace(/\s/g, '-')}`}>
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Fill area with smooth gradient */}
              <path
                d={generateAreaPath()}
                fill={`url(#gradient-${title.replace(/\s/g, '-')})`}
                className="transition-all duration-500"
              />
              {/* Smooth bezier curve line */}
              <path
                d={generateSparklinePath()}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${title.replace(/\s/g, '-')})`}
                className="sparkline"
              />
              {/* End point dot */}
              {sparklineData.length > 0 && (
                <circle
                  cx="100"
                  cy={30 - ((sparklineData[sparklineData.length - 1] - Math.min(...sparklineData)) / (Math.max(...sparklineData) - Math.min(...sparklineData) || 1)) * 26 - 2}
                  r="3"
                  fill={color}
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>
        )}

        {/* Trend Label */}
        {trendLabel && (
          <p className="text-xs text-gray-400 mt-2">{trendLabel}</p>
        )}
      </div>
    </div>
  );
};

// Mini stat card for compact displays
export const MiniStatCard: React.FC<{
  label: string;
  value: string | number;
  color: string;
  percentage?: number;
}> = ({ label, value, color, percentage }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-900">{value}</span>
        {percentage !== undefined && (
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-fill"
              style={{ backgroundColor: color, width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
