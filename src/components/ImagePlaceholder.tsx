import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  variant?: 'dark' | 'light';
}

/** Stand-in for a real photo; swap for an <Image> once assets are available. */
export function ImagePlaceholder({ label = 'Image placeholder', className = '', variant = 'dark' }: ImagePlaceholderProps) {
  const styles =
    variant === 'dark'
      ? 'border-slate-700 bg-slate-800/60 text-slate-400'
      : 'border-slate-300 bg-slate-100 text-slate-400';

  return (
    <div className={`placeholder-box flex flex-col items-center justify-center gap-2 border-2 border-dashed ${styles} ${className}`}>
      <ImageIcon className="w-6 h-6" />
      <span className="text-[11px] font-semibold uppercase tracking-wide text-center px-4">{label}</span>
    </div>
  );
}
