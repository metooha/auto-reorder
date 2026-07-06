import { useState, useEffect } from 'react';
import { X } from '@/components/icons';
import styles from './MegaNav.module.css';

// ── Data ────────────────────────────────────────────────────────────────────

interface SubGroup {
  heading?: string;
  items: string[];
}

interface Category {
  label: string;
  subGroups: SubGroup[];
}

const DEPARTMENTS: Category[] = [
  {
    label: 'All Departments',
    subGroups: [{ items: ['Electronics', 'Toys', 'Home', 'Clothing & Accessories', 'Seasonal Décor', 'Video Games', 'Kitchen & Dining', 'Food', 'Patio & Garden', 'Baby', 'Sports & Outdoors', 'Auto', 'Beauty', 'Home Improvement', 'Books, Movies & Music', 'Outdoor Play', 'Wellness & Personal Care', 'Pets', 'Clearance', 'Manufacturer Offers', 'Flash Deals'] }],
  },
  {
    label: 'Grocery',
    subGroups: [{ items: ['Electronics', 'Toys', 'Home', 'Clothing & Accessories', 'Seasonal Décor', 'Video Games', 'Kitchen & Dining', 'Food', 'Patio & Garden', 'Baby', 'Sports & Outdoors', 'Auto', 'Beauty', 'Home Improvement', 'Books, Movies & Music', 'Outdoor Play', 'Wellness & Personal Care', 'Pets', 'Clearance', 'Manufacturer Offers', 'Flash Deals', 'Restored tech and home'] }],
  },
  { label: 'Spring Shop', subGroups: [{ items: ['Patio & Garden', 'Outdoor Furniture', 'Gardening', 'Spring Cleaning', 'Outdoor Toys'] }] },
  { label: 'Home, Garden & Tools', subGroups: [{ items: ['Furniture', 'Bedding', 'Bath', 'Kitchen', 'Patio & Garden', 'Tools', 'Lighting', 'Rugs', 'Wall Art', 'Storage'] }] },
  { label: 'Clothing, Shoes & Accessories', subGroups: [{ items: ["Women's Clothing", "Men's Clothing", "Kids' Clothing", 'Baby Clothing', 'Shoes', 'Handbags', 'Jewelry', 'Watches', 'Sunglasses'] }] },
  { label: 'Electronics', subGroups: [{ items: ['TVs', 'Computers', 'Tablets', 'Phones', 'Cameras', 'Video Games', 'Headphones', 'Smart Home', 'Car Electronics'] }] },
  { label: 'Baby', subGroups: [{ items: ['Car Seats', 'Strollers', 'Nursery', 'Feeding', 'Baby Clothes', 'Diapers', 'Baby Gear', 'Baby Toys'] }] },
  { label: 'Kids', subGroups: [{ items: ['Toys', "Kids' Clothing", 'School Supplies', 'Kids Room', 'Bikes & Ride-Ons', 'Sports'] }] },
  { label: 'Toys & Video Games', subGroups: [{ items: ['Action Figures', 'Arts & Crafts', 'Building Toys', 'Dolls', 'Outdoor Play', 'Video Games', 'Gaming Consoles', 'Board Games'] }] },
  { label: 'Pharmacy, Health & Wellness', subGroups: [{ items: ['Vitamins', 'Cold & Flu', 'First Aid', 'Medical Supplies', 'Personal Care', 'Fitness', 'Sexual Wellness'] }] },
  { label: 'Beauty', subGroups: [{ items: ['Makeup', 'Skincare', 'Hair Care', 'Fragrance', 'Nail Care', 'Bath & Body', 'Men\'s Grooming'] }] },
  { label: 'Personal Care', subGroups: [{ items: ['Oral Care', 'Deodorant', 'Shaving', 'Feminine Care', 'Contact Lenses', 'Cotton Balls & Swabs'] }] },
  { label: 'Auto & Tires', subGroups: [{ items: ['Car Tires', 'Car Parts', 'Car Electronics', 'Car Care', 'Tools & Equipment', 'Truck Parts'] }] },
  { label: 'Sports & Outdoors', subGroups: [{ items: ['Exercise & Fitness', 'Outdoor Sports', 'Team Sports', 'Water Sports', 'Hunting & Fishing', 'Bikes'] }] },
  { label: 'Pets', subGroups: [{ items: ['Dog', 'Cat', 'Fish & Aquarium', 'Bird', 'Small Animal', 'Reptile'] }] },
  { label: 'Household Essentials', subGroups: [{ items: ['Cleaning Supplies', 'Paper & Plastic', 'Laundry', 'Air Fresheners', 'Storage'] }] },
  { label: 'Seasonal Decor & Party Supplies', subGroups: [{ items: ['Holiday Decor', 'Party Supplies', 'Balloons', 'Gift Wrap', 'Candles'] }] },
  { label: 'School, Office & Art Supplies', subGroups: [{ items: ['Notebooks', 'Pens & Pencils', 'Art Supplies', 'Calculators', 'Backpacks', 'Folders'] }] },
  { label: 'Movies, Music & Books', subGroups: [{ items: ['Movies', 'Music', 'Books', 'eBooks', 'Magazines'] }] },
  { label: 'Gift Cards', subGroups: [{ items: ['Walmart Gift Cards', 'Google Play', 'iTunes', 'Gaming Gift Cards', 'Restaurant Gift Cards'] }] },
];

const SERVICES: Category[] = [
  {
    label: 'All Services',
    subGroups: [
      { heading: 'Pharmacy', items: ['Pharmacy Home', 'Pharmacy Delivery', 'Refill Prescriptions', 'Transfer Prescriptions', 'Find a Pharmacy', '$4 Prescriptions', 'Pet Pharmacy'] },
      { heading: 'Vaccines', items: ['Schedule now', 'All vaccines', 'COVID-19', 'Flu', 'Measles, Mumps, & Rubella (MMR)'] },
      { heading: 'Health Services', items: ['Birth Control Prescribing', 'Testing & Treatment: Strep Throat, Flu & COVID-19'] },
    ],
  },
  { label: 'Auto Care Center Services', subGroups: [{ items: ['Oil Change', 'Tire Installation', 'Battery Services', 'Automotive Accessories'] }] },
  {
    label: 'Pharmacy',
    subGroups: [
      { heading: 'Pharmacy', items: ['Pharmacy Home', 'Pharmacy Delivery', 'Refill Prescriptions', 'Transfer Prescriptions', 'Find a Pharmacy', '$4 Prescriptions', 'Pet Pharmacy'] },
      { heading: 'Vaccines', items: ['Schedule now', 'All vaccines', 'COVID-19', 'Flu', 'Measles, Mumps, & Rubella (MMR)'] },
      { heading: 'Health Services', items: ['Birth Control Prescribing', 'Testing & Treatment: Strep Throat, Flu & COVID-19'] },
    ],
  },
  { label: 'Vision & Optical', subGroups: [{ items: ['Eye Exams', 'Glasses', 'Contact Lenses', 'Sunglasses'] }] },
  { label: 'Insurance & Benefits', subGroups: [{ items: ['Health Insurance', 'Auto Insurance', 'Life Insurance', 'Pet Insurance'] }] },
  { label: 'Registry, Lists, & Gifts', subGroups: [{ items: ['Baby Registry', 'Wedding Registry', 'Wish Lists', 'Gift Finder'] }] },
  { label: 'Custom Cakes', subGroups: [{ items: ['Birthday Cakes', 'Wedding Cakes', 'Specialty Cakes', 'Cupcakes'] }] },
  { label: 'Photo Services', subGroups: [{ items: ['Photo Prints', 'Photo Books', 'Photo Cards', 'Canvas Prints', 'Gifts'] }] },
  { label: 'Financial Services', subGroups: [{ items: ['Money Transfers', 'Bill Pay', 'Check Cashing', 'Money Orders', 'Tax Services'] }] },
  { label: 'Protection, Home, & Tech', subGroups: [{ items: ['Walmart Protection Plans', 'Tech Support', 'Smart Home Installation'] }] },
  { label: 'Subscriptions', subGroups: [{ items: ['Walmart+', 'Walmart+ Benefits', 'Streaming', 'Software'] }] },
  { label: 'Community & Giving', subGroups: [{ items: ['Spark Good', 'Local Nonprofits', 'Hunger Relief', 'Disaster Relief'] }] },
  { label: 'Ordering Online', subGroups: [{ items: ['How to Order', 'Order Status', 'Returns', 'Walmart+'] }] },
  { label: 'Personal Care', subGroups: [{ items: ['Hair Salon', 'Nail Salon', 'Skin Care Services'] }] },
  { label: 'Auto & Tires', subGroups: [{ items: ['Tire Center', 'Auto Services', 'Oil Change', 'Battery Services'] }] },
  { label: 'Sports & Outdoors', subGroups: [{ items: ['Sporting Goods', 'Outdoor Recreation', 'Fitness Classes'] }] },
  { label: 'Pets', subGroups: [{ items: ['Veterinary Services', 'Pet Grooming', 'Pet Boarding'] }] },
  { label: 'Household Essentials', subGroups: [{ items: ['Delivery Services', 'Installation Services', 'Assembly Services'] }] },
  { label: 'Seasonal Decor & Party Supplies', subGroups: [{ items: ['Event Planning', 'Party Services', 'Holiday Decorating'] }] },
  { label: 'School, Office & Art Supplies', subGroups: [{ items: ['Print Services', 'Copy Services', 'Laminating', 'Binding'] }] },
  { label: 'Movies, Music & Books', subGroups: [{ items: ['Vudu', 'Music Downloads', 'eBooks'] }] },
  { label: 'Gift Cards', subGroups: [{ items: ['Gift Card Services', 'Custom Gift Cards', 'Gift Card Balance'] }] },
  { label: 'Shop With Purpose', subGroups: [{ items: ['Diverse-Owned Brands', 'Sustainability', 'Community Impact'] }] },
];

// ── Component ────────────────────────────────────────────────────────────────

type NavTab = 'departments' | 'services';

interface MegaNavProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: NavTab;
  /** 'overlay' = full-screen sheet (native), 'panel' = inline dropdown (desktop) */
  mode?: 'overlay' | 'panel';
}

export function MegaNav({ isOpen, onClose, initialTab = 'departments', mode = 'overlay' }: MegaNavProps) {
  const [activeTab, setActiveTab] = useState<NavTab>(initialTab);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = activeTab === 'departments' ? DEPARTMENTS : SERVICES;

  // Reset when tab switches
  useEffect(() => {
    setActiveCategory(0);
  }, [activeTab]);

  // Reset when tab default changes
  useEffect(() => {
    setActiveTab(initialTab);
    setActiveCategory(activeTab === 'departments' ? 1 : 2); // Default to Grocery / Pharmacy
  }, [initialTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (mode === 'overlay' && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen, mode]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const selected = categories[activeCategory] ?? categories[0];

  return (
    <>
      {mode === 'overlay' && (
        <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      )}
      <div className={[styles.panel, mode === 'overlay' ? styles.panelOverlay : styles.panelDropdown].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* ── Header (overlay only) ── */}
        {mode === 'overlay' && (
          <div className={styles.header}>
            <div className={styles.tabs}>
              <button
                className={[styles.tab, activeTab === 'departments' ? styles.tabActive : ''].join(' ')}
                onClick={() => setActiveTab('departments')}
              >
                Departments
              </button>
              <button
                className={[styles.tab, activeTab === 'services' ? styles.tabActive : ''].join(' ')}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
              <X />
            </button>
          </div>
        )}

        {/* ── Two-column body ── */}
        <div className={styles.body}>
          {/* Left: category list */}
          <div className={styles.leftCol}>
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                className={[styles.catItem, i === activeCategory ? styles.catItemActive : ''].join(' ')}
                onClick={() => setActiveCategory(i)}
              >
                <span className={styles.catLabel}>{cat.label}</span>
                {i === activeCategory && <div className={styles.catIndicator} />}
              </button>
            ))}
          </div>

          {/* Right: sub-items */}
          <div className={styles.rightCol}>
            {selected.subGroups.map((group, gi) => (
              <div key={gi} className={styles.subGroup}>
                {group.heading && (
                  <p className={styles.subGroupHeading}>{group.heading}</p>
                )}
                {group.items.map((item) => (
                  <button key={item} className={styles.subItem}>
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
