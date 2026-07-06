import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { DateField } from '@/components/ui/DateField';
import { Select, SelectItem } from '@/components/ui/Select';
import { Divider } from '@/components/ui/Divider';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Rating } from '@/components/ui/Rating';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

type ComponentType =
  | 'button' | 'badge' | 'chip' | 'filterchip' | 'tag'
  | 'iconbutton' | 'checkbox' | 'switch' | 'textfield' | 'textarea'
  | 'datefield' | 'select' | 'divider' | 'spoticon' | 'rating';

const components = [
  { id: 'button', name: 'Button', category: 'Actions' },
  { id: 'iconbutton', name: 'Icon Button', category: 'Actions' },
  { id: 'badge', name: 'Badge', category: 'Display' },
  { id: 'chip', name: 'Chip', category: 'Selection' },
  { id: 'filterchip', name: 'Filter Chip', category: 'Selection' },
  { id: 'tag', name: 'Tag', category: 'Display' },
  { id: 'spoticon', name: 'Spot Icon', category: 'Display' },
  { id: 'rating', name: 'Rating', category: 'Display' },
  { id: 'textfield', name: 'Text Field', category: 'Forms' },
  { id: 'textarea', name: 'Text Area', category: 'Forms' },
  { id: 'datefield', name: 'Date Field', category: 'Forms' },
  { id: 'select', name: 'Select', category: 'Forms' },
  { id: 'checkbox', name: 'Checkbox', category: 'Forms' },
  { id: 'switch', name: 'Switch', category: 'Forms' },
  { id: 'divider', name: 'Divider', category: 'Layout' },
];

export default function ComponentTester() {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentType>('button');
  
  // Button props
  const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  const [buttonSize, setButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(t('componentLibrary.defaultButtonText'));
  
  // TextField props
  const [textFieldSize, setTextFieldSize] = React.useState<'small' | 'large'>('large');
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const [textFieldError, setTextFieldError] = React.useState('');
  const [textFieldDisabled, setTextFieldDisabled] = React.useState(false);
  const [textFieldMagic, setTextFieldMagic] = React.useState(false);
  
  // TextArea props
  const [textAreaSize, setTextAreaSize] = React.useState<'small' | 'large'>('large');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textAreaDisabled, setTextAreaDisabled] = React.useState(false);
  const [textAreaMagic, setTextAreaMagic] = React.useState(false);
  
  // DateField props
  const [dateFieldValue, setDateFieldValue] = React.useState('');
  const [dateFieldDisabled, setDateFieldDisabled] = React.useState(false);
  
  // Switch props
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [switchDisabled, setSwitchDisabled] = React.useState(false);
  
  // Select props
  const [selectValue, setSelectValue] = React.useState('');
  const [selectSize, setSelectSize] = React.useState<'small' | 'large'>('large');
  const [selectDisabled, setSelectDisabled] = React.useState(false);
  
  // Badge props
  const [badgeVariant, setBadgeVariant] = React.useState<'info' | 'success' | 'warning' | 'error' | 'neutral'>('info');
  const [badgeContent, setBadgeContent] = React.useState('5');
  
  // Chip props
  const [chipSize, setChipSize] = React.useState<'small' | 'medium'>('medium');
  const [chipSelected, setChipSelected] = React.useState(false);
  const [chipText, setChipText] = React.useState(t('componentLibrary.chipLabel'));
  
  // Filter Chip props
  const [filterChipSelected, setFilterChipSelected] = React.useState(false);
  const [filterChipText, setFilterChipText] = React.useState(t('componentLibrary.filterLabel'));
  const [filterChipCount, setFilterChipCount] = React.useState(12);
  
  // Tag props
  const [tagVariant, setTagVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary');
  const [tagColor, setTagColor] = React.useState<'brand' | 'positive' | 'negative' | 'warning' | 'info'>('brand');
  const [tagText, setTagText] = React.useState(t('componentLibrary.tagLabel'));
  
  // Icon Button props
  const [iconButtonVariant, setIconButtonVariant] = React.useState<'ghost' | 'primary' | 'secondary' | 'destructive'>('ghost');
  const [iconButtonSize, setIconButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  
  // SpotIcon props
  const [spotIconSize, setSpotIconSize] = React.useState<'small' | 'large'>('small');
  const [spotIconColor, setSpotIconColor] = React.useState<'brand' | 'neutral'>('brand');
  
  // Rating props
  const [ratingValue, setRatingValue] = React.useState(4);
  
  // Checkbox props
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [checkboxLabel, setCheckboxLabel] = React.useState(t('componentLibrary.checkboxLabel'));
  
  // Divider props
  const [dividerOrientation, setDividerOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        );
      
      case 'textfield':
        return (
          <TextField
            label={t('componentLibrary.fieldLabel')}
            size={textFieldSize}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            error={textFieldError || undefined}
            disabled={textFieldDisabled}
            isMagic={textFieldMagic}
            placeholder={t('componentLibrary.enterText')}
            helperText={t('componentLibrary.helperText')}
          />
        );
      
      case 'textarea':
        return (
          <TextArea
            label={t('componentLibrary.fieldLabel')}
            size={textAreaSize}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            disabled={textAreaDisabled}
            isMagic={textAreaMagic}
            placeholder={t('componentLibrary.enterText')}
            maxLength={200}
          />
        );
      
      case 'datefield':
        return (
          <DateField
            label={t('componentLibrary.dateLabel')}
            value={dateFieldValue}
            onChange={(e) => setDateFieldValue(e.target.value)}
            disabled={dateFieldDisabled}
            showCalendarIcon
          />
        );
      
      case 'select':
        return (
          <Select
            label={t('componentLibrary.selectOptionLabel')}
            value={selectValue}
            onValueChange={setSelectValue}
            size={selectSize}
            disabled={selectDisabled}
          >
            <SelectItem value="option1">{t('componentLibrary.option1')}</SelectItem>
            <SelectItem value="option2">{t('componentLibrary.option2')}</SelectItem>
            <SelectItem value="option3">{t('componentLibrary.option3')}</SelectItem>
          </Select>
        );
      
      case 'switch':
        return (
          <Switch
            checked={switchChecked}
            onChange={setSwitchChecked}
            disabled={switchDisabled}
            label={t('componentLibrary.toggleOption')}
          />
        );
      
      case 'badge':
        return <Badge variant={badgeVariant} value={badgeContent} />;
      
      case 'chip':
        return (
          <Chip
            size={chipSize}
            selected={chipSelected}
            onClick={() => setChipSelected(!chipSelected)}
          >
            {chipText}
          </Chip>
        );
      
      case 'filterchip':
        return (
          <FilterChip
            selected={filterChipSelected}
            count={filterChipCount}
            onClick={() => setFilterChipSelected(!filterChipSelected)}
          >
            {filterChipText}
          </FilterChip>
        );
      
      case 'tag':
        return (
          <Tag variant={tagVariant} color={tagColor}>
            {tagText}
          </Tag>
        );
      
      case 'iconbutton':
        return (
          <IconButton
            variant={iconButtonVariant}
            size={iconButtonSize}
            aria-label={t('componentLibrary.settingsAriaLabel')}
          >
            <Icons.Settings style={{ width: 20, height: 20 }} />
          </IconButton>
        );
      
      case 'spoticon':
        return (
          <SpotIcon
            size={spotIconSize as 'small' | 'large'}
            color={spotIconColor}
            icon={<Icons.Star style={{ width: 24, height: 24 }} />}
          />
        );
      
      case 'rating':
        return (
          <Rating
            value={ratingValue}
            size="large"
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
            label={checkboxLabel}
          />
        );
      
      case 'divider':
        return (
          <div style={{ width: dividerOrientation === 'horizontal' ? '100%' : '2px', height: dividerOrientation === 'vertical' ? '200px' : 'auto' }}>
            <Divider orientation={dividerOrientation} />
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={buttonVariant === variant}
                    onClick={() => setButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={buttonSize === size}
                    onClick={() => setButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.buttonTextLabel')}
                size="small"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            
            <div>
              <Checkbox
                checked={buttonDisabled}
                onCheckedChange={(checked) => setButtonDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'textfield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textFieldSize === size}
                    onClick={() => setTextFieldSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.errorMessageLabel')}
                size="small"
                value={textFieldError}
                onChange={(e) => setTextFieldError(e.target.value)}
                placeholder={t('componentLibrary.leaveEmptyPlaceholder')}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textFieldDisabled}
                onCheckedChange={(checked) => setTextFieldDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
              <Checkbox
                checked={textFieldMagic}
                onCheckedChange={(checked) => setTextFieldMagic(checked as boolean)}
                label={t('componentLibrary.magicAIState')}
              />
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textAreaSize === size}
                    onClick={() => setTextAreaSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textAreaDisabled}
                onCheckedChange={(checked) => setTextAreaDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
              <Checkbox
                checked={textAreaMagic}
                onCheckedChange={(checked) => setTextAreaMagic(checked as boolean)}
                label={t('componentLibrary.magicAIState')}
              />
            </div>
          </div>
        );
      
      case 'datefield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={dateFieldDisabled}
                onCheckedChange={(checked) => setDateFieldDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={selectSize === size}
                    onClick={() => setSelectSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <Checkbox
                checked={selectDisabled}
                onCheckedChange={(checked) => setSelectDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'switch':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={switchDisabled}
                onCheckedChange={(checked) => setSwitchDisabled(checked as boolean)}
                label={t('componentLibrary.disabled')}
              />
            </div>
          </div>
        );
      
      case 'badge':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['neutral', 'info', 'success', 'warning', 'error'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={badgeVariant === variant}
                    onClick={() => setBadgeVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.badgeContentLabel')}
                size="small"
                value={badgeContent}
                onChange={(e) => setBadgeContent(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'chip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={chipSize === size}
                    onClick={() => setChipSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label={t('componentLibrary.chipTextLabel')}
                size="small"
                value={chipText}
                onChange={(e) => setChipText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'filterchip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.filterTextLabel')}
                size="small"
                value={filterChipText}
                onChange={(e) => setFilterChipText(e.target.value)}
              />
            </div>

            <div>
              <TextField
                label={t('componentLibrary.countLabel')}
                size="small"
                type="number"
                value={String(filterChipCount)}
                onChange={(e) => setFilterChipCount(Number(e.target.value))}
              />
            </div>
          </div>
        );
      
      case 'tag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={tagVariant === variant}
                    onClick={() => setTagVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.color')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'positive', 'negative', 'warning', 'info'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={tagColor === color}
                    onClick={() => setTagColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <TextField
                label={t('componentLibrary.tagTextLabel')}
                size="small"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'iconbutton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.variant')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['ghost', 'primary', 'secondary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={iconButtonVariant === variant}
                    onClick={() => setIconButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={iconButtonSize === size}
                    onClick={() => setIconButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'spoticon':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.size')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={spotIconSize === size}
                    onClick={() => setSpotIconSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.color')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'neutral'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={spotIconColor === color}
                    onClick={() => setSpotIconColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'rating':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.ratingValueLabel')}
                size="small"
                type="number"
                value={String(ratingValue)}
                onChange={(e) => setRatingValue(Number(e.target.value))}
                inputProps={{ min: 0, max: 5, step: 0.5 }}
              />
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle)'
            }}>
              {t('componentLibrary.ratingNote')}
            </div>
          </div>
        );
      
      case 'divider':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                {t('componentLibrary.orientation')}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['horizontal', 'vertical'] as const).map((orientation) => (
                  <Chip
                    key={orientation}
                    size="small"
                    selected={dividerOrientation === orientation}
                    onClick={() => setDividerOrientation(orientation)}
                  >
                    {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label={t('componentLibrary.labelTextLabel')}
                size="small"
                value={checkboxLabel}
                onChange={(e) => setCheckboxLabel(e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            {t('componentLibrary.selectToConfig')}
          </div>
        );
    }
  };

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div style={{
      padding: 'clamp(24px, 4vw, 48px)',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <PageHeader section={t('componentLibrary.gettingStarted')} title={t('componentLibrary.sandboxTitle')} description={t('componentLibrary.sandboxDescription')} />

      {/* Component Selector */}
      <div style={{ marginBottom: '32px', maxWidth: '500px' }}>
        <Select
          label={t('componentLibrary.selectComponent')}
          value={selectedComponent}
          onValueChange={(value) => setSelectedComponent(value as ComponentType)}
          size="large"
        >
          {Object.entries(groupedComponents).map(([category, items]) => (
            <React.Fragment key={category}>
              <SelectItem value={`category-${category}`} disabled>
                {category}
              </SelectItem>
              {items.map((component) => (
                <SelectItem key={component.id} value={component.id}>
                  {component.name}
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </Select>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        gap: '32px'
      }}>
        {/* Component Preview */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            {t('componentLibrary.preview')}
          </h2>
          
          <div style={{
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px'
          }}>
            {renderComponent()}
          </div>
        </div>

        {/* Property Controls */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            {t('componentLibrary.properties')}
          </h2>
          
          {renderControls()}
        </div>
      </div>

      {/* Usage Code */}
      <div style={{
        marginTop: '32px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          {t('componentLibrary.codeExample')}
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text)',
          overflowX: 'auto'
        }}>
          {selectedComponent === 'button' && (
            <pre style={{ margin: 0 }}>
              {`<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}
>
  ${buttonText}
</Button>`}
            </pre>
          )}
          {selectedComponent === 'textfield' && (
            <pre style={{ margin: 0 }}>
              {`<TextField
  label="Label"
  size="${textFieldSize}"${textFieldError ? `\n  error="${textFieldError}"` : ''}${textFieldDisabled ? '\n  disabled' : ''}${textFieldMagic ? '\n  isMagic' : ''}
  placeholder="Enter text..."
/>`}
            </pre>
          )}
          {selectedComponent === 'textarea' && (
            <pre style={{ margin: 0 }}>
              {`<TextArea
  label="Label"
  size="${textAreaSize}"${textAreaDisabled ? '\n  disabled' : ''}${textAreaMagic ? '\n  isMagic' : ''}
  maxLength={200}
/>`}
            </pre>
          )}
          {selectedComponent === 'chip' && (
            <pre style={{ margin: 0 }}>
              {`<Chip
  size="${chipSize}"
  selected={${chipSelected}}
  onClick={handleClick}
>
  ${chipText}
</Chip>`}
            </pre>
          )}
          {selectedComponent === 'tag' && (
            <pre style={{ margin: 0 }}>
              {`<Tag
  variant="${tagVariant}"
  color="${tagColor}"
>
  ${tagText}
</Tag>`}
            </pre>
          )}
          {selectedComponent === 'switch' && (
            <pre style={{ margin: 0 }}>
              {`<Switch
  checked={${switchChecked}}
  onCheckedChange={setChecked}${switchDisabled ? '\n  disabled' : ''}
  label="Toggle option"
/>`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
