import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecentPunsListProps {
  puns: string[];
}

export function RecentPunsList({ puns }: RecentPunsListProps) {
  return (
    <Card className="border-muted bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Puns</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {puns.map((pun, index) => (
              <div
                key={`${pun}-${index}`}
                className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-colors"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {pun}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
