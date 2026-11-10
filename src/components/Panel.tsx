import type { ReactNode, CSSProperties } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'article' | 'aside';
}

/**
 * Base panel: --surface background, 1px --line border, chamfered top-right corner.
 * Hover brightens border to --line-strong.
 */
export default function Panel({ children, className = '', style, as: Tag = 'div' }: PanelProps) {
  return (
    <Tag
      className={`panel ${className}`}
      style={{ clipPath: 'var(--chamfer)', ...style }}
    >
      {children}
    </Tag>
  );
}
