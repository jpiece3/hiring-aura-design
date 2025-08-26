import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  FileText, 
  Users, 
  Mail, 
  CreditCard, 
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface UploadSectionProps {
  credits: number;
  onAnalyze: (files: File[], email: string, mode: 'single' | 'batch') => void;
}

export function UploadSection({ credits, onAnalyze }: UploadSectionProps) {
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadMode, setUploadMode] = useState<'single' | 'batch'>('single');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (uploadMode === 'single' && acceptedFiles.length > 1) {
      setFiles([acceptedFiles[0]]);
    } else {
      setFiles(acceptedFiles);
    }
  }, [uploadMode]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: uploadMode === 'batch'
  });

  const handleAnalyze = async () => {
    if (files.length === 0 || !email) return;
    
    setIsProcessing(true);
    await onAnalyze(files, email, uploadMode);
    setIsProcessing(false);
  };

  const requiredCredits = uploadMode === 'single' ? 1 : files.length;
  const hasEnoughCredits = credits >= requiredCredits;

  return (
    <section className="py-24 relative" id="upload">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Start Your <span className="gradient-text">Analysis</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Upload resumes and get comprehensive interview intelligence in seconds
          </p>
        </div>

        {/* Upload Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border border-white/10 shadow-premium">
            <CardContent className="p-8">
              
              {/* Mode Toggle */}
              <Tabs value={uploadMode} onValueChange={(value) => setUploadMode(value as 'single' | 'batch')} className="mb-8">
                <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                  <TabsTrigger value="single" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Single Resume</span>
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Batch Processing</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-6 mt-8">
                  {/* Single Upload */}
                  <div
                    {...getRootProps()}
                    className={`
                      border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                      ${isDragActive 
                        ? 'border-primary bg-primary/5 scale-105' 
                        : 'border-white/20 hover:border-primary/50 hover:bg-white/5'
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-primary">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {isDragActive ? 'Drop your resume here' : 'Upload Resume'}
                        </h3>
                        <p className="text-muted-foreground">
                          Drag & drop your PDF, DOC, or DOCX file here, or click to browse
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="batch" className="space-y-6 mt-8">
                  {/* Batch Upload */}
                  <div
                    {...getRootProps()}
                    className={`
                      border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                      ${isDragActive 
                        ? 'border-primary bg-primary/5 scale-105' 
                        : 'border-white/20 hover:border-primary/50 hover:bg-white/5'
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-hero flex items-center justify-center shadow-glow">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {isDragActive ? 'Drop your resumes here' : 'Batch Upload'}
                        </h3>
                        <p className="text-muted-foreground">
                          Upload multiple resumes at once for efficient batch processing
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-foreground">Selected Files:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-white/10">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  ))}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email to receive results"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-muted/20 border-white/10 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Credit Info & CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{credits} Credits Available</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    <span>Cost: {requiredCredits} credit{requiredCredits > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={files.length === 0 || !email || !hasEnoughCredits || isProcessing}
                  className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze Resume{files.length > 1 ? 's' : ''}
                      <Zap className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Credit Warning */}
              {!hasEnoughCredits && files.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-warning">Insufficient Credits</p>
                    <p className="text-xs text-warning/80">
                      You need {requiredCredits} credit{requiredCredits > 1 ? 's' : ''} but only have {credits} available.
                    </p>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}