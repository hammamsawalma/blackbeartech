import React from 'react';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-bg-primary">
      {children}
    </main>
  );
}
