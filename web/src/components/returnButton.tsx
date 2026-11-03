'use client';
import { useRouter } from 'next/navigation';

type returnButtonProps = {
  fallbackHREF?: string;
  label?: string;
  styles: string;
};

export default function ReturnButton({
  fallbackHREF = '/',
  label = 'Go Back',
  styles = 'rounded border border-gray-300 px-3 py-1 text-sm',
}: returnButtonProps) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHREF);
    }
  }
  return (
    <button type="button" onClick={goBack} className={`${styles}`}>
      {label}
    </button>
  );
}
