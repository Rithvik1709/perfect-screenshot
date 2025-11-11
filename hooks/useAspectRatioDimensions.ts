/**
 * Hook for getting aspect ratio dimensions
 * Provides reactive dimensions based on selected aspect ratio
 */

import { useMemo, useState, useEffect } from 'react';
import { useImageStore } from '@/lib/store';
import { getAspectRatioPreset, calculateFitDimensions, getAspectRatioCSS } from '@/lib/aspect-ratio-utils';

/**
 * Hook to get canvas dimensions based on selected aspect ratio
 * Returns dimensions that fit within viewport constraints
 */
export function useAspectRatioDimensions(options?: {
  maxWidth?: number;
  maxHeight?: number;
}) {
  const { selectedAspectRatio } = useImageStore();
  
  const dimensions = useMemo(() => {
    const preset = getAspectRatioPreset(selectedAspectRatio);
    if (!preset) {
      return { width: 1920, height: 1080, aspectRatio: '16/9' };
    }
    
    const { maxWidth, maxHeight } = options || {};
    
    // If constraints provided, calculate fit dimensions
    if (maxWidth || maxHeight) {
      const fitDimensions = calculateFitDimensions(
        preset.width,
        preset.height,
        maxWidth,
        maxHeight
      );
      return {
        ...fitDimensions,
        aspectRatio: getAspectRatioCSS(preset.width, preset.height),
        originalWidth: preset.width,
        originalHeight: preset.height,
      };
    }
    
    // Return original dimensions
    return {
      width: preset.width,
      height: preset.height,
      aspectRatio: getAspectRatioCSS(preset.width, preset.height),
      originalWidth: preset.width,
      originalHeight: preset.height,
    };
  }, [selectedAspectRatio, options?.maxWidth, options?.maxHeight]);
  
  return dimensions;
}

/**
 * Hook to get responsive canvas dimensions that fit within viewport
 * Automatically calculates max dimensions based on viewport size
 * Reactively updates when window is resized
 */
export function useResponsiveCanvasDimensions() {
  const { selectedAspectRatio } = useImageStore();
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });
  
  // Track viewport size changes
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Set initial size
    updateViewportSize();
    
    // Listen for resize events
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);
  
  const dimensions = useMemo(() => {
    const preset = getAspectRatioPreset(selectedAspectRatio);
    if (!preset) {
      return { width: 1920, height: 1080, aspectRatio: '16/9' };
    }
    
  // Calculate viewport constraints
  // Use the viewport directly and keep conservative padding only.
  // Removing the large side panel deduction so the canvas can expand to available viewport.
  const sidePanelsWidth = 0; // don't subtract side panels here
  const padding = 24; // Container padding (12px * 2) — smaller padding lets canvas be larger
  const availableWidth = Math.max(viewportSize.width - sidePanelsWidth - padding, 0);
  const availableHeight = Math.max(viewportSize.height - 80, 0); // leave room for header (~64px) and small gap

  // Use viewport dimensions directly (no over-scaling multiplier). Cap to reasonable max values.
  const maxWidth = Math.min(availableWidth, 4000);
  const maxHeight = Math.min(availableHeight, 2400);
    
    const fitDimensions = calculateFitDimensions(
      preset.width,
      preset.height,
      maxWidth,
      maxHeight
    );
    
    return {
      ...fitDimensions,
      aspectRatio: getAspectRatioCSS(preset.width, preset.height),
      originalWidth: preset.width,
      originalHeight: preset.height,
    };
  }, [selectedAspectRatio, viewportSize.width, viewportSize.height]);
  
  return dimensions;
}

