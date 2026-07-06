import React from 'react';
import { InfoCircle, Star, Search } from '@/components/icons';
import { PreviewFrame } from './previews/PreviewFrame';
import * as LD from './previews/LDComponentPreviews';
import * as Shared from './previews/SharedComponentPreviews';

/* ─── Fallback ─── */
function GenericPreview({ icon }: { icon: string }) {
  const Icon = ({
    ArrowRight: InfoCircle, BarGraph: InfoCircle, Box: InfoCircle, Calendar: InfoCircle,
    Chat: InfoCircle, Check: InfoCircle, ChevronDown: InfoCircle, Circle: InfoCircle,
    Edit: InfoCircle, ExclamationCircle: InfoCircle, Filter: InfoCircle, InfoCircle,
    Link: InfoCircle, List: InfoCircle, Magic: Star, Menu: InfoCircle,
    Minus: InfoCircle, Note: InfoCircle, PanelLeft: InfoCircle, Refresh: InfoCircle,
    Search, Settings: InfoCircle, Star, Tag: InfoCircle,
  } as Record<string, React.ComponentType<{ style?: React.CSSProperties }>>)[icon] || InfoCircle;

  return (
    <PreviewFrame>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: 'var(--ld-semantic-color-fill-subtle, #F5F5F6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon style={{ width: 24, height: 24, color: 'var(--ld-semantic-color-text-subtle, #74767C)' }} />
      </div>
    </PreviewFrame>
  );
}

/* ─── Preview registry ─── */
const PREVIEW_MAP: Record<string, React.FC> = {
  // LD Components
  'Alerts': LD.AlertsPreview,
  'Badges': LD.BadgesPreview,
  'Breadcrumbs': LD.BreadcrumbsPreview,
  'Buttons': LD.ButtonsPreview,
  'Cards': LD.CardsPreview,
  'Checkboxes': LD.CheckboxesPreview,
  'Chips': LD.ChipsPreview,
  'Content Messages': LD.ContentMessagesPreview,
  'Date Fields': LD.DateFieldsPreview,
  'Date Pickers': LD.DatePickersPreview,
  'Dividers': LD.DividersPreview,
  'Filter Chips': LD.FilterChipsPreview,
  'Form Groups': LD.FormGroupsPreview,
  'Icon Buttons': LD.IconButtonsPreview,
  'Icons': LD.IconsPreview,
  'Link Buttons': LD.LinkButtonsPreview,
  'Links': LD.LinksPreview,
  'Lists': LD.ListsPreview,
  'Magic Box': LD.MagicBoxPreview,
  'Menu': LD.MenuPreview,
  'Metrics': LD.MetricsPreview,
  'Modals': LD.ModalsPreview,
  'Nudges': LD.NudgesPreview,
  'Panels': LD.PanelsPreview,
  'Progress Indicator': LD.ProgressIndicatorPreview,
  'Progress Tracker': LD.ProgressTrackerPreview,
  'Radio Buttons': LD.RadioButtonsPreview,
  'Select': LD.SelectPreview,
  'Snackbars': LD.SnackbarsPreview,
  'Spinners': LD.SpinnersPreview,
  'Spot Icons': LD.SpotIconsPreview,
  'Switches': LD.SwitchesPreview,
  'Tab Navigation': LD.TabsPreview,
  'Tags': LD.TagsPreview,
  'Text Area': LD.TextAreaPreview,
  'Text Fields': LD.TextFieldsPreview,
  'Table': LD.TablePreview,
  'Callouts': LD.CalloutsPreview,
  'Bottom Sheet': LD.BottomSheetPreview,
  'Skeleton': LD.SkeletonPreview,
  'Basic Banner': LD.BasicBannerPreview,
  'Segmented Control': LD.SegmentedControlPreview,
  'Quantity Stepper': LD.QuantityStepperPreview,
  'Order Card Patterns': LD.OrderCardPatternsPreview,
  'Floating Button': LD.FloatingButtonPreview,
  'Queue Banner': LD.QueueBannerPreview,
  'Heart View': LD.HeartViewPreview,
  'Rich Snackbar': LD.RichSnackbarPreview,
  'Timer View': LD.TimerViewPreview,
  'Search Bar': LD.SearchBarPreview,
  'Signature Capture': LD.SignatureCapturePreview,
  'Upload Image': LD.UploadImagePreview,
  'Country Select': LD.CountrySelectPreview,
  'Flag': LD.FlagPreview,
  'Ratings': LD.RatingsPreview,
  'Button Groups': LD.ButtonGroupsPreview,
  'Rich Media Sheet': LD.RichMediaSheetPreview,
  'Item Tile': LD.ItemTilePreview,
  'Dropdowns': LD.DropdownsPreview,
  'Search & Utility': LD.SearchUtilityPreview,
  // Shared Components
  'Accordion': Shared.AccordionPreview,
  'Alert Dialog': Shared.AlertDialogPreview,
  'Avatar': Shared.AvatarPreview,
  'Calendar': Shared.CalendarPreview,
  'Carousel': Shared.CarouselPreview,
  'Chart': Shared.ChartPreview,
  'Command': Shared.CommandPreview,
  'Context Menu': Shared.ContextMenuPreview,
  'Dialog': Shared.DialogPreview,
  'Dropdown Menu': Shared.DropdownMenuPreview,
  'Form': Shared.FormPreview,
  'Menubar': Shared.MenubarPreview,
  'Navigation Menu': Shared.NavigationMenuPreview,
  'Pagination': Shared.PaginationPreview,
  'Popover': Shared.PopoverPreview,
  'Progress': Shared.ProgressPreview,
  'Radio Group': Shared.RadioGroupPreview,
  'Scroll Area': Shared.ScrollAreaPreview,
  'Separator': Shared.SeparatorPreview,
  'Sheet': Shared.SheetPreview,
  'Slider': Shared.SliderPreview,
  'Switch': Shared.SwitchPreview,
  'Toast': Shared.ToastPreview,
  'Toggle': Shared.TogglePreview,
  'Date Range Picker': Shared.DateRangePickerPreview,
  'Collapsible': Shared.CollapsiblePreview,
};

export function getComponentPreview(title: string, icon: string): React.ReactNode {
  const Preview = PREVIEW_MAP[title];
  if (Preview) return <Preview />;
  return <GenericPreview icon={icon} />;
}
