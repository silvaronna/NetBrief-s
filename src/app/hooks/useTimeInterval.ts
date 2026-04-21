'use client';

import { useState, useCallback } from 'react';

// 1. Tipe data diganti dengan opsi granularity TSDB yang baru
export type TimeIntervalType = '5m' | '30m' | '1h';

export interface TimeIntervalState {
  interval: TimeIntervalType;
  setInterval: (interval: TimeIntervalType) => void;
  isSelected: (interval: TimeIntervalType) => boolean;
}

/**
 * useTimeInterval
 * * Custom hook to manage time interval selection state.
 * Provides a consistent interface for selecting data granularity (step size)
 * between 5 minutes, 30 minutes, and 1 hour.
 * * Designed to integrate with chart rendering logic and TSDB query parameters.
 */
// 2. Default interval diganti ke '1h'
export function useTimeInterval(defaultInterval: TimeIntervalType = '1h'): TimeIntervalState {
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