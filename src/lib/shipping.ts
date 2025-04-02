interface ShippingZone {
  range: [number, number]; // [start, end] inclusive
  price: number;
  name: string;
}

// Define shipping zones with their respective price ranges
const shippingZones: ShippingZone[] = [
  {
    range: [10000, 19999],
    price: 4900, // 49 SEK (4900 öre)
    name: "Zone 1 - Stockholm Area",
  },
  {
    range: [20000, 29999],
    price: 7900, // 79 SEK (7900 öre)
    name: "Zone 2 - Uppsala/Västmanland",
  },
  {
    range: [30000, 39999],
    price: 9900, // 99 SEK (9900 öre)
    name: "Zone 3 - Southern Sweden",
  },
  {
    range: [40000, 49999],
    price: 11900, // 119 SEK (11900 öre)
    name: "Zone 4 - Western Sweden",
  },
  {
    range: [50000, 89999],
    price: 14900, // 149 SEK (14900 öre)
    name: "Zone 5 - Northern Sweden",
  },
  {
    range: [90000, 99999],
    price: 19900, // 199 SEK (19900 öre)
    name: "Zone 6 - Far North",
  },
];

export interface ShippingCostResult {
  cost: number;
  zoneName: string;
  error?: string;
}

export function calculateShippingCost(postalCode: string): ShippingCostResult {
  // Validate postal code format
  if (!/^\d{5}$/.test(postalCode)) {
    return {
      cost: 0,
      zoneName: "",
      error: "Invalid postal code format",
    };
  }

  const numericPostalCode = parseInt(postalCode, 10);

  // Find the matching shipping zone
  const zone = shippingZones.find(
    (zone) =>
      numericPostalCode >= zone.range[0] && numericPostalCode <= zone.range[1],
  );

  if (!zone) {
    return {
      cost: 0,
      zoneName: "",
      error: "No shipping zone found for this postal code",
    };
  }

  return {
    cost: zone.price,
    zoneName: zone.name,
  };
}
