'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Undo2, Redo2 } from 'lucide-react';
// FaGithub removed - Proudly Open Source button removed per request
import { SponsorButton } from '@/components/SponsorButton';

export function EditorBottomBar() {
  return (
    // Fixed wrapper keeps the bar visible at the bottom of the viewport
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="h-14 bg-background border-t border-border flex items-center">
          {/* Left side - reserved */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            {/* Intentionally left blank */}
          </div>

          {/* Right side - Sponsor (aligned to the far right) */}
          <div className="flex items-center gap-2 justify-end w-full">
            <div className="mr-2">
              <SponsorButton variant="bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

