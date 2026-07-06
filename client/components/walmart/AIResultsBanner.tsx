import React from 'react';
import { SparklesIcon } from '@/components/icons-custom';

interface AIResultsBannerProps {
  /** Message displayed after the "AI-powered results" label */
  message: string;
}

/**
 * AI-powered results banner shown at the top of search result pages.
 * Displays the Sparkles icon, a bold header, and a contextual message.
 */
export function AIResultsBanner({ message }: AIResultsBannerProps) {
  return (
    <div className="px-3 py-2 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex-shrink-0">
          <SparklesIcon />
        </div>
        <p className="text-[14px] text-foreground">
          <span className="font-bold">AI-powered results</span> — {message}
        </p>
      </div>
    </div>
  );
}
