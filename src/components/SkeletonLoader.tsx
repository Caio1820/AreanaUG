import React from 'react';

export const BioHeaderSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center pt-8 pb-4 px-4">
      {/* Logo Skeleton */}
      <div className="relative mb-5">
        <div className="w-28 h-28 rounded-full bg-[#1A1A1A] border-2 border-orange-500/20 animate-shimmer" />
      </div>

      {/* Title & Slogan */}
      <div className="h-8 w-64 bg-[#1F1F1F] rounded-lg animate-shimmer mb-3" />
      <div className="h-4 w-80 max-w-full bg-[#181818] rounded-md animate-shimmer mb-2" />
      <div className="h-4 w-72 max-w-full bg-[#181818] rounded-md animate-shimmer mb-6" />

      {/* Badges / Chips */}
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
        <div className="h-8 w-56 bg-[#1A1A1A] rounded-full animate-shimmer" />
        <div className="h-8 w-64 bg-[#1A1A1A] rounded-full animate-shimmer" />
      </div>
    </div>
  );
};

export const QuickActionsSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-3">
      <div className="h-14 w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded-2xl animate-shimmer" />
      <div className="h-14 w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded-2xl animate-shimmer" />
      <div className="h-14 w-full bg-[#1A1A1A] border border-[#2B2B2B] rounded-2xl animate-shimmer" />
    </div>
  );
};

export const CardsGridSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Filter Tabs Skeleton */}
      <div className="flex justify-center gap-2 mb-8">
        <div className="h-10 w-28 bg-[#1A1A1A] rounded-xl animate-shimmer" />
        <div className="h-10 w-32 bg-[#1A1A1A] rounded-xl animate-shimmer" />
        <div className="h-10 w-36 bg-[#1A1A1A] rounded-xl animate-shimmer" />
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between h-80"
          >
            <div>
              <div className="h-4 w-24 bg-[#202020] rounded mb-4 animate-shimmer" />
              <div className="h-6 w-48 bg-[#222222] rounded mb-3 animate-shimmer" />
              <div className="h-9 w-32 bg-[#252525] rounded mb-4 animate-shimmer" />
              <div className="space-y-2 mb-6">
                <div className="h-3 w-full bg-[#1C1C1C] rounded animate-shimmer" />
                <div className="h-3 w-4/5 bg-[#1C1C1C] rounded animate-shimmer" />
                <div className="h-3 w-3/4 bg-[#1C1C1C] rounded animate-shimmer" />
              </div>
            </div>
            <div className="h-12 w-full bg-[#202020] rounded-xl animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
};
