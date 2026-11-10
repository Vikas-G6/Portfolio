import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'text';
  children: ReactNode;
}

/**
 * Primary: gold 1px border + gold text, inverts to gold bg + dark text on hover. Chamfered top-right.
 * Text: no border, muted text that brightens to --accent on hover.
 */
export default function Button({ variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  if (variant === 'text') {
    return (
      <button
        {...rest}
        className={`btn-text ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={`btn-primary ${className}`}
      style={{ clipPath: 'var(--chamfer)' }}
    >
      {children}
    </button>
  );
}
