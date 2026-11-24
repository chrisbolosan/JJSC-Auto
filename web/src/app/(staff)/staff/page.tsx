import Card from '@/components/Card';

const staffSections = [
  {
    href: '/warehouse',
    title: 'Warehouse',
    description: 'Warehouse information logistics and print orders',
  },
  {
    href: '/shipping',
    title: 'Shipping',
    description: 'orders awaiting to be shipped',
  },
  {
    href: '/admin',
    title: 'Admin',
    description: 'Admin UI',
  }
];

export default function StaffHome() {
  return (
    <main className="page">
      <h1 className="page-title">Staff</h1>
      <span className="accent-bar" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {staffSections.map((section) => (
          <Card
            key={section.href}
            href={section.href}
            title={section.title}
            description={section.description}
          />
        ))}
      </div>
    </main>
  );
}
