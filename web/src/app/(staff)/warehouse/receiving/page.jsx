import ReceivingDesk from '@/components/ReceivingDesk';

export const metadata = {
  title: 'Receiving | JJSC AUTO',
};

export default function ReceivingPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="page">
        <h1 className="page-title">Receiving</h1>
        <span className="accent-bar" />
        <p className="mt-3 text-sm text-steel">
          Search for a part from the deliveries and then enter how many arrived.
        </p>
        <ReceivingDesk />
      </div>
    </div>
  );
}
