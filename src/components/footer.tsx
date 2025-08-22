import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline text-lg">Verdant Vista</span>
          </div>
          <p className="text-sm text-foreground/80">
            &copy; {new Date().getFullYear()} Verdant Vista. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-foreground/80 hover:text-accent transition-colors">Facebook</Link>
            <Link href="#" className="text-foreground/80 hover:text-accent transition-colors">Instagram</Link>
            <Link href="#" className="text-foreground/80 hover:text-accent transition-colors">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
