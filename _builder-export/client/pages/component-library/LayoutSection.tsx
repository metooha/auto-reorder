import { Card, CardContent } from "@/components/ui/Card";
import { CardHeaderExample } from "@/components/examples/CardHeaderExample";
import { DividerExample } from "@/components/examples/DividerExample";
import AccordionExample from "@/components/examples/AccordionExample";
import CarouselExample from "@/components/examples/CarouselExample";
import CollapsibleExample from "@/components/examples/CollapsibleExample";
import ScrollAreaExample from "@/components/examples/ScrollAreaExample";
import CalendarExample from "@/components/examples/CalendarExample";
import { ListExample } from "@/components/examples/ListExample";
import { DatePickerExample } from "@/components/examples/DatePickerExample";
import { PanelExample } from "@/components/examples/PanelExample";
import { Separator } from "@/components/ui/Divider";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/Table";
import { LDTag } from "@/components/ui/Tag";

export function LayoutSection() {
  return (
    <>
      {/* Cards */}
      <section id="cards" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Cards</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Card containers for organizing content with header, content, and footer sections.</p>
        <Card>
          <CardContent className="pt-6">
            <CardHeaderExample />
          </CardContent>
        </Card>
      </section>

      {/* Separator / Divider */}
      <section id="separator" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Divider</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Visual dividers between content sections.</p>
        <Card>
          <CardContent className="pt-6">
            <DividerExample />
          </CardContent>
        </Card>
      </section>

      {/* Accordion */}
      <section id="accordion" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Accordion</h2>
        <p className="text-gray-600 mb-6">Collapsible content sections for organizing information.</p>
        <Card>
          <CardContent className="pt-6">
            <AccordionExample />
          </CardContent>
        </Card>
      </section>

      {/* Table */}
      <section id="table" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Table</h2>
        <p className="text-gray-600 mb-6">Structured data display in rows and columns.</p>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableCaption>A list of recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#3210</TableCell>
                  <TableCell><LDTag color="green">Delivered</LDTag></TableCell>
                  <TableCell>Olivia Martin</TableCell>
                  <TableCell className="text-right">$42.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#3209</TableCell>
                  <TableCell><LDTag color="blue">Shipped</LDTag></TableCell>
                  <TableCell>Ava Johnson</TableCell>
                  <TableCell className="text-right">$74.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#3208</TableCell>
                  <TableCell><LDTag color="gray">Processing</LDTag></TableCell>
                  <TableCell>Michael Chen</TableCell>
                  <TableCell className="text-right">$125.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#3207</TableCell>
                  <TableCell><LDTag color="red">Cancelled</LDTag></TableCell>
                  <TableCell>Lisa Anderson</TableCell>
                  <TableCell className="text-right">$19.50</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* List */}
      <section id="list" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">List</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Structured lists for displaying items with icons and actions.</p>
        <Card>
          <CardContent className="pt-6">
            <ListExample />
          </CardContent>
        </Card>
      </section>

      {/* Carousel */}
      <section id="carousel" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Carousel</h2>
        <p className="text-gray-600 mb-6">Scrollable content carousel with navigation controls.</p>
        <Card>
          <CardContent className="pt-6">
            <CarouselExample />
          </CardContent>
        </Card>
      </section>

      {/* Collapsible */}
      <section id="collapsible" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Collapsible</h2>
        <p className="text-gray-600 mb-6">Simple expandable container.</p>
        <Card>
          <CardContent className="pt-6">
            <CollapsibleExample />
          </CardContent>
        </Card>
      </section>

      {/* ScrollArea */}
      <section id="scroll-area" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Scroll Area</h2>
        <p className="text-gray-600 mb-6">Custom scrollable containers with styled scrollbars.</p>
        <Card>
          <CardContent className="pt-6">
            <ScrollAreaExample />
          </CardContent>
        </Card>
      </section>

      {/* Calendar / DatePicker */}
      <section id="calendar" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Calendar</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Date picker calendar component for selecting dates.</p>
        <Card>
          <CardContent className="pt-6">
            <CalendarExample />
          </CardContent>
        </Card>
      </section>

      {/* DatePicker */}
      <section id="date-picker" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Date Picker</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Combined date field and calendar for date selection.</p>
        <Card>
          <CardContent className="pt-6">
            <DatePickerExample />
          </CardContent>
        </Card>
      </section>

      {/* Panel */}
      <section id="panel" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Panel</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Resizable side panels for detail views and configuration.</p>
        <Card>
          <CardContent className="pt-6">
            <PanelExample />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
