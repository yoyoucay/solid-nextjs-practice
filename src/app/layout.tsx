import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SOLID Principles Practice',
  description: 'Practice SOLID principles with Next.js and localStorage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">SOLID Principles Practice</h1>
            <div className="flex space-x-4 mt-2">
              <a href="/" className="hover:underline">Home</a>
              <a href="/principles/srp" className="hover:underline">SRP</a>
              <a href="/principles/ocp" className="hover:underline">OCP</a>
              <a href="/principles/lsp" className="hover:underline">LSP</a>
              <a href="/principles/isp" className="hover:underline">ISP</a>
              <a href="/principles/dip" className="hover:underline">DIP</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}