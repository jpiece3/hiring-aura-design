import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Brain, 
  Search, 
  CheckCircle, 
  Sparkles,
  Clock
} from 'lucide-react';

interface ProcessingModalProps {
  isOpen: boolean;
  files: File[];
  currentStep: number;
  estimatedTime: number;
  onComplete: () => void;
}

const processingSteps = [
  {
    icon: FileText,
    title: 'Parsing Documents',
    description: 'Extracting text and structure from resumes'
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Deep learning analysis of skills and experience'
  },
  {
    icon: Search,
    title: 'Background Research',
    description: 'Verifying employment and gathering insights'
  },
  {
    icon: CheckCircle,
    title: 'Generating Report',
    description: 'Compiling comprehensive interview intelligence'
  }
];

export function ProcessingModal({ 
  isOpen, 
  files, 
  currentStep, 
  estimatedTime, 
  onComplete 
}: ProcessingModalProps) {
  const progress = ((currentStep + 1) / processingSteps.length) * 100;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="glass-card border border-primary/20 max-w-2xl">
        <div className="space-y-8 py-6">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Analyzing Resume{files.length > 1 ? 's' : ''}
              </h2>
              <p className="text-muted-foreground">
                Our AI is generating comprehensive interview intelligence
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Processing Steps */}
          <div className="space-y-4">
            {processingSteps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={step.title}
                  className={`
                    flex items-center space-x-4 p-4 rounded-lg transition-all duration-300
                    ${isActive ? 'bg-primary/10 border border-primary/20' : ''}
                    ${isCompleted ? 'opacity-60' : ''}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-success text-white' 
                      : isActive 
                        ? 'bg-primary text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`
                      font-medium transition-colors
                      ${isActive ? 'text-primary' : 'text-foreground'}
                    `}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {isActive && (
                    <Badge variant="outline" className="border-primary/20 text-primary">
                      Processing...
                    </Badge>
                  )}
                  
                  {isCompleted && (
                    <Badge className="bg-success text-white">
                      Complete
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>

          {/* File Progress */}
          {files.length > 1 && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">File Progress</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{file.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {index <= currentStep ? 'Processing' : 'Queued'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Time */}
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Estimated time: {estimatedTime}s remaining
            </span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}