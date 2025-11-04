'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const principles = [
  { name: 'SRP', href: '/principles/srp', description: 'Single Responsibility' },
  { name: 'OCP', href: '/principles/ocp', description: 'Open/Closed' },
  { name: 'LSP', href: '/principles/lsp', description: 'Liskov Substitution' },
  { name: 'ISP', href: '/principles/isp', description: 'Interface Segregation' },
  { name: 'DIP', href: '/principles/dip', description: 'Dependency Inversion' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            SOLID Principles
          </Link>
          
          <div className="flex space-x-1">
            {principles.map((principle) => (
              <Link
                key={principle.name}
                href={principle.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === principle.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={principle.description}
              >
                {principle.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}