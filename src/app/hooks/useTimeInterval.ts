'use client';

import { useState, useCallback } from 'react';

export type TimeIntervalType = '1H' | '24H' | '7D';

export interface TimeIntervalState {
  interval: TimeIntervalType;
  setInterval: (interval: TimeIntervalType) => void;
  isSelected: (interval: TimeIntervalType) => boolean;
}

/**
 * useTimeInterval
 * 
 * Custom hook to manage time interval selection state.
 * Provides a consistent interface for selecting between
 * 1 Hour, 24 Hours, and 7 Days intervals.
 * 
 * Designed to integrate with chart filtering and data refresh logic.
 */
export function useTimeInterval(defaultInterval: TimeIntervalType = '24H'): TimeIntervalState {
  const [interval, setIntervalState] = useState<TimeIntervalType>(defaultInterval);

  const setInterval = useCallback((newInterval: TimeIntervalType) => {
    setIntervalState(newInterval);
  }, []);

  const isSelected = useCallback(
    (checkInterval: TimeIntervalType) => interval === checkInterval,
    [interval]
  );

  return {
    interval,
    setInterval,
    isSelected,
  };
}
