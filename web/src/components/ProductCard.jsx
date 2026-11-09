import Card from '@/components/Card';
import UpdateItem from '@/components/UpdateItem';

export default function ProductCard({ product }) {
  return (
    <li>
      <Card title={product.description} showImage image={product.pictureURL}>
        <p className="text-sm text-gray-600">Part #{product.number}</p>
        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">{product.weight} lbs</p>
        <p className="text-sm">
          {product.quantity > 0
            ? `${product.quantity} in stock`
            : 'out of stock'}
        </p>
        <div className="mt-auto pt-3">
          <UpdateItem itemName={String(product.number)} />
        </div>
      </Card>
    </li>
  );
}
