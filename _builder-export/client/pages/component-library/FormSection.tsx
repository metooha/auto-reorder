import { Card, CardContent } from "@/components/ui/Card";
import { TextFieldExample } from "@/components/examples/TextFieldExample";
import { CheckboxExample } from "@/components/examples/CheckboxExample";
import SwitchExample from "@/components/examples/SwitchExample";
import { RadioExample } from "@/components/examples/RadioExample";
import SliderExample from "@/components/examples/SliderExample";
import TextareaExample from "@/components/examples/TextareaExample";
import { FormGroupExample } from "@/components/examples/FormGroupExample";
import { QuantityStepperExample } from "@/components/examples/QuantityStepperExample";
import { DateFieldExample } from "@/components/examples/DateFieldExample";
import { LabelExample } from "@/components/examples/LabelExample";
import { Separator } from "@/components/ui/Divider";
import { Label } from "@/components/ui/Heading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

export function FormSection() {
  return (
    <>
      {/* TextField */}
      <section id="inputs" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Text Fields</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Text input fields following Living Design 3.5 specifications.</p>
        <Card>
          <CardContent className="pt-6">
            <TextFieldExample />
          </CardContent>
        </Card>
      </section>

      {/* TextArea */}
      <section id="textarea" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Text Area</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Multi-line text input areas.</p>
        <Card>
          <CardContent className="pt-6">
            <TextareaExample />
          </CardContent>
        </Card>
      </section>

      {/* Checkboxes */}
      <section id="checkboxes" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Checkboxes</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Selection controls for multiple choices.</p>
        <Card>
          <CardContent className="pt-6">
            <CheckboxExample />
          </CardContent>
        </Card>
      </section>

      {/* Switches */}
      <section id="switches" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Switches</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Toggle switches for on/off states.</p>
        <Card>
          <CardContent className="pt-6">
            <SwitchExample />
          </CardContent>
        </Card>
      </section>

      {/* Radio */}
      <section id="radio" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Radio Groups</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Single selection from multiple options.</p>
        <Card>
          <CardContent className="pt-6">
            <RadioExample />
          </CardContent>
        </Card>
      </section>

      {/* Selects - keeping Shadcn select since LD 3.5 Select component not yet available */}
      <section id="selects" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Selects</h2>
        <p className="text-gray-600 mb-6">Dropdown selection menus.</p>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Choose a fruit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sliders */}
      <section id="sliders" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-4">Sliders</h2>
        <p className="text-gray-600 mb-6">Range input controls.</p>
        <Card>
          <CardContent className="pt-6">
            <SliderExample />
          </CardContent>
        </Card>
      </section>

      {/* Date Field */}
      <section id="date-field" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Date Field</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Date input fields with formatting and validation.</p>
        <Card>
          <CardContent className="pt-6">
            <DateFieldExample />
          </CardContent>
        </Card>
      </section>

      {/* Form Group */}
      <section id="form-group" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Form Group</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Form field grouping with labels, helper text, and error states.</p>
        <Card>
          <CardContent className="pt-6">
            <FormGroupExample />
          </CardContent>
        </Card>
      </section>

      {/* Quantity Stepper */}
      <section id="quantity-stepper" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Quantity Stepper</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Numeric input with increment/decrement controls.</p>
        <Card>
          <CardContent className="pt-6">
            <QuantityStepperExample />
          </CardContent>
        </Card>
      </section>

      {/* Label */}
      <section id="labels" className="mb-16 scroll-mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-3xl font-bold">Labels</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">LD 3.5</span>
        </div>
        <p className="text-gray-600 mb-6">Form labels with various states and configurations.</p>
        <Card>
          <CardContent className="pt-6">
            <LabelExample />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
