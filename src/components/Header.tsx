
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header className={cn("w-full py-6 px-4 md:px-8", className)} {...props}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-light to-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1 className="text-xl font-bold gradient-text">FaceSight</h1>
        </div>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <a href="/" className="text-foreground hover:text-purple transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-foreground hover:text-purple transition-colors">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
