import { useState, useEffect } from "react";
import { StoreIcon as Store, HeartIcon as Heart, UserIcon as UserCircle } from "@/components/icons";
import { SparkyAnimation } from "@/components/icons/SparkyAnimation";

interface BottomNavProps {
  activeTab?: 'shop' | 'heart' | 'user';
  onTabChange?: (tab: 'shop' | 'heart' | 'user') => void;
}

export function BottomNav({ activeTab = 'shop', onTabChange }: BottomNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* White Gradient Fade */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[180px] pointer-events-none z-40 transition-transform duration-300 lg:hidden ${
          isVisible ? 'translate-y-0' : 'translate-y-[180px]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[92px] backdrop-blur-sm z-50 transition-transform duration-300 lg:hidden ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-center items-center h-[48px] mt-[17px] gap-2 px-4">
          {/* Glassmorphic Bar with Tabs */}
          <div
            className="relative flex items-center justify-center h-[48px] rounded-full backdrop-blur-sm"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.5)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: `
                -4.5px -4.5px 1.5px -5.25px rgba(255, 255, 255, 0.50) inset,
                4.5px 4.5px 1.5px -5.25px rgba(255, 255, 255, 0.70) inset,
                3px 4.5px 1.5px -3px rgba(179, 179, 179, 0.20) inset,
                -3px -4.5px 1.5px -3px rgba(179, 179, 179, 1) inset,
                0 0 33px 0 rgba(242, 242, 242, 0.50) inset,
                0 0 14px 0 rgba(0, 0, 0, 0.11)
              `,
            }}
          >
            {/* Sliding Background Indicator */}
            <div
              className="absolute w-[72px] h-[48px] bg-white rounded-full transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${
                  activeTab === 'shop' ? '-72px' : activeTab === 'heart' ? '0px' : '72px'
                })`,
                boxShadow: '0 -0.91px 1.829px 0 rgba(0, 0, 0, 0.10), 2px 0.915px 8.83px 0.915px rgba(0, 0, 0, 0.10)'
              }}
            />

            {/* Shop Tab */}
            <button
              onClick={() => onTabChange?.('shop')}
              className="relative w-[72px] h-[48px] flex flex-col justify-center items-center rounded-full z-10"
            >
              <Store
                className="w-7 h-7 transition-all duration-300 ease-in-out"
                strokeWidth={activeTab === 'shop' ? 2 : 1.5}
                style={{
                  color: activeTab === 'shop' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'var(--ld-semantic-color-text-subtle,#74767C)',
                  fill: activeTab === 'shop' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'none'
                }}
              />
            </button>

            {/* Heart Tab */}
            <button
              onClick={() => onTabChange?.('heart')}
              className="relative w-[72px] h-[48px] flex flex-col justify-center items-center rounded-full z-10"
            >
              <Heart
                className="w-7 h-7 transition-all duration-300 ease-in-out"
                strokeWidth={activeTab === 'heart' ? 2 : 1.5}
                style={{
                  color: activeTab === 'heart' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'var(--ld-semantic-color-text-subtle,#74767C)',
                  fill: activeTab === 'heart' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'none'
                }}
              />
            </button>

            {/* User Tab */}
            <button
              onClick={() => onTabChange?.('user')}
              className="relative w-[72px] h-[48px] flex flex-col justify-center items-center rounded-full z-10"
            >
              <UserCircle
                className="w-7 h-7 transition-all duration-300 ease-in-out"
                strokeWidth={activeTab === 'user' ? 2 : 1.5}
                style={{
                  color: activeTab === 'user' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'var(--ld-semantic-color-text-subtle,#74767C)',
                  fill: activeTab === 'user' ? 'var(--ld-semantic-color-action-fill-primary,#0053E2)' : 'none'
                }}
              />
            </button>
          </div>

          {/* Sparky Action Button */}
          <button
            className="w-[48px] h-[48px] flex justify-center items-center rounded-full backdrop-blur-sm flex-shrink-0"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 1)',
              borderLeft: '1px solid rgba(255, 255, 255, 1)',
              background: 'rgba(255, 255, 255, 0.89)',
              boxShadow: `
                -4.5px -4.5px 1.5px -5.25px rgba(255, 255, 255, 0.50) inset,
                4.5px 4.5px 1.5px -5.25px rgba(255, 255, 255, 0.70) inset,
                3px 4.5px 1.5px -3px rgba(179, 179, 179, 0.20) inset,
                -3px -4.5px 1.5px -3px rgba(179, 179, 179, 1) inset,
                0 0 33px 0 rgba(242, 242, 242, 0.50) inset,
                0 0 14px 0 rgba(0, 0, 0, 0.11)
              `,
            }}
          >
            <div className="w-8 h-8">
              <SparkyAnimation />
            </div>
          </button>
        </div>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-[123px] h-[5px] bg-black rounded-full opacity-30" />
      </div>
    </>
  );
}
