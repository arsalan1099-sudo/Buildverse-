import { ArrowLeft, Compass, Map } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="page-grid flex min-h-[100dvh] items-center justify-center bg-background px-5">
      <div className="max-w-lg text-center" data-testid="state-not-found">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[hsl(var(--primary)/.25)] bg-[hsl(var(--primary)/.1)] text-[hsl(var(--primary))]">
          <Map size={34} />
        </div>
        <p className="mt-8 font-mono-ui text-xs uppercase tracking-[.2em] text-[hsl(var(--primary))]">Coordinates unknown / 404</p>
        <h1 className="display-title mt-3 text-6xl font-bold">This place<br />isn’t built yet.</h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-muted-foreground">The page you’re looking for may have moved, or it may still be a line on someone’s drawing.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-bold text-[hsl(var(--primary-foreground))]" data-testid="link-not-found-home"><Compass size={16} />Back to BUILDVERSE</Link>
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold" data-testid="link-not-found-projects"><ArrowLeft size={16} />Browse work</Link>
        </div>
      </div>
    </div>
  );
}