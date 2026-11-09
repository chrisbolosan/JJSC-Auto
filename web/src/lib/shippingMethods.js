// Placeholder shipping methods. Replace with real data (API or database) later. Values are AI generated, all filler data
export const carriers = [
	{ id: "ups", label: "UPS" },
	{ id: "fedex", label: "FedEx" },
	{ id: "usps", label: "USPS" },
];

export const shippingMethods = [
	{ id: "ups-ground", carrier: "ups", service: "Ground", price: 12.5, deliveryTime: "3-5 business days", active: true },
	{ id: "ups-2day", carrier: "ups", service: "2nd Day Air", price: 28.0, deliveryTime: "2 business days", active: true },
	{ id: "fedex-ground", carrier: "fedex", service: "Ground", price: 11.75, deliveryTime: "3-5 business days", active: true },
	{ id: "fedex-express-saver", carrier: "fedex", service: "Express Saver", price: 24.0, deliveryTime: "3 business days", active: false },
	{ id: "usps-priority", carrier: "usps", service: "Priority Mail", price: 9.95, deliveryTime: "2-3 business days", active: true },
	{ id: "usps-ground-advantage", carrier: "usps", service: "Ground Advantage", price: 6.5, deliveryTime: "3-5 business days", active: true },
];

// Returns the shipping methods for one carrier, or all methods when no carrier is given
export function getShippingMethodsByCarrier(carrierId) {
	if (!carrierId) return shippingMethods;
	return shippingMethods.filter((m) => m.carrier === carrierId);
}