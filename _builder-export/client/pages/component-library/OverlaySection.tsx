import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import { DialogExample } from "@/components/examples/DialogExample";
import AlertDialogExample from "@/components/examples/AlertDialogExample";
import { PopoverExample } from "@/components/examples/PopoverExample";
import TooltipExample from "@/components/examples/TooltipExample";
import { DropdownMenuExample } from "@/components/examples/DropdownMenuExample";
import { ContextMenuExample } from "@/components/examples/ContextMenuExample";
import { DrawerExample } from "@/components/examples/DrawerExample";
import { ModalExample } from "@/components/examples/ModalExample";
import { BottomSheetExample } from "@/components/examples/BottomSheetExample";
import { SnackbarExample } from "@/components/examples/SnackbarExample";
import { ScrimExample } from "@/components/examples/ScrimExample";
import { NudgeExample } from "@/components/examples/NudgeExample";
import { CalloutExample } from "@/components/examples/CalloutExample";

export function OverlaySection() {
  return (
    <>
      {/* Dialog */}
      <section id="dialog" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Dialog</h2>
        <p className="text-gray-600 mb-6">Modal dialog windows with overlay backdrop.</p>
        <Card>
          <CardContent className="pt-6">
            <DialogExample />
          </CardContent>
        </Card>
      </section>

      {/* AlertDialog */}
      <section id="alert-dialog" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Alert Dialog</h2>
        <p className="text-gray-600 mb-6">Confirmation dialogs for destructive or important actions.</p>
        <Card>
          <CardContent className="pt-6">
            <AlertDialogExample />
          </CardContent>
        </Card>
      </section>

      {/* Modal */}
      <section id="modal" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Modal</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">LD 3.5 modal component with header, body, and footer sections.</p>
        <Card>
          <CardContent className="pt-6">
            <ModalExample />
          </CardContent>
        </Card>
      </section>

      {/* Bottom Sheet */}
      <section id="bottom-sheet" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Bottom Sheet</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Mobile-friendly bottom sheet overlays.</p>
        <Card>
          <CardContent className="pt-6">
            <BottomSheetExample />
          </CardContent>
        </Card>
      </section>

      {/* Tooltip / Callout */}
      <section id="tooltip" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Tooltip / Callout</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Informational tooltips and callout overlays.</p>
        <Card>
          <CardContent className="pt-6">
            <TooltipExample />
          </CardContent>
        </Card>
      </section>

      {/* Callout */}
      <section id="callout" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Callout</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Contextual callout components for highlighting information.</p>
        <Card>
          <CardContent className="pt-6">
            <CalloutExample />
          </CardContent>
        </Card>
      </section>

      {/* Popover */}
      <section id="popover" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Popover</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Floating content triggered by a button click.</p>
        <Card>
          <CardContent className="pt-6">
            <PopoverExample />
          </CardContent>
        </Card>
      </section>

      {/* Dropdown Menu */}
      <section id="dropdown-menu" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Dropdown Menu</h2>
        <p className="text-gray-600 mb-6">Contextual menus triggered by a button.</p>
        <Card>
          <CardContent className="pt-6">
            <DropdownMenuExample />
          </CardContent>
        </Card>
      </section>

      {/* Drawer */}
      <section id="drawer" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Drawer</h2>
        <p className="text-gray-600 mb-6">Bottom sheet drawer that slides up from the bottom of the screen.</p>
        <Card>
          <CardContent className="pt-6">
            <DrawerExample />
          </CardContent>
        </Card>
      </section>

      {/* Context Menu */}
      <section id="context-menu" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Context Menu</h2>
        <p className="text-gray-600 mb-6">Right-click context menus for additional actions.</p>
        <Card>
          <CardContent className="pt-6">
            <ContextMenuExample />
          </CardContent>
        </Card>
      </section>

      {/* Nudge */}
      <section id="nudge" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Nudge</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Contextual nudge overlays for guiding user actions.</p>
        <Card>
          <CardContent className="pt-6">
            <NudgeExample />
          </CardContent>
        </Card>
      </section>

      {/* Scrim */}
      <section id="scrim" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Scrim</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Background overlay for modal and drawer components.</p>
        <Card>
          <CardContent className="pt-6">
            <ScrimExample />
          </CardContent>
        </Card>
      </section>

      {/* Snackbar */}
      <section id="snackbar" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Snackbar</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Brief notification messages that appear temporarily.</p>
        <Card>
          <CardContent className="pt-6">
            <SnackbarExample />
          </CardContent>
        </Card>
      </section>

      {/* Toast */}
      <ToastSection />
    </>
  );
}

function ToastSection() {
  return (
    <section id="toast" className="mb-16 scroll-mt-8">
      <h2 className="text-3xl font-bold mb-4">Toast Notifications</h2>
      <p className="text-gray-600 mb-6">Brief notification messages using Sonner.</p>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() =>
                toast({
                  message: "Your changes have been saved successfully.",
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast({
                  message: "Something went wrong. Please try again.",
                })
              }
            >
              Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  message: "Great Value Cereal has been added.",
                })
              }
            >
              Info Toast
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
