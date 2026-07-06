import { Card, CardContent } from "@/components/ui/Card";
import { TabExample } from "@/components/examples/TabExample";
import { BreadcrumbExample } from "@/components/examples/BreadcrumbExample";
import { PaginationExample } from "@/components/examples/PaginationExample";
import { SegmentedControlExample } from "@/components/examples/SegmentedControlExample";

export function NavigationSection() {
  return (
    <>
      {/* Tabs */}
      <section id="tabs" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Tabs</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Tabbed navigation for switching between content panels.</p>
        <Card>
          <CardContent className="pt-6">
            <TabExample />
          </CardContent>
        </Card>
      </section>

      {/* Breadcrumb */}
      <section id="breadcrumb" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Breadcrumb</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Path-based navigation showing the current location.</p>
        <Card>
          <CardContent className="pt-6">
            <BreadcrumbExample />
          </CardContent>
        </Card>
      </section>

      {/* Pagination */}
      <section id="pagination" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Pagination</h2>
        <p className="text-gray-600 mb-6">Page navigation for paginated content.</p>
        <Card>
          <CardContent className="pt-6">
            <PaginationExample />
          </CardContent>
        </Card>
      </section>

      {/* Segmented Control */}
      <section id="segmented-control" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Segmented Control</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Segmented controls for switching between views or filtering content.</p>
        <Card>
          <CardContent className="pt-6">
            <SegmentedControlExample />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
