
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      title: "Upload Images",
      description: "Easily upload images from your device to check for facial obstructions."
    },
    {
      title: "Camera Integration",
      description: "Take photos directly using your device camera for instant analysis."
    },
    {
      title: "Multiple Detection Categories",
      description: "Detects various types of facial obstructions: none, mask, sunglasses, glasses, hand, and others."
    },
    {
      title: "Fast Results",
      description: "Get instant classification results displayed directly on your image."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">About FaceSight</h1>
          <p className="text-muted-foreground mb-8">Advanced facial obstruction detection using AI</p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Technology</CardTitle>
              <CardDescription>How FaceSight works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                FaceSight uses advanced AI computer vision algorithms to detect and classify 
                facial obstructions in images. Our models have been trained on diverse datasets
                to accurately identify various types of obstructions.
              </p>
              <p>
                The AI model classifies images into multiple categories: 'none' (no obstruction),
                'mask', 'sunglasses', 'glasses', 'hand', or 'other' depending on what is 
                detected in the image.
              </p>
              <p>
                This technology has practical applications in security systems, identity 
                verification processes, and automated compliance checking for environments 
                where face coverings may or may not be required.
              </p>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                At FaceSight, we prioritize your privacy. All image processing is done 
                directly in your browser using client-side AI, and we do not store your 
                uploaded images or analysis results on our servers.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
