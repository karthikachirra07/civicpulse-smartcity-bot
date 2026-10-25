import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, light = false }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* CivicPulse Pulse Emblem */}
      <div
        className="flex items-center justify-center rounded-xl shadow-xs shrink-0"
        style={{
          width: iconSize + 10,
          height: iconSize + 10,
          backgroundColor: light ? '#0F9D91' : '#142B4A'
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Municipal dome / pillar silhouette & dynamic pulse wave */}
          <path
            d="M4 16H8L11 8L16 24L21 12L24 16H28"
            stroke="#0F9D91"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: light ? '#FFFFFF' : '#0F9D91' }}
          />
          <circle cx="16" cy="6" r="2" fill={light ? '#E0F5F3' : '#0F9D91'} />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-bold tracking-tight ${textSize}`}
            style={{ color: light ? '#FFFFFF' : '#142B4A' }}
          >
            Civic<span style={{ color: '#0F9D91' }}>Pulse</span>
          </span>
          <span
            className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded tracking-wider"
            style={{
              backgroundColor: light ? 'rgba(255,255,255,0.15)' : '#E6F6F5',
              color: light ? '#FFFFFF' : '#0F9D91',
              border: `1px solid ${light ? 'rgba(255,255,255,0.2)' : 'rgba(15,157,145,0.2)'}`
            }}
          >
            SmartCity
          </span>
        </div>
        {showTagline && (
          <span
            className="text-[11px] font-medium tracking-tight mt-0.5"
            style={{ color: light ? 'rgba(255,255,255,0.75)' : '#667085' }}
          >
            Smarter Services. Better Cities.
          </span>
        )}
      </div>
    </div>
  );
};
