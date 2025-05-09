
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ResultView from '@/components/ResultView';
import LoadingView from '@/components/LoadingView';

// Mock API for demo purposes - to be replaced with actual backend call
const mockClassify = async (image: File): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // For demo, return random classification
  const classifications = ['none', 'mask', 'sunglasses', 'glasses', 'hand', 'other'];
  return classifications[Math.floor(Math.random() * classifications.length)];
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);

  useEffect(() => {
    // Clean up object URL when component unmounts or when selectedImage changes
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleImageSelect = async (image: File) => {
    // Create object URL for display
    const url = URL.createObjectURL(image);
    setSelectedImage(image);
    setImageUrl(url);
    
    // Start analysis
    setIsAnalyzing(true);
    
    try {
      const result = await mockClassify(image);
      setClassification(result);
      
      // Show a toast notification with the result
      if (result === 'none') {
        toast.success('No facial obstructions detected');
      } else {
        toast.info(`Facial obstruction detected: ${result}`);
      }
    } catch (error) {
      console.error('Error classifying image:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setSelectedImage(null);
    setImageUrl(null);
    setClassification(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 gradient-text">
            Face Obstruction Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image or take a photo to detect if there are any obstructions on the face
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {!selectedImage && !isAnalyzing && (
            <ImageUploader onImageSelect={handleImageSelect} />
          )}
          
          {isAnalyzing && (
            <LoadingView className="py-16" />
          )}
          
          {!isAnalyzing && selectedImage && imageUrl && classification && (
            <ResultView 
              imageUrl={imageUrl}
              classification={classification}
              onReset={handleReset}
            />
          )}
          
          <div className="mt-12 bg-secondary/50 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-2">About This Tool</h2>
            <p className="text-muted-foreground">
              This AI-powered tool detects facial obstructions in images. 
              It can identify various types of coverings including masks, glasses, sunglasses, 
              hands, and other objects that may obstruct a face.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
