import React from 'react';

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <LoadingSpinner className="h-12 w-12" />
    </div>
  );
}