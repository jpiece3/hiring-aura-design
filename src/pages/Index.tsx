import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { UploadSection } from '@/components/UploadSection';
import { ProcessingModal } from '@/components/ProcessingModal';
import { PricingModal } from '@/components/PricingModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [credits, setCredits] = useState(3); // Free starter credits
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const { toast } = useToast();

  const handleGetStarted = () => {
    // Smooth scroll to upload section
    const uploadSection = document.getElementById('upload');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = async (files: File[], email: string, mode: 'single' | 'batch') => {
    setProcessingFiles(files);
    setIsProcessing(true);
    setCurrentStep(0);
    setEstimatedTime(files.length * 30); // 30 seconds per file

    // Simulate processing steps
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds per step
      setCurrentStep(i);
      setEstimatedTime(prev => Math.max(0, prev - 8));
    }

    // Deduct credits
    const creditsUsed = mode === 'single' ? 1 : files.length;
    setCredits(prev => prev - creditsUsed);

    // Show success message
    toast({
      title: "Analysis Complete!",
      description: `Your interview intelligence report${files.length > 1 ? 's have' : ' has'} been sent to ${email}`,
    });

    setIsProcessing(false);
    setProcessingFiles([]);
  };

  const handlePurchase = async (plan: string, creditsToAdd: number) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCredits(prev => prev + creditsToAdd);
    setIsPricingOpen(false);
    
    toast({
      title: "Credits Added!",
      description: `Successfully added ${creditsToAdd} credits to your account`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header 
        credits={credits} 
        onPricingClick={() => setIsPricingOpen(true)} 
      />

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
        <UploadSection 
          credits={credits} 
          onAnalyze={handleAnalyze} 
        />
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-foreground">
              Ready to Transform Your Hiring Process?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of hiring managers who use InterviewIQ to make better, 
              more informed hiring decisions with AI-powered resume analysis.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-muted-foreground">
            <p>&copy; 2024 InterviewIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProcessingModal
        isOpen={isProcessing}
        files={processingFiles}
        currentStep={currentStep}
        estimatedTime={estimatedTime}
        onComplete={() => setIsProcessing(false)}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default Index;