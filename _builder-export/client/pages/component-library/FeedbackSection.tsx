import { Card, CardContent } from "@/components/ui/Card";
import { AlertExample } from "@/components/examples/AlertExample";
import { BadgeExample } from "@/components/examples/BadgeExample";
import { TagExample } from "@/components/examples/TagExample";
import AvatarExample from "@/components/examples/AvatarExample";
import ProgressExample from "@/components/examples/ProgressExample";
import SkeletonExample from "@/components/examples/SkeletonExample";
import { SpinnerExample } from "@/components/examples/SpinnerExample";
import { RatingExample } from "@/components/examples/RatingExample";
import { MetricExample } from "@/components/examples/MetricExample";
import { ChipExample } from "@/components/examples/ChipExample";
import { ContentMessageExample } from "@/components/examples/ContentMessageExample";
import { SpotIconExample } from "@/components/examples/SpotIconExample";

export function FeedbackSection() {
  return (
    <>
      {/* Alerts */}
      <section id="alerts" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Alerts</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Alert messages for different contexts and severity levels.</p>
        <Card>
          <CardContent className="pt-6">
            <AlertExample />
          </CardContent>
        </Card>
      </section>

      {/* Tags */}
      <section id="tags" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Tags</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Labels and status indicators with semantic colors.</p>
        <Card>
          <CardContent className="pt-6">
            <TagExample />
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section id="badges" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Badges</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Count indicators and status badges.</p>
        <Card>
          <CardContent className="pt-6">
            <BadgeExample />
          </CardContent>
        </Card>
      </section>

      {/* Chips */}
      <section id="chips" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Chips</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Interactive chip components for selections and filters.</p>
        <Card>
          <CardContent className="pt-6">
            <ChipExample />
          </CardContent>
        </Card>
      </section>

      {/* Avatars */}
      <section id="avatars" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Avatars</h2>
        <p className="text-gray-600 mb-6">User profile images with fallback initials.</p>
        <Card>
          <CardContent className="pt-6">
            <AvatarExample />
          </CardContent>
        </Card>
      </section>

      {/* Progress */}
      <section id="progress" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Progress Indicator</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Progress bars for indicating completion status.</p>
        <Card>
          <CardContent className="pt-6">
            <ProgressExample />
          </CardContent>
        </Card>
      </section>

      {/* Spinner */}
      <section id="spinner" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Spinner</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Loading spinners for indicating async operations.</p>
        <Card>
          <CardContent className="pt-6">
            <SpinnerExample />
          </CardContent>
        </Card>
      </section>

      {/* Skeletons */}
      <section id="skeletons" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Skeletons</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Loading placeholders that mimic content layout.</p>
        <Card>
          <CardContent className="pt-6">
            <SkeletonExample />
          </CardContent>
        </Card>
      </section>

      {/* Rating */}
      <section id="rating" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Rating</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Star rating display component.</p>
        <Card>
          <CardContent className="pt-6">
            <RatingExample />
          </CardContent>
        </Card>
      </section>

      {/* Metric */}
      <section id="metric" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Metric</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Display metrics and KPIs with labels and trends.</p>
        <Card>
          <CardContent className="pt-6">
            <MetricExample />
          </CardContent>
        </Card>
      </section>

      {/* Content Message */}
      <section id="content-message" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Content Message</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Content message components for empty states and informational displays.</p>
        <Card>
          <CardContent className="pt-6">
            <ContentMessageExample />
          </CardContent>
        </Card>
      </section>

      {/* Spot Icon */}
      <section id="spot-icon" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Spot Icon</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Decorative spot icons for empty states and illustrations.</p>
        <Card>
          <CardContent className="pt-6">
            <SpotIconExample />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
