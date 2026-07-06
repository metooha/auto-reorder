import { useState } from 'react';
import { FilterChip } from '@/components/ui/FilterChip';
import { FormGroup } from '@/components/ui/FormGroup';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/Popover';
import { RadioGroup, Radio } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileFilterBottomSheet } from './MobileFilterBottomSheet';
import { WCPSearchBar } from '@/components/walmart/WCPSearchBar';
import styles from './PurchaseHistoryFilters.module.css';

export interface FilterState {
  search: string;
  /** '' | 'last3m' | 'last6m' | '2026' | '2025' | '2024' | '2023' */
  date: string;
  /** 'in-progress' | 'completed' */
  status: string[];
  returnsOnly: boolean;
  inStoreOnly: boolean;
  onlineOnly: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  search: '',
  date: '',
  status: [],
  returnsOnly: false,
  inStoreOnly: false,
  onlineOnly: false,
};

interface PurchaseHistoryFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const DATE_OPTIONS = [
  { value: 'last3m', label: 'Last 3 months' },
  { value: 'last6m', label: 'Last 6 months' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

export function PurchaseHistoryFilters({ filters, onFiltersChange }: PurchaseHistoryFiltersProps) {
  const isMobile = useIsMobile();
  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  // Pending state — applied only when "View results" is clicked
  const [pendingDate, setPendingDate] = useState('');
  const [pendingStatus, setPendingStatus] = useState<string[]>([]);

  const update = (partial: Partial<FilterState>) =>
    onFiltersChange({ ...filters, ...partial });

  /* ── By Date handlers ── */
  const handleDateOpen = (open: boolean) => {
    if (open) setPendingDate(filters.date);
    setDateOpen(open);
  };
  const applyDate = () => { update({ date: pendingDate }); setDateOpen(false); };
  const clearDate = () => { setPendingDate(''); update({ date: '' }); setDateOpen(false); };

  /* ── By Status handlers ── */
  const handleStatusOpen = (open: boolean) => {
    if (open) setPendingStatus([...filters.status]);
    setStatusOpen(open);
  };
  const togglePendingStatus = (val: string, checked: boolean) =>
    setPendingStatus(prev => checked ? [...prev, val] : prev.filter(v => v !== val));
  const applyStatus = () => { update({ status: pendingStatus }); setStatusOpen(false); };
  const clearStatus = () => { setPendingStatus([]); update({ status: [] }); setStatusOpen(false); };

  const activeCount = [
    !!filters.date,
    filters.status.length > 0,
    filters.returnsOnly,
    filters.inStoreOnly,
    filters.onlineOnly,
  ].filter(Boolean).length;

  /* ── Shared option content ── */
  const dateOptions = (
    <RadioGroup
      value={pendingDate}
      onValueChange={setPendingDate}
      className={styles.optionList}
    >
      {DATE_OPTIONS.map(opt => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      ))}
    </RadioGroup>
  );

  const statusOptions = (
    <FormGroup
      UNSAFE_className={styles.optionList}
      UNSAFE_style={{ '--ld-primitive-scale-space-100': '16px' } as React.CSSProperties}
    >
      <Checkbox
        checked={pendingStatus.includes('in-progress')}
        label="In progress"
        onCheckedChange={checked => togglePendingStatus('in-progress', !!checked)}
      />
      <Checkbox
        checked={pendingStatus.includes('completed')}
        label="Completed"
        onCheckedChange={checked => togglePendingStatus('completed', !!checked)}
      />
    </FormGroup>
  );

  return (
    <div className={styles.wrapper}>
      {/* Search */}
      <div className={styles.searchRow}>
        <WCPSearchBar
          value={filters.search}
          onChange={val => update({ search: val })}
          onClear={() => update({ search: '' })}
          placeholder="Search your orders"
        />
      </div>

      {/* Filter chips */}
      <div className={styles.filterRow}>
        {/* All filters */}
        <FilterChip isAllFilters selected={activeCount > 0} aria-label="All filters">
          All filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </FilterChip>

        {/* ── By date ── */}
        {isMobile ? (
          <>
            <FilterChip
              isMultiSelect
              isOpen={dateOpen}
              selected={!!filters.date}
              onClick={() => handleDateOpen(!dateOpen)}
            >
              By date
            </FilterChip>
            <MobileFilterBottomSheet
              open={dateOpen}
              title="By date"
              onClose={() => setDateOpen(false)}
              onClear={clearDate}
              onApply={applyDate}
            >
              {dateOptions}
            </MobileFilterBottomSheet>
          </>
        ) : (
          <Popover open={dateOpen} onOpenChange={handleDateOpen}>
            <PopoverAnchor className={styles.chipAnchor}>
              <FilterChip
                isMultiSelect
                isOpen={dateOpen}
                selected={!!filters.date}
                onClick={() => handleDateOpen(!dateOpen)}
              >
                By date
              </FilterChip>
            </PopoverAnchor>
            <PopoverContent align="start" showArrow className={styles.filterPanel}>
              {dateOptions}
              <div className={styles.panelFooter}>
                <Link href="#" variant="subtle" onClick={e => { e.preventDefault(); clearDate(); }}>
                  Clear
                </Link>
                <Button variant="secondary" size="small" isFullWidth onClick={applyDate}>
                  View results
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Returns */}
        <FilterChip
          selected={filters.returnsOnly}
          onSelectedChange={v => update({ returnsOnly: v })}
        >
          Returns
        </FilterChip>

        {/* In store */}
        <FilterChip
          selected={filters.inStoreOnly}
          onSelectedChange={v => update({ inStoreOnly: v })}
        >
          In store
        </FilterChip>

        {/* Online */}
        <FilterChip
          selected={filters.onlineOnly}
          onSelectedChange={v => update({ onlineOnly: v })}
        >
          Online
        </FilterChip>

        {/* ── By status ── */}
        {isMobile ? (
          <>
            <FilterChip
              isMultiSelect
              isOpen={statusOpen}
              selected={filters.status.length > 0}
              onClick={() => handleStatusOpen(!statusOpen)}
            >
              By status
            </FilterChip>
            <MobileFilterBottomSheet
              open={statusOpen}
              title="By status"
              onClose={() => setStatusOpen(false)}
              onClear={clearStatus}
              onApply={applyStatus}
            >
              {statusOptions}
            </MobileFilterBottomSheet>
          </>
        ) : (
          <Popover open={statusOpen} onOpenChange={handleStatusOpen}>
            <PopoverAnchor className={styles.chipAnchor}>
              <FilterChip
                isMultiSelect
                isOpen={statusOpen}
                selected={filters.status.length > 0}
                onClick={() => handleStatusOpen(!statusOpen)}
              >
                By status
              </FilterChip>
            </PopoverAnchor>
            <PopoverContent align="start" showArrow className={styles.filterPanel}>
              {statusOptions}
              <div className={styles.panelFooter}>
                <Link href="#" variant="subtle" onClick={e => { e.preventDefault(); clearStatus(); }}>
                  Clear
                </Link>
                <Button variant="secondary" size="small" isFullWidth onClick={applyStatus}>
                  View results
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
