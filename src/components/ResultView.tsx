
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultViewProps {
  imageUrl: string;
  classification: string;
  onReset: () => void;
  className?: string;
}

const ResultView: React.FC<ResultViewProps> = ({ imageUrl, classification, onReset, className }) => {
  const getClassColor = () => {
    switch (classification.toLowerCase()) {
      case 'none':
        return 'bg-green-500';
      case 'mask':
        return 'bg-blue-500';
      case 'sunglasses':
      case 'glasses':
        return 'bg-amber-500';
      case 'hand':
        return 'bg-orange-500';
      default:
        return 'bg-red-500'; // 'other' or any unknown classification
    }
  };

  const getClassDescription = () => {
    switch (classification.toLowerCase()) {
      case 'none':
        return 'No obstructions detected';
      case 'mask':
        return 'Face mask detected';
      case 'sunglasses':
        return 'Sunglasses detected';
      case 'glasses':
        return 'Glasses detected';
      case 'hand':
        return 'Hand obstruction detected';
      default:
        return 'Other obstruction detected';
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt="Analyzed face image" 
          className="w-full h-auto"
        />
        
        <div className={cn(
          "absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between", 
          getClassColor()
        )}>
          <div className="text-white">
            <p className="font-semibold">{classification.toUpperCase()}</p>
            <p className="text-sm opacity-90">{getClassDescription()}</p>
          </div>
          
          <div className="flex-shrink-0">
            <span className="inline-block bg-white/90 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {classification === 'none' ? '✅' : '⚠️'}
            </span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onReset} 
        variant="outline" 
        className="mt-6"
      >
        Try Another Image
      </Button>
    </div>
  );
};

export default ResultView;
