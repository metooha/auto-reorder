import { ButtonExample } from "@/components/examples/ButtonExample";
import IconButtonExample from "@/components/examples/IconButtonExample";
import { LinkButtonExample } from "@/components/examples/LinkButtonExample";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export function ButtonsSection() {
  return (
    <>
      <section id="buttons" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Buttons</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Button components following Living Design 3.5 specifications.</p>
        <Card>
          <CardContent className="pt-6">
            <ButtonExample />
          </CardContent>
        </Card>
      </section>

      <section id="icon-buttons" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Icon Buttons</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Icon-only buttons for actions that don't require text labels.</p>
        <Card>
          <CardContent className="pt-6">
            <IconButtonExample />
          </CardContent>
        </Card>
      </section>

      <section id="link-buttons" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Link Buttons</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Anchor-styled buttons for navigation and link actions.</p>
        <Card>
          <CardContent className="pt-6">
            <LinkButtonExample />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
