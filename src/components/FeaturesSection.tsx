import { 
  CheckCircle, 
  Target, 
  Compass, 
  MessageSquare, 
  Users, 
  AlertTriangle,
  Shield,
  Sparkles 
} from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Employment Verification',
    description: 'Validate work history, dates, and role progression with comprehensive background checks.',
    color: 'text-success'
  },
  {
    icon: Target,
    title: 'Skills Assessment',
    description: 'Deep analysis of technical abilities, soft skills, and competency gaps.',
    color: 'text-primary'
  },
  {
    icon: Compass,
    title: 'Culture Fit Analysis',
    description: 'Personality insights and team compatibility scoring based on resume patterns.',
    color: 'text-accent'
  },
  {
    icon: MessageSquare,
    title: 'Tailored Questions',
    description: 'AI-generated interview questions specific to candidate experience and role requirements.',
    color: 'text-warning'
  },
  {
    icon: Users,
    title: 'Reference Recommendations',
    description: 'Strategic guidance on which references to contact and what questions to ask.',
    color: 'text-primary-glow'
  },
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Identify potential red flags, employment gaps, and areas requiring deeper investigation.',
    color: 'text-destructive'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-primary blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-hero blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card border border-primary/20">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-foreground">What You Get</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            Complete Interview
            <span className="gradient-text"> Intelligence</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every analysis includes comprehensive insights to help you conduct better, more informed interviews
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-feature group"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animation: 'slideUp 0.8s ease-out forwards'
              }}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-card flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-4 rounded-xl glass-card border border-primary/20 hover-glow transition-smooth">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Source-Verified Research & Citations</p>
              <p className="text-sm text-muted-foreground">All insights backed by verifiable data sources</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}