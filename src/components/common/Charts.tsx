import React, { useState } from 'react';

interface CategoryDataPoint {
  category: string;
  count: number;
  color?: string;
}

export const CategoryBarChart: React.FC<{
  data: CategoryDataPoint[];
  title?: string;
}> = ({ data, title }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...data.map(d => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  const colors = [
    '#142B4A', // navy
    '#0F9D91', // teal
    '#B7791F', // amber
    '#175CD3', // blue
    '#16865C', // emerald
    '#D64545', // red
    '#667085'  // slate
  ];

  return (
    <div className="card-base p-5">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">{title}</h4>
          <span className="text-xs text-[#667085] font-medium">Total: {total} complaints</span>
        </div>
      )}

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const pct = Math.round((item.count / maxVal) * 100);
          const share = total > 0 ? Math.round((item.count / total) * 100) : 0;
          const isHovered = hoveredIndex === idx;
          const barColor = item.color || colors[idx % colors.length];

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`transition-colors ${isHovered ? 'text-[#0F9D91] font-bold' : 'text-[#1D2939] font-medium'}`}>
                  {item.category}
                </span>
                <span className="text-[#667085] font-medium">
                  {item.count} <span className="text-[11px] text-[#98A2B3]">({share}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: barColor,
                    filter: isHovered ? 'brightness(1.15)' : 'none'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MonthlyTrendChart: React.FC<{
  title?: string;
}> = ({ title = 'Monthly Complaint Trends (2026)' }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const incoming = [45, 52, 60, 58, 65, 78, 85, 92, 105, 98];
  const resolved = [40, 48, 55, 54, 62, 70, 80, 88, 98, 92];

  const maxVal = Math.max(...incoming, 120);
  const chartHeight = 160;

  return (
    <div className="card-base p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider">{title}</h4>
          <p className="text-xs text-[#667085] mt-0.5">Incoming vs Successfully Resolved Cases</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D91]" />
            <span className="text-[#1D2939] font-medium">Resolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#142B4A]" />
            <span className="text-[#1D2939] font-medium">Received</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 pt-6 pb-2 border-b border-[#E4E7EC] h-44">
        {months.map((m, i) => {
          const recH = (incoming[i] / maxVal) * chartHeight;
          const resH = (resolved[i] / maxVal) * chartHeight;

          return (
            <div key={m} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#142B4A] text-white text-[10px] rounded px-2 py-1 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                Received: {incoming[i]} | Resolved: {resolved[i]}
              </div>

              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div
                  className="w-2 sm:w-2.5 bg-[#142B4A] rounded-t transition-all group-hover:brightness-125"
                  style={{ height: `${recH}px` }}
                />
                <div
                  className="w-2 sm:w-2.5 bg-[#0F9D91] rounded-t transition-all group-hover:brightness-110"
                  style={{ height: `${resH}px` }}
                />
              </div>
              <span className="text-[11px] text-[#667085] font-medium">{m}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatusDonutChart: React.FC<{
  data: { status: string; count: number; color: string }[];
  title?: string;
}> = ({ data, title = 'Status Distribution' }) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="card-base p-5">
      <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-4">{title}</h4>

      <div className="flex items-center justify-center gap-6">
        {/* SVG Donut Visual */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, idx) => {
              const previousSums = data.slice(0, idx).reduce((s, d) => s + d.count, 0);
              const startPct = total > 0 ? previousSums / total : 0;
              const slicePct = total > 0 ? item.count / total : 0;

              const strokeDasharray = `${slicePct * 251.2} 251.2`;
              const strokeDashoffset = `-${startPct * 251.2}`;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="16"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-90"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-[#142B4A]">{total}</span>
            <span className="text-[10px] text-[#667085] uppercase tracking-wider font-semibold">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 text-xs">
          {data.map((item, idx) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={idx} className="flex items-center justify-between gap-3 min-w-[130px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#1D2939] capitalize font-medium">{item.status}</span>
                </div>
                <span className="font-bold text-[#142B4A]">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const AreaVolumeChart: React.FC<{
  data: { area: string; count: number }[];
  title?: string;
}> = ({ data, title = 'Ward Complaint Volume' }) => {
  const maxVal = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="card-base p-5">
      <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-4">{title}</h4>
      <div className="space-y-3">
        {data.map((item, idx) => {
          const pct = Math.round((item.count / maxVal) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#1D2939]">{item.area}</span>
                <span className="text-[#667085] font-medium">{item.count} tickets</span>
              </div>
              <div className="h-2.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: '#0F9D91'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
