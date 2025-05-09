
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 border-t mt-auto">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} FaceSight - Face Obstruction Detection</p>
      </div>
    </footer>
  );
};

export default Footer;
