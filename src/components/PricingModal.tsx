import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Zap, 
  Star, 
  Crown, 
  Check,
  Sparkles
} from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (plan: string, credits: number) => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 10,
    price: 29,
    popular: false,
    icon: Zap,
    features: [
      'Individual resume analysis',
      'Basic interview questions',
      'Skills assessment',
      'Email delivery',
      '7-day access to reports'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    credits: 25,
    price: 59,
    popular: true,
    icon: Star,
    features: [
      'Everything in Starter',
      'Batch processing',
      'Culture fit analysis',
      'Reference recommendations',
      'Risk assessment',
      '30-day access to reports',
      'Priority processing'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 100,
    price: 199,
    popular: false,
    icon: Crown,
    features: [
      'Everything in Professional',
      'Custom branding',
      'API access',
      'Advanced analytics',
      'Team collaboration',
      'Unlimited report access',
      'Dedicated support'
    ]
  }
];

export function PricingModal({ isOpen, onClose, onPurchase }: PricingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border border-primary/20 max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-display font-bold text-foreground">
            Choose Your Plan
          </DialogTitle>
          <p className="text-muted-foreground text-lg">
            Select the perfect credit package for your hiring needs
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`
                relative glass-card transition-all duration-300 hover-lift
                ${plan.popular ? 'border-primary/30 shadow-primary' : 'border-white/10'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1 shadow-primary">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                  <div className={`
                    w-12 h-12 mx-auto rounded-full flex items-center justify-center
                    ${plan.popular ? 'bg-gradient-primary shadow-primary' : 'bg-gradient-card'}
                  `}>
                    <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1 mt-2">
                      <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">for {plan.credits} credits</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${(plan.price / plan.credits).toFixed(2)} per credit
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => onPurchase(plan.id, plan.credits)}
                  className={`
                    w-full transition-all duration-300
                    ${plan.popular 
                      ? 'btn-hero shadow-primary hover:shadow-glow' 
                      : 'btn-glass hover:bg-primary/10'
                    }
                  `}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Get {plan.credits} Credits
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          
          {/* Money Back Guarantee */}
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-foreground">30-Day Money Back Guarantee</h4>
            <p className="text-sm text-muted-foreground">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center justify-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="text-sm">•</div>
            <div className="text-sm">Stripe Protected</div>
            <div className="text-sm">•</div>
            <div className="text-sm">SSL Encrypted</div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}