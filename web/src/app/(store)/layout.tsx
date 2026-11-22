import { Suspense } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-ink" />}>
        <NavBar />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
