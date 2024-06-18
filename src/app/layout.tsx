import '@/styles/globals.css';
import React from 'react';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry/StyledRegistry';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Assignment Admin',
  description: '',
};

const LineSeedSand = localFont({
  variable: '--line-seed-sans-font',
  src: [
    {
      path: '../../public/fonts/lineSeedTH/LINESeedSansTH_W_Th.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lineSeedTH/LINESeedSansTH_W_Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lineSeedTH/LINESeedSansTH_W_Bd.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

type AppProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: AppProps) => {
  return (
    <html lang="en">
      <body className={LineSeedSand.className}>
        <StyledComponentsRegistry>
          <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
