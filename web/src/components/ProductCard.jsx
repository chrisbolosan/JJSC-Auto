import Card from '@/components/Card';
import UpdateItem from '@/components/UpdateItem';

export default function ProductCard({ product }) {
  return (
    <li>
      <Card title={product.description} showImage image={product.pictureURL}>
        <p className="text-sm text-metal">Part #{product.number}</p>
        <p className="mt-2 text-lg font-black text-ink">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-metal">{product.weight} lbs</p>
        <p
          className={`mt-1 text-sm font-semibold ${product.quantity > 0 ? 'text-ok' : 'error-text'}`}
        >
          {product.quantity > 0
            ? `${product.quantity} in stock`
            : 'out of stock'}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-3">
          <UpdateItem
            itemName={String(product.number)}
            itemStock={Number(product.quantity)}
          />
        </div>
      </Card>
    </li>
  );
}
