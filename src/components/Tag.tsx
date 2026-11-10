type TagStatus = 'Complete' | 'Active' | 'Planned' | 'Locked';

interface TagProps {
  status: TagStatus;
  label?: string;
  className?: string;
}

const STATUS_CLASS: Record<TagStatus, string> = {
  Complete: 'tag tag--complete',
  Active:   'tag tag--active',
  Planned:  'tag tag--planned',
  Locked:   'tag tag--locked',
};

function LockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.2rem' }}
    >
      <rect x="2" y="5.5" width="8" height="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Square status tag with 1px border. Variants: Complete | Active | Planned | Locked.
 * Locked variant prepends a lock icon.
 */
export default function Tag({ status, label, className = '' }: TagProps) {
  return (
    <span className={`${STATUS_CLASS[status]} ${className}`}>
      {status === 'Locked' && <LockIcon />}
      {label ?? status}
    </span>
  );
}
