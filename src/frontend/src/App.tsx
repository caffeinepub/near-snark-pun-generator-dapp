import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { PunPanel } from './components/PunPanel';
import { useGeneratePun } from './hooks/useGeneratePun';
import { SiX, SiGithub } from 'react-icons/si';

function App() {
  const [currentPun, setCurrentPun] = useState<string>('');
  const [recentPuns, setRecentPuns] = useState<string[]>([]);
  const { mutate: generatePun, isPending, isError, error } = useGeneratePun();

  const handleGenerate = () => {
    generatePun(undefined, {
      onSuccess: (pun) => {
        setCurrentPun(pun);
        setRecentPuns((prev) => {
          const updated = [pun, ...prev];
          return updated.slice(0, 10); // Keep only last 10
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/near-snark-bg-tile.dim_1024x1024.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/generated/near-snark-logo.dim_512x512.png" 
                alt="NEAR Snark Logo" 
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  NEAR Snark Generator
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Condescending crypto commentary, one pun at a time
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Powered by sarcasm & blockchain skepticism</span>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Generate brutally honest, condescending puns about the NEAR protocol. 
                Because someone has to say it.
              </p>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={isPending}
                size="lg"
                className="text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Snark...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Pun
                  </>
                )}
              </Button>
            </div>

            {/* Error Alert */}
            {isError && (
              <Alert variant="destructive">
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    {error instanceof Error ? error.message : 'Failed to generate pun. Try again?'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    className="ml-4"
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Pun Display & Recent Puns */}
            {currentPun && (
              <PunPanel 
                currentPun={currentPun} 
                recentPuns={recentPuns}
              />
            )}

            {/* Info Card */}
            <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Each click generates a fresh serving of sarcasm from our on-chain collection 
                  of NEAR-themed roasts. All puns are stored on the Internet Computer blockchain, 
                  because even our jokes are more decentralized than NEAR.
                </p>
                <p className="text-xs">
                  <strong>Disclaimer:</strong> This is satire. We're poking fun at blockchain protocols, 
                  not people. If you're offended, maybe you should be building on a different chain. 😏
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 mt-20 py-8 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} NEAR Snark Generator. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'near-snark-generator'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
