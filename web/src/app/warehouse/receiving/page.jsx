import ReceivingDesk from '@/components/ReceivingDesk';

export const metadata = {
  title: 'Receiving | JJSC AUTO',
};

export default function ReceivingPage() {
  return (
    <div>
      <h1 className="text-lg font-bold bg-blue-500 text-white px-4 py-2">
        Warehouse Receiving UI
      </h1>
      <ReceivingDesk />
    </div>
  );
}
