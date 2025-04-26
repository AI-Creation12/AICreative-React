import React from 'react';
import { Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-2 text-cyan-400 flex items-center justify-center gap-2 cyber-glow">
        <Terminal className="w-8 h-8" />
        Cyber Chef
      </h1>
      <p className="text-cyan-300">Let the Cyber Chef inspire your next meal!</p>
    </header>
  );
};