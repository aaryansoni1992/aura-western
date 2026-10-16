import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryBanners } from '../components/home/CategoryBanners';
import { TrendingSection } from '../components/home/TrendingSection';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { CouponStrip } from '../components/home/CouponStrip';
import { BrandBenefits } from '../components/home/BrandBenefits';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <CategoryBanners />
      <TrendingSection />
      <PromotionalBanner />
      <CouponStrip />
      <BrandBenefits />
    </div>
  );
};
