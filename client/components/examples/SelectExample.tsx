'use client';

import React, { useState } from 'react';
import { Select, SelectItem } from '@/components/ui/Select';

export default function SelectExample() {
  const [fruit, setFruit] = useState('');
  const [timezone, setTimezone] = useState('');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '16px'
        }}>
          Basic Select
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <Select
            label="Select a fruit"
            value={fruit}
            onValueChange={setFruit}
            placeholder="Select a fruit"
            size="large"
          >
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
            <SelectItem value="mango">Mango</SelectItem>
          </Select>
        </div>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text, #2E2F32)',
          marginBottom: '16px'
        }}>
          Select with Options
        </h3>
        <div style={{ maxWidth: '400px' }}>
          <Select
            label="Choose a timezone"
            value={timezone}
            onValueChange={setTimezone}
            placeholder="Select a timezone"
            size="large"
            helperText="Select your local timezone for accurate scheduling"
          >
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </Select>
        </div>
      </section>
    </div>
  );
}
