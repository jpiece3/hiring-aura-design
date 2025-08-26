import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Interview Intelligence Platform" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-primary-glow/30 animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-slide-up">
          
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card border border-primary/20 hover-glow transition-smooth">
            <Sparkles className="w-5 h-5 mr-2 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-foreground">AI-Powered Interview Intelligence</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-hero gradient-text">
              Turn Any Resume Into
              <br />
              Interview Intelligence
            </h1>
            
            <p className="text-hero-sub text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload. Analyze. Interview Better.
              <br />
              Get deep insights, tailored questions, and risk assessments in seconds.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="btn-hero group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Free 3 credits to start</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-16 space-y-4">
            <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              Trusted by hiring managers at
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-lg font-bold">TechCorp</div>
              <div className="text-lg font-bold">InnovateCo</div>
              <div className="text-lg font-bold">FutureWork</div>
              <div className="text-lg font-bold">NextGen</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}