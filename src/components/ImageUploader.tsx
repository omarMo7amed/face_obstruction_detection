
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageSelect: (image: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    onImageSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast.error('Unable to access camera. Please check your permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            onImageSelect(file);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {!isCapturing ? (
        <div 
          className={cn(
            "border-2 border-dashed rounded-lg p-6 w-full max-w-md aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
            isDragging ? "border-purple bg-purple/5" : "border-muted-foreground/30",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 mb-3 text-muted-foreground" />
          <p className="text-lg font-medium mb-1">Drag & drop an image here</p>
          <p className="text-muted-foreground text-sm mb-4">or click to browse your files</p>
          
          <input 
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            ref={fileInputRef}
            className="hidden"
          />
          
          <div className="w-full border-t border-border my-4" />
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              activateCamera();
            }}
          >
            <Camera className="h-4 w-4" />
            Use Camera
          </Button>
        </div>
      ) : (
        <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button 
              variant="destructive"
              onClick={stopCamera}
            >
              Cancel
            </Button>
            
            <Button 
              variant="default"
              className="bg-purple hover:bg-purple-light"
              onClick={capturePhoto}
            >
              Take Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
