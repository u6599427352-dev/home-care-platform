'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  HomeIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Fascicolo Domiciliare', href: '/fascicolo', icon: FolderIcon },
  { name: 'Diario Assistenziale', href: '/diario', icon: ClipboardDocumentListIcon },
  { name: 'Operatori', href: '/operatori', icon: UsersIcon },
  { name: 'Documentazione', href: '/documentazione', icon: DocumentTextIcon },
  { name: 'Formazione', href: '/formazione', icon: AcademicCapIcon },
  { name: 'Risk Management', href: '/risk-management', icon: ExclamationTriangleIcon },
];

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className={clsx(
      'flex flex-col h-full',
      !isMobile && collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={clsx(
          'flex items-center space-x-3',
          !isMobile && collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HC</span>
          </div>
          {(!collapsed || isMobile) && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HomeCare</h1>
              <p className="text-xs text-gray-500">Platform</p>
            </div>
          )}
        </div>
        
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setMobileOpen(false)}
              className={clsx(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                !isMobile && collapsed && 'justify-center px-2'
              )}
            >
              <item.icon
                className={clsx(
                  'flex-shrink-0 w-5 h-5',
                  isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500',
                  (!collapsed || isMobile) && 'mr-3'
                )}
              />
              {(!collapsed || isMobile) && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className={clsx(
          'flex items-center',
          !isMobile && collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          {(!collapsed || isMobile) && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Operatore</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
              <SidebarContent />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden md:flex">
      <div className="bg-white border-r border-gray-200 shadow-sm">
        <SidebarContent />
      </div>
    </div>
  );
}