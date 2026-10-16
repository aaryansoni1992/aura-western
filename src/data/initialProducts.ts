import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. DRESSES & CO-ORD SETS
  {
    id: 'aw-prod-001',
    slug: 'fuchsia-cutout-satin-midi-dress',
    name: 'Fuchsia Cutout Satin Midi Dress',
    tagline: 'Lustrous satin with an asymmetric waist cut-out',
    category: 'dresses-co-ord-sets',
    price: 1899,
    originalPrice: 2899,
    discountPercent: 34,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vibrant Fuchsia', hex: '#E11D48' },
      { name: 'Midnight Emerald', hex: '#064E3B' },
      { name: 'Champagne Gold', hex: '#FDE68A' }
    ],
    stock: 14,
    inStock: true,
    description: 'Designed to command the room. Crafted from high-gloss fluid crepe satin with an alluring side waist cutout and a soft cowl neck that drapes effortlessly over your silhouette.',
    details: [
      'Fluid premium polyester-satin with subtle mechanical stretch',
      'Asymmetric side cutout with soft ruched detailing',
      'Concealed invisible zip closure at side seam',
      'Model is 5\'8" wearing size S',
      'Hits at mid-calf length'
    ],
    material: '95% Satin-Finish Polyester, 5% Elastane',
    careInstructions: 'Dry clean recommended. Gentle cold hand wash inside out. Cool iron on reverse.',
    isNewArrival: true,
    isTrending: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'aw-prod-002',
    slug: 'sunflower-linen-blend-coord-set',
    name: 'Sunflower Linen-Blend Co-ord Set',
    tagline: 'Breezy crop shirt & high-waisted pleated wide trousers',
    category: 'dresses-co-ord-sets',
    price: 2199,
    originalPrice: 3299,
    discountPercent: 33,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Warm Terracotta', hex: '#EA580C' },
      { name: 'Pure Oat Cream', hex: '#F5F5F0' },
      { name: 'Sage Mint', hex: '#84A98C' }
    ],
    stock: 9,
    inStock: true,
    description: 'The epitome of resort ease. Features a boxy notched-collar short sleeve shirt paired with wide-leg pleated trousers with a comfy elasticated back waistband.',
    details: [
      'Breathable linen-cotton blended fabric for hot Rajasthan summers',
      'Tortoiseshell horn buttons down the front',
      'Deep functional side pockets on trousers',
      'High-waisted fit with wide hem openings'
    ],
    material: '60% Linen, 40% Fine Cotton',
    careInstructions: 'Machine wash delicate at 30°C. Do not tumble dry. Warm steam iron.',
    isNewArrival: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: '2026-03-05T12:00:00Z'
  },
  {
    id: 'aw-prod-003',
    slug: 'emerald-wrap-front-mini-dress',
    name: 'Emerald Wrap-Front Tiered Dress',
    tagline: 'Flattering tulip hem with flutter sleeves',
    category: 'dresses-co-ord-sets',
    price: 1499,
    originalPrice: 2299,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Deep Emerald', hex: '#064E3B' },
      { name: 'Rose Blush', hex: '#FB7185' }
    ],
    stock: 12,
    inStock: true,
    description: 'A delightful feminine silhouette featuring a wrapped V-neckline, self-tie sash at the waist, and gentle ruffled tiers at the hem for fluid movement.',
    details: [
      'Soft textured georgette with opaque inner lining',
      'Adjustable wrap belt ensures custom waist fit',
      'Flattering flutter cap sleeves',
      'Above knee length'
    ],
    material: '100% Poly-Georgette with soft voile lining',
    careInstructions: 'Hand wash cold. Line dry in shade.',
    isTrending: true,
    rating: 4.7,
    reviewCount: 19,
    createdAt: '2026-02-18T09:00:00Z'
  },

  // 2. WOMEN'S WESTERN WEAR
  {
    id: 'aw-prod-004',
    slug: 'aurora-pleated-cape-jumpsuit',
    name: 'Aurora Tailored Cape Jumpsuit',
    tagline: 'Modern sculpted bodice with flowing capelet back',
    category: 'womens-western-wear',
    price: 2499,
    originalPrice: 3899,
    discountPercent: 36,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Royal Plum', hex: '#7C3AED' },
      { name: 'Classic Black', hex: '#0F172A' },
      { name: 'Crimson Red', hex: '#BE123C' }
    ],
    stock: 8,
    inStock: true,
    description: 'An architectural showstopper. Clean notched collar leading into a slim tailored waist and wide straight leg, complemented by a dramatic cape drape.',
    details: [
      'Structured suiting crepe with slight comfort stretch',
      'Detachable statement buckle belt included',
      'Functional slant side pockets',
      'Concealed back zip closure'
    ],
    material: '92% Polyester, 8% Spandex',
    careInstructions: 'Dry clean only. Steam iron on low setting.',
    isNewArrival: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 41,
    createdAt: '2026-03-08T15:00:00Z'
  },
  {
    id: 'aw-prod-005',
    slug: 'satin-lapel-double-breasted-blazer',
    name: 'Satin Lapel Double-Breasted Blazer',
    tagline: 'Sharply tailored power blazer in vibrant coral',
    category: 'womens-western-wear',
    price: 2799,
    originalPrice: 4299,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vibrant Coral', hex: '#F97316' },
      { name: 'Fuchsia Pink', hex: '#E11D48' },
      { name: 'Ivory White', hex: '#FAF8F5' }
    ],
    stock: 11,
    inStock: true,
    description: 'Sharp shoulder definition meets feminine tailoring. Accented with contrast satin peak lapels and horn buttons. Looks stunning paired with denims or trousers.',
    details: [
      'Tailored European cut with padded shoulders',
      'Contrasting tonal satin peak lapels',
      'Dual flap pockets and interior chest pocket',
      'Fully lined in breathable silk-like polyester'
    ],
    material: 'Shell: 78% Poly, 18% Rayon, 4% Spandex. Lining: 100% Poly',
    careInstructions: 'Professional dry clean only.',
    isTrending: true,
    rating: 4.9,
    reviewCount: 30,
    createdAt: '2026-02-25T11:00:00Z'
  },

  // 3. SHIRTS & TOPS
  {
    id: 'aw-prod-006',
    slug: 'scarlet-satin-cowl-halter-top',
    name: 'Scarlet Satin Cowl-Neck Halter Top',
    tagline: 'High-shine party top with tie-neck detailing',
    category: 'shirts-tops',
    price: 999,
    originalPrice: 1599,
    discountPercent: 38,
    images: [
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Scarlet Rose', hex: '#E11D48' },
      { name: 'Golden Olive', hex: '#CA8A04' },
      { name: 'Obsidian Black', hex: '#0F172A' }
    ],
    stock: 16,
    inStock: true,
    description: 'Sleek, feminine and effortlessly glamorous. The cowl neck drapes beautifully while the halter neck ties gracefully at the nape of your neck.',
    details: [
      'Ultra-soft liquid satin with glossy sheen',
      'Adjustable halter ribbon ties at back neck',
      'Open back with elasticated lower hem for a secure fit',
      'Cropped just above natural waistline'
    ],
    material: '100% Polyester Satin',
    careInstructions: 'Hand wash cold. Lay flat to dry.',
    isNewArrival: true,
    isTrending: true,
    rating: 4.8,
    reviewCount: 27,
    createdAt: '2026-03-10T14:00:00Z'
  },
  {
    id: 'aw-prod-007',
    slug: 'oversized-poplin-boyfriend-shirt',
    name: 'Crisp Oversized Poplin Shirt',
    tagline: 'Relaxed drop-shoulder silhouette with pearl buttons',
    category: 'shirts-tops',
    price: 1299,
    originalPrice: 1999,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Electric Lilac', hex: '#A855F7' },
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sky Chambray', hex: '#38BDF8' }
    ],
    stock: 20,
    inStock: true,
    description: 'Your go-to effortless layer. Cut from crisp high-density cotton poplin with exaggerated cuffs, a curved high-low hem, and mother-of-pearl buttons.',
    details: [
      '100% combed cotton poplin with easy-iron finish',
      'Exaggerated pointed spread collar',
      'Single patch pocket at chest',
      'Can be worn buttoned up, tucked in, or open as a light shacket'
    ],
    material: '100% Premium Combed Cotton',
    careInstructions: 'Machine wash warm with similar colours. Tumble dry low.',
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 45,
    createdAt: '2026-02-10T08:00:00Z'
  },
  {
    id: 'aw-prod-008',
    slug: 'corset-waist-organza-blouse',
    name: 'Corset-Waist Organza Blouse',
    tagline: 'Sheer balloon sleeves with boned structure waist',
    category: 'shirts-tops',
    price: 1399,
    originalPrice: 2199,
    discountPercent: 36,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Fuchsia Berry', hex: '#BE185D' },
      { name: 'Pearl Cream', hex: '#FFFBEB' }
    ],
    stock: 10,
    inStock: true,
    description: 'Romantic vintage meets modern partywear. Feautures dramatic sheer organza puff sleeves and an internal sweetheart lining with flexible shaping boning.',
    details: [
      'Semi-sheer shimmer organza with opaque bust lining',
      'Square neckline framing the collarbones',
      'Smocked elastic back panel for flexible comfort',
      'Elongated cuffs with button loops'
    ],
    material: 'Poly-Organza blend with cotton lining',
    careInstructions: 'Dry clean or gentle hand wash in lukewarm water.',
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 16,
    createdAt: '2026-03-02T13:00:00Z'
  },

  // 4. JEANS & TROUSERS
  {
    id: 'aw-prod-009',
    slug: 'wide-leg-high-rise-rigid-denim',
    name: 'Palazzo Wide-Leg High-Rise Jeans',
    tagline: 'Retro 90s vintage wash with flattering high-rise contour',
    category: 'jeans-trousers',
    price: 1699,
    originalPrice: 2599,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Vintage Tint Blue', hex: '#60A5FA' },
      { name: 'Midnight Charcoal', hex: '#334155' },
      { name: 'Ecru Off-White', hex: '#F5F5F0' }
    ],
    stock: 18,
    inStock: true,
    description: 'The denim of the season. Sits snug across the high waist and hips, cascading down into an elongated wide-leg silhouette that pairs cleanly with heels or sneakers.',
    details: [
      '12.5 oz comfort stretch denim that holds shape all day',
      '11.5-inch high rise waist',
      '5-pocket classic western styling with antique copper rivets',
      'Raw frayed or clean stitched hem'
    ],
    material: '98% Cotton, 2% Elastane',
    careInstructions: 'Turn inside out before washing. Machine wash cold with dark colours.',
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 54,
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'aw-prod-010',
    slug: 'pleated-straight-tailored-trousers',
    name: 'Pleated Straight Tailored Trousers',
    tagline: 'Sharp double pleats with elastic comfort back waistband',
    category: 'jeans-trousers',
    price: 1599,
    originalPrice: 2399,
    discountPercent: 33,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sunset Terracotta', hex: '#C2410C' },
      { name: 'Lavender Haze', hex: '#C084FC' },
      { name: 'Oatmeal Beige', hex: '#D6D3D1' }
    ],
    stock: 15,
    inStock: true,
    description: 'Effortlessly polished whether you’re heading to meetings in Jaipur or dinner with friends. Front double pleats create an elegant drape through the leg.',
    details: [
      'High-twist wrinkle-resistant poly-viscose blend',
      'Double front pleats with deep side pockets',
      'Concealed hook-and-bar fly closure',
      'Belt loops to accommodate skinny or wide belts'
    ],
    material: '65% Polyester, 32% Viscose, 3% Elastane',
    careInstructions: 'Machine wash cold on delicate cycle. Warm iron.',
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2026-02-28T16:00:00Z'
  },

  // 5. T-SHIRTS
  {
    id: 'aw-prod-011',
    slug: 'aura-signature-embossed-drop-shoulder-tee',
    name: 'Aura Signature Drop-Shoulder Tee',
    tagline: 'Heavyweight 240 GSM combed cotton with puff print logo',
    category: 't-shirts',
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Neon Coral', hex: '#FB7185' },
      { name: 'Lilac Dream', hex: '#C084FC' },
      { name: 'Cloud White', hex: '#FFFFFF' }
    ],
    stock: 25,
    inStock: true,
    description: 'Our viral signature tee. Cut in a boxy streetwear drop-shoulder fit using pre-shrunk 240 GSM cotton. Features the understated "Aura Western" puff print logo on the chest.',
    details: [
      '240 GSM 100% Super-Combed Bio-Washed Cotton',
      'Thick 1-inch ribbed collar that doesn’t sag',
      'Oversized relaxed unisex fit',
      'Pre-shrunk fabric with zero color bleeding'
    ],
    material: '100% Bio-Washed Combed Cotton',
    careInstructions: 'Machine wash cold inside out. Do not iron directly on the print.',
    isNewArrival: true,
    isTrending: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 67,
    createdAt: '2026-03-01T09:00:00Z'
  },
  {
    id: 'aw-prod-012',
    slug: 'vintage-motel-graphic-baby-tee',
    name: 'Desert Mirage Ribbed Baby Tee',
    tagline: 'Fitted 90s crop cut in stretch micro-rib',
    category: 't-shirts',
    price: 699,
    originalPrice: 1099,
    discountPercent: 36,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Fuchsia Pink', hex: '#E11D48' },
      { name: 'Washed Black', hex: '#1E293B' },
      { name: 'Vanilla Cream', hex: '#FEF3C7' }
    ],
    stock: 20,
    inStock: true,
    description: 'Nostalgic 90s baby tee aesthetic. Super-soft stretch micro-rib fabric that hugs your curves comfortably, finished with playful contrast stitching.',
    details: [
      'Fine 2x2 stretch cotton rib knit',
      'Cropped length landing right at the belly button',
      'Crew neck with contrast baby lock hem',
      'High breathability for sunny days'
    ],
    material: '95% Cotton, 5% Spandex Rib',
    careInstructions: 'Gentle cycle wash cold. Lay flat to dry.',
    isTrending: true,
    rating: 4.7,
    reviewCount: 31,
    createdAt: '2026-02-14T11:00:00Z'
  },

  // 6. JACKETS & WINTER WEAR
  {
    id: 'aw-prod-013',
    slug: 'cropped-vegan-leather-moto-jacket',
    name: 'Cropped Vegan Leather Biker Jacket',
    tagline: 'Asymmetric silver zip with buckled collar and notched lapels',
    category: 'jackets-winter-wear',
    price: 2999,
    originalPrice: 4599,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Burgundy Wine', hex: '#881337' },
      { name: 'Pitch Black', hex: '#0F172A' },
      { name: 'Caramel Tan', hex: '#B45309' }
    ],
    stock: 7,
    inStock: true,
    description: 'The ultimate cool-girl outerwear. Cut in a modern cropped silhouette from butter-soft vegan PU leather, accented with heavy-duty silver hardware and snap-down lapels.',
    details: [
      'Buttery soft 100% cruelty-free vegan leather',
      'Full satin quilted interior lining for mild winter warmth',
      'Asymmetric front heavy-gauge metal zip',
      'Functional zipped cuffs and zip pocket'
    ],
    material: '100% Polyurethane exterior, 100% Polyester lining',
    careInstructions: 'Wipe clean with a damp cloth. Do not bleach or tumble dry.',
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 48,
    createdAt: '2026-01-15T12:00:00Z'
  },
  {
    id: 'aw-prod-014',
    slug: 'oversized-wool-blend-checked-shacket',
    name: 'Sunset Plaid Oversized Shacket',
    tagline: 'Warm brushed flannel with dropped shoulders & horn buttons',
    category: 'jackets-winter-wear',
    price: 2299,
    originalPrice: 3499,
    discountPercent: 34,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Coral & Violet Plaid', hex: '#C026D3' },
      { name: 'Camel & Rust Check', hex: '#9A3412' }
    ],
    stock: 9,
    inStock: true,
    description: 'Half shirt, half jacket — 100% cozy. Crafted from dense brushed wool-blend fabric with vibrant warm tones, dual oversized chest pockets, and side slit hems.',
    details: [
      'Heavy brushed fabric that blocks wind chills',
      'Oversized relaxed fit designed for layering sweaters underneath',
      'Twin front flap pockets plus hidden side entry hand pockets',
      'Curved high-low shirt hem'
    ],
    material: '45% Wool blend, 55% Polyester',
    careInstructions: 'Dry clean recommended or hand wash cold.',
    isTrending: true,
    rating: 4.8,
    reviewCount: 26,
    createdAt: '2026-02-01T14:00:00Z'
  },

  // 7. ACCESSORIES
  {
    id: 'aw-prod-015',
    slug: 'sculpted-gold-croissant-hoops',
    name: 'Sculpted Chunky Croissant Hoops',
    tagline: '18K gold-plated waterproof stainless steel statement earrings',
    category: 'accessories',
    price: 599,
    originalPrice: 999,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    colors: [
      { name: '18K Yellow Gold', hex: '#EAB308' },
      { name: 'Gloss Silver', hex: '#E2E8F0' }
    ],
    stock: 30,
    inStock: true,
    description: 'The viral croissant dome earrings that elevate any casual outfit into a runway-ready statement. Hollow cast ensures comfortable all-day wear without pulling your earlobes.',
    details: [
      '18K PVD gold vacuum plating over 316L medical-grade stainless steel',
      '100% waterproof, sweatproof and tarnish-resistant',
      'Hypoallergenic, nickel-free and lead-free',
      'Secure click-top latch closure'
    ],
    material: '316L Stainless Steel with 18K Gold PVD',
    careInstructions: 'Store in cotton pouch when not in use. Wipe gently with microfibre cloth.',
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    reviewCount: 78,
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'aw-prod-016',
    slug: 'fuchsia-curved-baguette-shoulder-bag',
    name: 'Fuchsia Minimalist Baguette Shoulder Bag',
    tagline: 'Sleek curved silhouette with detachable chain extender',
    category: 'accessories',
    price: 1499,
    originalPrice: 2299,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Fuchsia Pink', hex: '#E11D48' },
      { name: 'Warm Tangerine', hex: '#F97316' },
      { name: 'Chic Noir', hex: '#0F172A' }
    ],
    stock: 12,
    inStock: true,
    description: 'Sleek, compact, and packed with pop personality. Fits your phone, keys, lipstick, and cardholder with ease. Comes with an optional polished metal chain.',
    details: [
      'Premium smooth vegan leather exterior with magnetic flap closure',
      'Interior zippered pocket and card organizer slot',
      'Reinforced shoulder strap designed to sit snugly under your arm',
      'Dimensions: 24cm W x 14cm H x 6cm D'
    ],
    material: '100% Vegan PU Leather with soft velvet lining',
    careInstructions: 'Wipe clean with a damp cloth.',
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 35,
    createdAt: '2026-03-04T16:00:00Z'
  }
];
