'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type returnButtonProps = {
  href?: string;
  label?: string;
  styles?: string;
};

export default function Return({
  href,
  label = 'Go Back',
  styles = 'rounded border border-gray-300 px-3 py-1 text-sm',
}: returnButtonProps) {
  const pathName = usePathname();
  const parentPath = pathName.split('/').slice(0, -1).join('/') || '/';
  return (
    <Link href={href ?? parentPath} className={`${styles}`}>
      {label}
    </Link>
  );
}
