import { useState, useCallback } from 'react';
import { OnboardingBottomSheet } from './OnboardingBottomSheet';
import { DayTimePicker } from './DayTimePicker';
import { ReplenishLoading } from './ReplenishLoading';
import { ReplenishProductGrid, type GridView } from './ReplenishProductGrid';

type OnboardingStep = 'bottomSheet' | 'dayTimePicker' | 'loading' | 'productGrid';

export default function ReplenishOnboarding() {
  const [step, setStep] = useState<OnboardingStep>('bottomSheet');
  const [selectedDay, setSelectedDay] = useState('Friday');
  const [selectedTime, setSelectedTime] = useState('4pm');
  const [gridView, setGridView] = useState<GridView>('browse');

  const handleChangeDayTime = useCallback(() => {
    setStep('dayTimePicker');
  }, []);

  const handleSaveDayTime = useCallback((day: string, time: string) => {
    const dayMap: Record<string, string> = {
      Tue: 'Tuesday', Wed: 'Wednesday', Thur: 'Thursday',
      Fri: 'Friday', Sat: 'Saturday',
    };
    setSelectedDay(dayMap[day] || day);
    // Extract the start time from time slots like "4pm–5pm"
    const startTime = time.split('–')[0];
    setSelectedTime(startTime);
    setStep('bottomSheet');
  }, []);

  const handleViewUsuals = useCallback(() => {
    setStep('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setStep('productGrid');
    setGridView('browse');
  }, []);

  const handleGridViewChange = useCallback((view: GridView) => {
    setGridView(view);
  }, []);

  const handleClose = useCallback(() => {
    // Reset to initial state
    setStep('bottomSheet');
    setGridView('browse');
  }, []);

  switch (step) {
    case 'bottomSheet':
      return (
        <OnboardingBottomSheet
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onChangeDayTime={handleChangeDayTime}
          onViewUsuals={handleViewUsuals}
        />
      );
    case 'dayTimePicker':
      return (
        <DayTimePicker
          initialDay={
            // Reverse map full name to abbreviation
            ({ Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thur', Friday: 'Fri', Saturday: 'Sat' } as Record<string, string>)[selectedDay] || 'Fri'
          }
          initialTime={`${selectedTime}–${getNextHour(selectedTime)}`}
          onSave={handleSaveDayTime}
        />
      );
    case 'loading':
      return (
        <ReplenishLoading
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          onLoadingComplete={handleLoadingComplete}
        />
      );
    case 'productGrid':
      return (
        <ReplenishProductGrid
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          gridView={gridView}
          onGridViewChange={handleGridViewChange}
          onClose={handleClose}
        />
      );
  }
}

function getNextHour(time: string): string {
  const match = time.match(/^(\d+)(am|pm)$/);
  if (!match) return '5pm';
  let hour = parseInt(match[1]);
  const period = match[2];
  hour += 1;
  if (hour === 12) return `12${period === 'am' ? 'pm' : 'am'}`;
  if (hour === 13) return `1${period}`;
  return `${hour}${period}`;
}
