import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Sparkles } from 'lucide-react';

interface HeaderProps {
  credits: number;
  onPricingClick: () => void;
}

export function Header({ credits, onPricingClick }: HeaderProps) {
  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50 transition-smooth">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">InterviewIQ</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Insights</p>
            </div>
          </div>

          {/* Credits & CTA */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="glass-card border-primary/20 text-foreground">
              <CreditCard className="w-4 h-4 mr-2" />
              {credits} Credits
            </Badge>
            <Button
              onClick={onPricingClick}
              className="btn-glass hover-glow"
            >
              Get More Credits
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}