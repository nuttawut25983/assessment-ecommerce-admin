import type { Metadata } from 'next';
import React from 'react';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Assignment Admin | Login',
  description: '',
};

type AppProps = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: AppProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default LoginLayout;
