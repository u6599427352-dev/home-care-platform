'use client';

import Sidebar from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HomeCare Platform</h1>
            </div>
          </div>
          <Sidebar isMobile />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}