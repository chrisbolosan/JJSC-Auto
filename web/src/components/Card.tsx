import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  title: string;
  description?: string;
  href?: string;
  showImage?: boolean;
  image?: string | null;
  children?: React.ReactNode;
};

export default function Card({
  title,
  description,
  href,
  showImage,
  image,
  children,
}: CardProps) {
  const card = (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white text-zinc-900 hover:shadow-md">
      {showImage && (
        <div className="relative flex aspect-square items-center justify-center bg-gray-100 text-sm text-gray-500">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-contain p-2"
            />
          ) : (
            'No image'
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-3 block h-1 w-10 bg-red-600" />
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-zinc-600">{description}</p>
        )}
        {children}
      </div>
    </div>
  );

  if (!href) {
    return card;
  }
  return (
    <Link href={href} className="block h-full">
      {card}
    </Link>
  );
}
