import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { RecentPunsList } from './RecentPunsList';

interface PunPanelProps {
  currentPun: string;
  recentPuns: string[];
}

export function PunPanel({ currentPun, recentPuns }: PunPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPun);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Pun Display */}
      <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-card/80">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Latest Snark</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
            "{currentPun}"
          </blockquote>
        </CardContent>
      </Card>

      {/* Recent Puns List */}
      {recentPuns.length > 0 && (
        <RecentPunsList puns={recentPuns} />
      )}
    </div>
  );
}
