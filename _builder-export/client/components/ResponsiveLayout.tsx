import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DesktopHeader } from "./DesktopHeader";
import { DesktopFooter } from "./DesktopFooter";
import { SubNav } from "./SubNav";
import { PromoBanner } from "./PromoBanner";
import { OrderStatusBanner } from "./OrderStatusBanner";

interface ResponsiveLayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
  showDesktopHeader?: boolean;
  showOrderStatusBanner?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function ResponsiveLayout({
  children,
  showMobileNav = true,
  showDesktopHeader = true,
  showOrderStatusBanner = false,
  maxWidth = "2xl",
}: ResponsiveLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Header - hidden on mobile */}
      {showDesktopHeader && <DesktopHeader />}

      {/* Sub Navigation - hidden on mobile */}
      {showDesktopHeader && <SubNav />}

      {/* Promotional Banner - hidden on mobile */}
      {showDesktopHeader && <PromoBanner />}

      {/* Main Content Area */}
      <main className="w-full">
        {/* Mobile: Full width with padding */}
        {/* Desktop: Constrained width, centered */}
        <div className={`lg:${maxWidthClasses[maxWidth]} lg:mx-auto lg:px-6`}>
          {/* Order Status Banner - inside content, hidden on mobile, only shown on home page */}
          {showOrderStatusBanner && <OrderStatusBanner />}
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - hidden on desktop */}
      {showMobileNav && (
        <div className="lg:hidden">
          <BottomNav />
        </div>
      )}

      {/* Desktop Footer */}
      <DesktopFooter />
    </div>
  );
}

/**
 * Mobile-only layout wrapper (no desktop chrome)
 */
export function MobileOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={false} showMobileNav={true} maxWidth="full">
      {children}
    </ResponsiveLayout>
  );
}

/**
 * Desktop-only layout wrapper (no mobile nav)
 */
export function DesktopOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <ResponsiveLayout showDesktopHeader={true} showMobileNav={false} maxWidth="2xl">
      {children}
    </ResponsiveLayout>
  );
}
