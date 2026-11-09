// Placeholder catalog. Replace with real data (API or database) later. Values are AI generated, all filler data
export const categories = [
	{ id: "brakes", label: "Brakes" },
	{ id: "filters", label: "Filters" },
	{ id: "batteries", label: "Batteries" },
	{ id: "fluids", label: "Fluids" },
];

export const products = [
	{ id: "ceramic-brake-pads-front", sku: "1001", name: "Ceramic brake pads, front set", category: "brakes", price: 54.99, inStock: true, quantity: 24, location: "A-01" },
	{ id: "brake-rotor-vented", sku: "1002", name: "Vented brake rotor", category: "brakes", price: 69.5, inStock: true, quantity: 3, location: "A-02" },
	{ id: "engine-oil-filter", sku: "2001", name: "Engine oil filter", category: "filters", price: 8.99, inStock: true, quantity: 120, location: "B-01" },
	{ id: "cabin-air-filter", sku: "2002", name: "Cabin air filter", category: "filters", price: 17.49, inStock: false, quantity: 0, location: "B-02" },
	{ id: "agm-battery-group-35", sku: "3001", name: "AGM battery, group 35", category: "batteries", price: 189.0, inStock: true, quantity: 8, location: "C-01" },
	{ id: "synthetic-5w30-5qt", sku: "5001", name: "Synthetic 5W-30 motor oil, 5 qt", category: "fluids", price: 29.99, inStock: true, quantity: 45, location: "D-01" },
];

// Returns the products in one category, or all products when no category is given
export function getProductsByCategory(categoryId) {
	if (!categoryId) return products;
	return products.filter((p) => p.category === categoryId);
}