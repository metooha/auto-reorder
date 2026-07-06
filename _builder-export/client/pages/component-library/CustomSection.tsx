import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LDTag } from "@/components/ui/Tag";
import { Separator } from "@/components/ui/Divider";
import { AddToCart } from "@/components/AddToCart";
import { SearchBar } from "@/components/SearchBar";
import { BottomNav } from "@/components/BottomNav";
import { FilterChip } from "@/components/ui/FilterChip";
import { CameraModal } from "@/components/CameraModal";
import { DesktopHeader } from "@/components/DesktopHeader";
import { SubNav } from "@/components/SubNav";
import { OrderStatusBanner } from "@/components/OrderStatusBanner";
import { PromoBanner } from "@/components/PromoBanner";
import {
  CartIcon,
  LocationIcon,
  SparklesIcon,
  SparkyAnimation,
  SparkyLookingDown,
} from "@/components/icons";

export function CustomSection() {
  const [cameraOpen, setCameraOpen] = useState(false);

  return (
    <>
      {/* AddToCart */}
      <section id="add-to-cart" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">AddToCart</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Animated quantity stepper for adding products to cart.</p>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <AddToCart onQuantityChange={(qty) => console.log("Quantity:", qty)} />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Click to add item, then use +/- to adjust quantity. Auto-collapses after 5 seconds.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* SearchBar */}
      <section id="search-bar" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">SearchBar</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Walmart-branded search input with rainbow gradient border.</p>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background, #0053E2)' }}>
              <SearchBar query="What are you looking for?" cartCount={3} />
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background, #0053E2)' }}>
              <SearchBar showBackButton query="Search results..." cartCount={5} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BottomNav */}
      <section id="bottom-nav" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">BottomNav</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Mobile bottom navigation bar with tab switching.</p>

        <Card>
          <CardContent className="pt-6">
            <div className="relative bg-gray-100 rounded-lg p-4" style={{ height: '100px' }}>
              <div className="absolute bottom-0 left-0 right-0">
                <BottomNav activeTab="shop" onTabChange={(tab) => console.log("Tab:", tab)} />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Mobile-only navigation bar. Hidden on desktop viewports.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FilterChip */}
      <section id="filter-chip" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">FilterChip</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Filter selection chips for refining search results.</p>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <FilterChip label="All" isSelected />
              <FilterChip label="Price" count={5} />
              <FilterChip label="Brand" count={12} />
              <FilterChip label="Size" />
              <FilterChip label="Color" showChevron={false} />
              <FilterChip label="Disabled" disabled />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CameraModal */}
      <section id="camera-modal" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">CameraModal</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Full-screen camera capture modal for photo-based features.</p>

        <Card>
          <CardContent className="pt-6">
            <Button variant="primary" onClick={() => setCameraOpen(true)}>
              Open Camera
            </Button>
            <CameraModal
              isOpen={cameraOpen}
              onClose={() => setCameraOpen(false)}
              onCapture={(imageData) => console.log("Captured photo")}
            />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Props:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">isOpen</code> - Controls visibility</li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">onClose</code> - Close handler</li>
                <li><code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">onCapture</code> - Returns image data on capture</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Desktop Navigation System */}
      <section id="desktop-nav" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Desktop Navigation</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Complete desktop header system with top navigation, sub-nav, and status banners.</p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>DesktopHeader</CardTitle>
            <CardDescription>Main top navigation bar with logo, search, and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden [&_header]:!flex [&_header]:!static" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
              <DesktopHeader />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Sticky top navigation with Walmart branding. Uses semantic topnav tokens. Hidden on mobile (lg:hidden).
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>SubNav</CardTitle>
            <CardDescription>Secondary navigation bar with category links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden [&>div]:!flex" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
              <SubNav />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OrderStatusBanner</CardTitle>
            <CardDescription>Order notification banner displayed below navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden [&>div]:!flex" style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
              <OrderStatusBanner />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Icon Components */}
      <section id="icon-components" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Icon Components</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">Custom icon components with special behaviors and branding.</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CartIcon</CardTitle>
              <CardDescription>Shopping cart with badge count and price display</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-8 items-center justify-center py-4">
                <div className="flex flex-col items-center gap-2">
                  <CartIcon count={0} price="$0.00" textColor="#2E2F32" />
                  <span className="text-xs text-gray-500">Empty</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CartIcon count={3} price="$45.67" textColor="#2E2F32" />
                  <span className="text-xs text-gray-500">With items</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CartIcon count={99} price="$1,234.56" textColor="#2E2F32" />
                  <span className="text-xs text-gray-500">99+ items</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: 'var(--ld-semantic-color-topnav-background, #0053E2)' }}>
                  <CartIcon count={5} price="$89.99" textColor="white" />
                  <span className="text-xs text-white">On blue</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LocationIcon</CardTitle>
              <CardDescription>Map marker icon with configurable size and color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 items-end justify-center py-4">
                <div className="flex flex-col items-center gap-2">
                  <LocationIcon className="w-6 h-6 text-gray-700" />
                  <span className="text-xs text-gray-500">24px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LocationIcon className="w-8 h-8 text-blue-600" />
                  <span className="text-xs text-gray-500">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LocationIcon className="w-10 h-10 text-green-600" />
                  <span className="text-xs text-gray-500">40px</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sparky Mascot</CardTitle>
              <CardDescription>Walmart AI assistant mascot icons and animations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16">
                    <SparklesIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-700">SparklesIcon</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16">
                    <SparkyLookingDown />
                  </div>
                  <span className="text-sm font-medium text-gray-700">SparkyLookingDown</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 h-24">
                    <SparkyAnimation />
                  </div>
                  <span className="text-sm font-medium text-gray-700">SparkyAnimation</span>
                  <span className="text-xs text-gray-500">Lottie animation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ResponsiveLayout */}
      <section id="responsive-layout" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">ResponsiveLayout</h2>
          <LDTag color="gray">Custom</LDTag>
        </div>
        <p className="text-gray-600 mb-6">
          Layout wrapper that provides consistent page structure with desktop header, sub-nav, promotional banners, and mobile bottom navigation.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Layout Architecture</CardTitle>
            <CardDescription>How ResponsiveLayout organizes the page structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">DesktopHeader (lg:flex only)</div>
                <div className="bg-blue-100 text-blue-800 px-4 py-1.5 text-sm">SubNav</div>
                <div className="bg-yellow-50 text-yellow-800 px-4 py-1.5 text-sm">PromoBanner</div>
                <div className="bg-gray-50 text-gray-700 px-4 py-1.5 text-sm">OrderStatusBanner</div>
                <div className="bg-white text-gray-700 px-4 py-8 text-sm text-center border-t">
                  Main Content (children)
                </div>
                <div className="bg-white text-gray-700 px-4 py-2 text-sm border-t text-center">BottomNav (mobile only)</div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Props</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                    <code className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono shrink-0">showMobileNav</code>
                    <span className="text-gray-600">boolean (default: true) - Show/hide mobile bottom navigation</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                    <code className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono shrink-0">showDesktopHeader</code>
                    <span className="text-gray-600">boolean (default: true) - Show/hide desktop header, subnav, and banners</span>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                    <code className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono shrink-0">maxWidth</code>
                    <span className="text-gray-600">"sm" | "md" | "lg" | "xl" | "2xl" | "full" (default: "2xl") - Max width of content area</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Usage</h4>
                <pre className="p-3 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
                  <code>{`import { ResponsiveLayout } from "@/components/ResponsiveLayout";

// Full layout with all chrome
<ResponsiveLayout>
  <YourPageContent />
</ResponsiveLayout>

// Mobile only (no desktop header)
<ResponsiveLayout showDesktopHeader={false}>
  <YourPageContent />
</ResponsiveLayout>

// Convenience wrappers
import { MobileOnlyLayout, DesktopOnlyLayout } from "@/components/ResponsiveLayout";`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
