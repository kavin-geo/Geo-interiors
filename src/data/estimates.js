export const homeScopes = [
  { value: '1bhk', label: '1 BHK' },
  { value: '2bhk', label: '2 BHK' },
  { value: '3bhk', label: '3 BHK / house' },
  { value: '4bhk', label: '4 BHK / villa' },
  { value: 'kitchen_only', label: 'Kitchen only' },
]

export const materialTiers = [
  { value: 'budget', label: 'Budget · plywood / PVC' },
  { value: 'standard', label: 'Standard · BWP marine ply' },
  { value: 'premium', label: 'Premium · acrylic finish' },
]

export const estimatePrices = {
  '1bhk': { budget: 100000, standard: 170000, premium: 270000 },
  '2bhk': { budget: 200000, standard: 310000, premium: 470000 },
  '3bhk': { budget: 330000, standard: 470000, premium: 700000 },
  '4bhk': { budget: 430000, standard: 600000, premium: 900000 },
  kitchen_only: { budget: 35000, standard: 85000, premium: 145000 },
}

export const estimatePackages = {
  budget: {
    description: 'A practical starting point for rented homes or budget-conscious projects.',
    includes: [
      'Modular kitchen in commercial plywood and suede laminate',
      'Two-door openable wardrobe with loft storage',
      'Standard TV wall console unit',
      'Standard stainless-steel handles and soft-close hinges',
    ],
  },
  standard: {
    description: 'BWP marine plywood and modern modular fittings.',
    includes: [
      'Modular kitchen with soft-close tandem baskets and granite top',
      'Full-height three-door sliding plywood wardrobes',
      'Living-room floating TV unit with cove light',
      'Wooden pooja mandir unit with CNC jaali work',
      'Gypsum false ceiling with LED cove lights for living room',
    ],
  },
  premium: {
    description: 'Acrylic finishes, hydraulic storage and full interior fittings.',
    includes: [
      'High-gloss acrylic or PU-shutter modular kitchen',
      'Full-bedroom sliding wardrobes with inner mirrors and lockers',
      'Master-bedroom hydraulic lift storage cot with cushioned headboard',
      'Full-wall wood-panelling TV console with glass shelves',
      'Custom pooja-room shrine with brass bells and LED backlight',
      'Complete-home gypsum false ceiling and spotlights',
    ],
  },
}
