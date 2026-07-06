import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/Toggle";
import { Separator } from "@/components/ui/Divider";
import { HeartIcon, StarIcon, BellIcon, GridIcon, ListIcon } from "@/components/icons";

export function InteractiveSection() {
  return (
    <>
      {/* Toggle */}
      <section id="toggle" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Toggle</h2>
        <p className="text-gray-600 mb-6">Two-state buttons that can be toggled on and off.</p>

        <Card>
          <CardHeader>
            <CardTitle>Toggle Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Default Toggle</h4>
              <div className="flex flex-wrap gap-2">
                <Toggle aria-label="Toggle bold">
                  <span className="font-bold">B</span>
                </Toggle>
                <Toggle aria-label="Toggle italic">
                  <span className="italic">I</span>
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <span className="underline">U</span>
                </Toggle>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Outline Variant</h4>
              <div className="flex flex-wrap gap-2">
                <Toggle variant="outline" aria-label="Toggle favorite">
                  <HeartIcon className="w-4 h-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle star">
                  <StarIcon className="w-4 h-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle notifications">
                  <BellIcon className="w-4 h-4" />
                </Toggle>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Sizes</h4>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle size="sm" aria-label="Small toggle">
                  <HeartIcon className="w-3 h-3" />
                </Toggle>
                <Toggle size="default" aria-label="Default toggle">
                  <HeartIcon className="w-4 h-4" />
                </Toggle>
                <Toggle size="lg" aria-label="Large toggle">
                  <HeartIcon className="w-5 h-5" />
                </Toggle>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Toggle Group */}
      <section id="toggle-group" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Toggle Group</h2>
        <p className="text-gray-600 mb-6">A group of toggle buttons where one or multiple can be selected.</p>

        <Card>
          <CardHeader>
            <CardTitle>Toggle Group Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Single Selection</h4>
              <ToggleGroup type="single" defaultValue="grid">
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <GridIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <ListIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Multiple Selection</h4>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <span className="font-bold">B</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <span className="italic">I</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <span className="underline">U</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Outline Variant</h4>
              <ToggleGroup type="single" variant="outline" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
                <ToggleGroupItem value="c">Option C</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
