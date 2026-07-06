import React from 'react';

export interface HighlightTextProps {
  /** The full text to display */
  text: string;
  /** The search query to highlight within the text */
  query: string;
  /**
   * Class applied to the non-matching (bold) segments.
   * @default 'font-bold'
   */
  boldClassName?: string;
  /**
   * Class applied to the matching (normal-weight) segment.
   * @default 'font-normal'
   */
  matchClassName?: string;
}

/**
 * Renders text with a query match highlighted.
 *
 * Convention: the **matching** portion is rendered normal-weight and the
 * surrounding portions are rendered bold — this matches the Walmart
 * typeahead / search-results pattern where the typed query is shown as
 * plain text and the prefix/suffix complete the suggestion.
 *
 * @example
 * ```tsx
 * <HighlightText text="Fresh whole milk" query="milk" />
 * // Renders: <b>Fresh whole </b><span>milk</span>
 * ```
 */
export function HighlightText({
  text,
  query,
  boldClassName = 'font-bold',
  matchClassName = 'font-normal',
}: HighlightTextProps) {
  if (!query) {
    return <span className={boldClassName}>{text}</span>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return <span className={boldClassName}>{text}</span>;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before && <span className={boldClassName}>{before}</span>}
      <span className={matchClassName}>{match}</span>
      {after && <span className={boldClassName}>{after}</span>}
    </>
  );
}
