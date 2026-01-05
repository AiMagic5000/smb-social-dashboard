import { useState, useEffect, useRef } from 'react';
import { useAnimatedCounter, formatNumber } from '../hooks/useAnimatedCounter';

interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface FunnelChartProps {
  data: FunnelStep[];
  title?: string;
  showConversion?: boolean;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  title = 'Engagement Funnel',
  showConversion = true
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showConversion && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Conversion:</span>
            <span className="font-semibold text-smb-blue">
              {((data[data.length - 1]?.value / data[0]?.value) * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {data.map((step, index) => (
          <FunnelBar
            key={step.label}
            step={step}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            maxValue={data[0].value}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
        {data.map((step) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: step.color }}
            />
            <span className="text-xs text-gray-600">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FunnelBar: React.FC<{
  step: FunnelStep;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  maxValue: number;
}> = ({ step, index, isHovered, onHover, onLeave, maxValue }) => {
  const { value: animatedValue } = useAnimatedCounter(step.value, 1500 + index * 200);
  const widthPercentage = (step.value / maxValue) * 100;

  return (
    <div
      className="relative funnel-bar"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{step.label}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">
            {formatNumber(animatedValue)}
          </span>
          {index > 0 && (
            <span className="text-xs text-gray-400">
              {step.percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Bar */}
      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
        <div
          className="h-full rounded-lg transition-all duration-500 ease-out flex items-center"
          style={{
            width: `${widthPercentage}%`,
            backgroundColor: step.color,
            opacity: isHovered ? 1 : 0.85,
            transform: isHovered ? 'scaleX(1.02)' : 'scaleX(1)'
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"
          />
        </div>

        {/* Tooltip on hover */}
        {isHovered && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap z-10 modal-content">
            {formatNumber(step.value)} {step.label.toLowerCase()}
            {index > 0 && ` (${step.percentage}% of total)`}
          </div>
        )}
      </div>

      {/* Drop-off indicator */}
      {index > 0 && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <div className="text-xs text-gray-400">↓</div>
        </div>
      )}
    </div>
  );
};

// Waterfall-style chart with scroll-triggered animation
export const WaterfallChart: React.FC<{
  data: FunnelStep[];
  title: string;
}> = ({ data, title }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState<number[]>(data.map(() => 0));
  const chartRef = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200;

  // Intersection Observer to detect when chart is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate bars when visible
  useEffect(() => {
    if (isVisible) {
      // Stagger the animations
      data.forEach((item, index) => {
        const targetHeight = (item.value / maxValue) * 100;
        setTimeout(() => {
          setAnimatedHeights(prev => {
            const newHeights = [...prev];
            newHeights[index] = targetHeight;
            return newHeights;
          });
        }, index * 150);
      });
    }
  }, [isVisible, data, maxValue]);

  return (
    <div className="glass-card p-6" ref={chartRef}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      {/* Chart */}
      <div className="relative" style={{ height: chartHeight + 40 }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-10 w-10 flex flex-col justify-between text-xs text-gray-400">
          <span>{formatNumber(maxValue)}</span>
          <span>{formatNumber(maxValue * 0.5)}</span>
          <span>0</span>
        </div>

        {/* Grid lines */}
        <div className="absolute left-12 right-0 top-0 bottom-10 flex flex-col justify-between pointer-events-none">
          <div className="h-px bg-gray-100 w-full" />
          <div className="h-px bg-gray-100 w-full" />
          <div className="h-px bg-gray-200 w-full" />
        </div>

        {/* Bars */}
        <div className="absolute left-12 right-0 top-0 bottom-10 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            const animatedHeight = animatedHeights[index];

            return (
              <div
                key={item.label}
                className="flex-1 flex flex-col items-center justify-end relative"
                style={{ height: '100%' }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Value label above bar */}
                <div
                  className={`text-xs font-semibold mb-1 transition-all duration-500 ${
                    animatedHeight > 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ color: item.color }}
                >
                  {formatNumber(Math.round((animatedHeight / 100) * maxValue))}
                </div>

                {/* Value tooltip */}
                {isActive && (
                  <div className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded text-xs modal-content z-20">
                    {formatNumber(item.value)}
                  </div>
                )}

                {/* Bar */}
                <div
                  className="w-full rounded-t-lg cursor-pointer relative overflow-hidden transition-all duration-700 ease-out"
                  style={{
                    height: `${animatedHeight}%`,
                    backgroundColor: item.color,
                    opacity: isActive ? 1 : 0.85,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    minHeight: animatedHeight > 0 ? '4px' : '0'
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 flex justify-between">
          {data.map((item) => (
            <div key={item.label} className="flex-1 text-center">
              <span className="text-xs text-gray-500 truncate block">
                {item.label.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(data.reduce((sum, d) => sum + d.value, 0))}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {((data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500">Conversion</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-smb-blue">
            {data[data.length - 1].value}
          </p>
          <p className="text-xs text-gray-500">Final</p>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
