import type { Metadata } from 'next';
import '@/styles/globals.css';
import React from 'react';
import Aside from '@/components/layout/aside';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Assignment Admin',
  description: '',
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <Aside />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 items-start gap-4 p-8">{children}</main>
      </div>
    </div>
  );
}
