import { Button } from '@/components/ui/button';
import Link from 'next/link';
 
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Tapahtui jokin virhe sivun lataamisessa</p>
        <Button>
        <Link
        href="/">
        Etusivulle
      </Link>
        </Button>
    </main>
  );
}