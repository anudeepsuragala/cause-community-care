
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
}

const ActionButton = ({
  label,
  icon,
  onClick,
  variant = 'primary',
  className,
  href
}: ActionButtonProps) => {
  const buttonClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring',
    variant === 'primary' && 'bg-primary text-white hover:bg-primary/90',
    variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    variant === 'outline' && 'border border-input bg-background hover:bg-muted',
    className
  );

  const content = (
    <>
      {icon}
      <span>{label}</span>
      {href && <ExternalLink className="ml-1 w-3 h-3" />}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
    >
      {content}
    </button>
  );
};

export default ActionButton;
