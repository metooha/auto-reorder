import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/TextField";
import { LDTag } from "@/components/ui/Tag";
import { Separator } from "@/components/ui/Divider";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  SearchIcon,
  HeartIcon,
  HeartFillIcon,
  CartIcon as LDCartIcon,
  CartFillIcon,
  HomeIcon,
  UserIcon,
  UserCircleIcon,
  UserFillIcon,
  BellIcon,
  GearIcon,
  CheckIcon,
  CheckCircleIcon,
  CheckCircleFillIcon,
  CloseIcon,
  CloseCircleFillIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  StarFillIcon,
  StarHalfIcon,
  InfoCircleIcon,
  InfoCircleFillIcon,
  ExclamationCircleIcon,
  ExclamationCircleFillIcon,
  WarningIcon,
  WarningFillIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  MinusIcon,
  FilterIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  MapIcon,
  PhoneIcon,
  EmailIcon,
  LockIcon,
  LockOpenIcon,
  EyeIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  LinkExternalIcon,
  CameraIcon,
  ImageIcon,
  MicrophoneIcon,
  GlobeIcon,
  PrinterIcon,
  RefreshIcon,
  ExpandIcon,
  MenuIcon,
  MoreIcon,
  GridIcon,
  ListIcon,
  TagIcon,
  GiftIcon,
  GiftFillIcon,
  WalletIcon,
  CardIcon,
  DollarIcon,
  ShippingIcon,
  TruckIcon,
  StoreIcon,
  StoreFillIcon,
  BoxIcon,
  BarcodeIcon,
  QrCodeIcon,
  ShoppingBagIcon,
  ShoppingBagFillIcon,
  ReorderIcon,
  HistoryIcon,
  FlagIcon,
  PinIcon,
  NoteIcon,
  PageIcon,
  SaveIcon,
  KeyIcon,
  SignInIcon,
  SignOutIcon,
  UserPlusIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  ThumbUpFillIcon,
  ThumbDownFillIcon,
  PlayIcon,
  PauseIcon,
  SparkIcon,
} from "@/components/icons";

interface IconEntry {
  name: string;
  component: React.ComponentType<{ className?: string }>;
  category: string;
}

const ALL_ICONS: IconEntry[] = [
  // Navigation
  { name: "Home", component: HomeIcon, category: "Navigation" },
  { name: "Search", component: SearchIcon, category: "Navigation" },
  { name: "Menu", component: MenuIcon, category: "Navigation" },
  { name: "More", component: MoreIcon, category: "Navigation" },
  { name: "ChevronDown", component: ChevronDownIcon, category: "Navigation" },
  { name: "ChevronUp", component: ChevronUpIcon, category: "Navigation" },
  { name: "ChevronLeft", component: ChevronLeftIcon, category: "Navigation" },
  { name: "ChevronRight", component: ChevronRightIcon, category: "Navigation" },
  { name: "ArrowDown", component: ArrowDownIcon, category: "Navigation" },
  { name: "ArrowUp", component: ArrowUpIcon, category: "Navigation" },
  { name: "ArrowLeft", component: ArrowLeftIcon, category: "Navigation" },
  { name: "ArrowRight", component: ArrowRightIcon, category: "Navigation" },
  { name: "Expand", component: ExpandIcon, category: "Navigation" },
  { name: "LinkExternal", component: LinkExternalIcon, category: "Navigation" },
  { name: "Grid", component: GridIcon, category: "Navigation" },
  { name: "List", component: ListIcon, category: "Navigation" },
  { name: "Refresh", component: RefreshIcon, category: "Navigation" },
  { name: "Close", component: CloseIcon, category: "Navigation" },

  // User & Account
  { name: "User", component: UserIcon, category: "User" },
  { name: "UserCircle", component: UserCircleIcon, category: "User" },
  { name: "UserFill", component: UserFillIcon, category: "User" },
  { name: "UserPlus", component: UserPlusIcon, category: "User" },
  { name: "SignIn", component: SignInIcon, category: "User" },
  { name: "SignOut", component: SignOutIcon, category: "User" },
  { name: "Lock", component: LockIcon, category: "User" },
  { name: "LockOpen", component: LockOpenIcon, category: "User" },
  { name: "Key", component: KeyIcon, category: "User" },

  // Actions
  { name: "Heart", component: HeartIcon, category: "Actions" },
  { name: "HeartFill", component: HeartFillIcon, category: "Actions" },
  { name: "Star", component: StarIcon, category: "Actions" },
  { name: "StarFill", component: StarFillIcon, category: "Actions" },
  { name: "StarHalf", component: StarHalfIcon, category: "Actions" },
  { name: "ThumbUp", component: ThumbUpIcon, category: "Actions" },
  { name: "ThumbUpFill", component: ThumbUpFillIcon, category: "Actions" },
  { name: "ThumbDown", component: ThumbDownIcon, category: "Actions" },
  { name: "ThumbDownFill", component: ThumbDownFillIcon, category: "Actions" },
  { name: "Share", component: ShareIcon, category: "Actions" },
  { name: "Download", component: DownloadIcon, category: "Actions" },
  { name: "Upload", component: UploadIcon, category: "Actions" },
  { name: "Save", component: SaveIcon, category: "Actions" },
  { name: "Trash", component: TrashIcon, category: "Actions" },
  { name: "Pencil", component: PencilIcon, category: "Actions" },
  { name: "Plus", component: PlusIcon, category: "Actions" },
  { name: "Minus", component: MinusIcon, category: "Actions" },
  { name: "Filter", component: FilterIcon, category: "Actions" },
  { name: "Printer", component: PrinterIcon, category: "Actions" },
  { name: "Play", component: PlayIcon, category: "Actions" },
  { name: "Pause", component: PauseIcon, category: "Actions" },

  // Status & Feedback
  { name: "Check", component: CheckIcon, category: "Status" },
  { name: "CheckCircle", component: CheckCircleIcon, category: "Status" },
  { name: "CheckCircleFill", component: CheckCircleFillIcon, category: "Status" },
  { name: "CloseCircleFill", component: CloseCircleFillIcon, category: "Status" },
  { name: "InfoCircle", component: InfoCircleIcon, category: "Status" },
  { name: "InfoCircleFill", component: InfoCircleFillIcon, category: "Status" },
  { name: "ExclamationCircle", component: ExclamationCircleIcon, category: "Status" },
  { name: "ExclamationCircleFill", component: ExclamationCircleFillIcon, category: "Status" },
  { name: "Warning", component: WarningIcon, category: "Status" },
  { name: "WarningFill", component: WarningFillIcon, category: "Status" },
  { name: "Bell", component: BellIcon, category: "Status" },
  { name: "Spark", component: SparkIcon, category: "Status" },

  // Commerce
  { name: "Cart", component: CartFillIcon, category: "Commerce" },
  { name: "ShoppingBag", component: ShoppingBagIcon, category: "Commerce" },
  { name: "ShoppingBagFill", component: ShoppingBagFillIcon, category: "Commerce" },
  { name: "Store", component: StoreIcon, category: "Commerce" },
  { name: "StoreFill", component: StoreFillIcon, category: "Commerce" },
  { name: "Tag", component: TagIcon, category: "Commerce" },
  { name: "Gift", component: GiftIcon, category: "Commerce" },
  { name: "GiftFill", component: GiftFillIcon, category: "Commerce" },
  { name: "Dollar", component: DollarIcon, category: "Commerce" },
  { name: "Wallet", component: WalletIcon, category: "Commerce" },
  { name: "CreditCard", component: CardIcon, category: "Commerce" },
  { name: "Barcode", component: BarcodeIcon, category: "Commerce" },
  { name: "QrCode", component: QrCodeIcon, category: "Commerce" },
  { name: "Shipping", component: ShippingIcon, category: "Commerce" },
  { name: "Truck", component: TruckIcon, category: "Commerce" },
  { name: "Box", component: BoxIcon, category: "Commerce" },
  { name: "Reorder", component: ReorderIcon, category: "Commerce" },

  // Communication
  { name: "Phone", component: PhoneIcon, category: "Communication" },
  { name: "Email", component: EmailIcon, category: "Communication" },
  { name: "Globe", component: GlobeIcon, category: "Communication" },
  { name: "Microphone", component: MicrophoneIcon, category: "Communication" },

  // Content
  { name: "Calendar", component: CalendarIcon, category: "Content" },
  { name: "Clock", component: ClockIcon, category: "Content" },
  { name: "Location", component: LocationIcon, category: "Content" },
  { name: "Map", component: MapIcon, category: "Content" },
  { name: "Camera", component: CameraIcon, category: "Content" },
  { name: "Image", component: ImageIcon, category: "Content" },
  { name: "Eye", component: EyeIcon, category: "Content" },
  { name: "Flag", component: FlagIcon, category: "Content" },
  { name: "Note", component: NoteIcon, category: "Content" },
  { name: "Page", component: PageIcon, category: "Content" },
  { name: "History", component: HistoryIcon, category: "Content" },
  { name: "Gear", component: GearIcon, category: "Content" },
];

const ICON_CATEGORIES = [
  "All",
  "Navigation",
  "User",
  "Actions",
  "Status",
  "Commerce",
  "Communication",
  "Content",
];

export function IconBrowserSection() {
  const [iconSearch, setIconSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIcons = useMemo(() => {
    return ALL_ICONS.filter((icon) => {
      const matchesSearch = icon.name.toLowerCase().includes(iconSearch.toLowerCase());
      const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [iconSearch, selectedCategory]);

  return (
    <section id="icons" className="mb-16 scroll-mt-8">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold">Icon Library</h2>
        <LDTag color="brand">LD 3.5</LDTag>
        <LDTag color="gray">366+ icons</LDTag>
      </div>
      <p className="text-gray-600 mb-6">
        Living Design 3.5 icon set. All icons are React components that accept standard SVG props.
        Import from <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">@/components/icons</code>.
      </p>

      {/* Search & Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search icons..."
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {ICON_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 text-xs opacity-70">
                    ({ALL_ICONS.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Icon Grid */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""} found
          </CardTitle>
          <CardDescription>Click an icon to copy its import statement</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredIcons.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <SearchIcon className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>No icons match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1">
              {filteredIcons.map((icon) => {
                const IconComp = icon.component;
                return (
                  <button
                    key={icon.name}
                    className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer"
                    onClick={() => {
                      const importStr = `import { ${icon.name}Icon } from "@/components/icons";`;
                      navigator.clipboard.writeText(importStr).catch(() => {});
                    }}
                    title={`Copy: import { ${icon.name}Icon } from "@/components/icons"`}
                  >
                    <IconComp className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    <span className="text-[10px] text-gray-500 text-center leading-tight group-hover:text-blue-600 truncate w-full">
                      {icon.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Icon Sizing */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Icon Sizing</CardTitle>
          <CardDescription>Icons scale with Tailwind width/height classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-8 justify-center py-4">
            <div className="flex flex-col items-center gap-2">
              <SearchIcon className="w-4 h-4 text-gray-700" />
              <span className="text-xs text-gray-500">16px (w-4)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SearchIcon className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-500">20px (w-5)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SearchIcon className="w-6 h-6 text-gray-700" />
              <span className="text-xs text-gray-500">24px (w-6)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SearchIcon className="w-8 h-8 text-gray-700" />
              <span className="text-xs text-gray-500">32px (w-8)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SearchIcon className="w-10 h-10 text-gray-700" />
              <span className="text-xs text-gray-500">40px (w-10)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Inheritance */}
      <Card>
        <CardHeader>
          <CardTitle>Color Inheritance</CardTitle>
          <CardDescription>Icons inherit text color from parent elements via currentColor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 justify-center py-4">
            <div className="flex flex-col items-center gap-2">
              <HeartIcon className="w-8 h-8 text-gray-700" />
              <span className="text-xs text-gray-500">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HeartIcon className="w-8 h-8 text-blue-600" />
              <span className="text-xs text-gray-500">Blue</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HeartIcon className="w-8 h-8 text-red-500" />
              <span className="text-xs text-gray-500">Red</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <HeartIcon className="w-8 h-8 text-green-600" />
              <span className="text-xs text-gray-500">Green</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-blue-600 p-3 rounded-lg">
              <HeartIcon className="w-8 h-8 text-white" />
              <span className="text-xs text-white">On blue</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
