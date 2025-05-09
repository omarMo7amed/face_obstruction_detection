
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingViewProps {
  className?: string;
}

const LoadingView: React.FC<LoadingViewProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="w-16 h-16 border-4 border-t-purple rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium gradient-text">Analyzing image...</p>
      <p className="text-muted-foreground text-sm">Detecting facial obstructions</p>
    </div>
  );
};

export default LoadingView;
