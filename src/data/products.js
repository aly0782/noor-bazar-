const products = [
  {
    id: 1,
    name: "Green Jade Tasbi - 99 Beads",
    description: "Beautiful green jade tasbi with silver tassel cap. Perfect for daily prayers and Quran recitation. Handcrafted with devotion by Ismaili artisans using genuine jade stone. Ya Ali Madad blessed.",
    price: 45,
    originalPrice: 75,
    image: "/images/products/green-tasbi.jpg",
    category: "Sacred Collections",
    rating: 4.9,
    reviewCount: 234,
    stock: 18,
    sellerId: 1,
    tags: ["bestseller", "handcrafted"],
    dateAdded: "2024-02-15",
    specifications: {
      beads: "99 beads",
      material: "Green Jade Stone",
      tassel: "Silver Tassel Cap",
      weight: "120 grams",
      origin: "Handcrafted by Ismaili artisans"
    }
  },
  {
    id: 2,
    name: "Blue Aquamarine Tasbi - 33 Beads",
    description: "Stunning blue aquamarine tasbi with 33 beads. Ideal for Subhanallah recitations during prayer. Premium quality stones with a red silk tassel. A traditional design cherished by the Ismaili community.",
    price: 38,
    originalPrice: 65,
    image: "/images/products/blue-tasbi.png",
    category: "Sacred Collections",
    rating: 4.8,
    reviewCount: 189,
    stock: 22,
    sellerId: 2,
    tags: ["bestseller", "traditional"],
    dateAdded: "2024-03-01",
    specifications: {
      beads: "33 beads",
      material: "Aquamarine Stone",
      tassel: "Red Silk Tassel",
      weight: "85 grams",
      origin: "Traditional Ismaili design"
    }
  },
  {
    id: 3,
    name: "White Lace Mijalis Gown - Premium",
    description: "Exquisite white lace Mijalis dress perfect for community gatherings. Handcrafted with delicate embroidery. The breathable fabric and elegant draping make this ideal for Jamatkhana events and special celebrations.",
    price: 185,
    originalPrice: 320,
    image: "/images/products/white-mijalis-dress.jpg",
    category: "Mijalis Fashion",
    rating: 5.0,
    reviewCount: 156,
    stock: 12,
    sellerId: 2,
    tags: ["premium", "handcrafted"],
    dateAdded: "2024-03-10",
    specifications: {
      fabric: "Pure White Lace",
      embroidery: "Hand-embroidered",
      fit: "Elegant Draping",
      weight: "650 grams",
      origin: "Crafted for the Ismaili community"
    }
  },
  {
    id: 4,
    name: "Blue Bandani Lehenga - Gold Embroidered",
    description: "Stunning blue bandani lehenga with intricate gold and silver sequin work. Perfect for Jamatherana celebrations. The traditional pattern and perfect draping make this a showpiece for any Ismaili gathering.",
    price: 245,
    originalPrice: 420,
    image: "/images/products/blue-bandani-lehenga.jpg",
    category: "Mijalis Fashion",
    rating: 4.9,
    reviewCount: 267,
    stock: 8,
    sellerId: 2,
    tags: ["bestseller", "premium"],
    dateAdded: "2024-01-20",
    specifications: {
      fabric: "Blue Silk",
      embroidery: "Gold & Silver Sequins",
      pattern: "Traditional Bandani",
      weight: "900 grams",
      origin: "Handcrafted for Ismaili celebrations"
    }
  },
  {
    id: 5,
    name: "Teal Heritage Dress with Gold Trim",
    description: "Beautiful teal traditional dress with gold trim. Versatile for community gatherings and formal occasions. The traditional neckline and comfortable fit make this a timeless addition to your Mijalis wardrobe.",
    price: 165,
    originalPrice: 280,
    image: "/images/products/teal-heritage-dress.jpg",
    category: "Mijalis Fashion",
    rating: 4.7,
    reviewCount: 198,
    stock: 15,
    sellerId: 2,
    tags: ["elegant", "traditional"],
    dateAdded: "2024-02-28",
    specifications: {
      fabric: "Teal Linen",
      embroidery: "Gold Embroidery",
      neckline: "Traditional Neckline",
      weight: "550 grams",
      origin: "Crafted for the global Ismaili community"
    }
  },
  {
    id: 6,
    name: "Hazrat Imam Portrait Frame - Premium Black",
    description: "Beautifully framed portrait of Hazrat Imam in traditional formal attire. A blessed addition to any home. Premium black frame with protected glass and high-quality print. Ready to hang.",
    price: 89,
    originalPrice: 150,
    image: "/images/products/hazrat-imam-frame.png",
    category: "Religious Art",
    rating: 5.0,
    reviewCount: 412,
    stock: 25,
    sellerId: 1,
    tags: ["bestseller", "blessed"],
    dateAdded: "2024-01-15",
    specifications: {
      frame: "Premium Black Frame",
      glass: "Protected Glass",
      print: "High-Quality Print",
      weight: "2.5 kg",
      origin: "Blessed gift for Ismaili households"
    }
  },
  {
    id: 7,
    name: "Niyaz Rose Water Bottle - Crystal Clear",
    description: "Elegant crystal clear bottle for blessed niyaz water. Features beautiful gold Islamic calligraphy. Ya Ali Madad. Perfect for storing sacred niyaz water with an air-tight seal.",
    price: 52,
    originalPrice: 89,
    image: "/images/products/niyaz-bottle.png",
    category: "Sacred Keepsakes",
    rating: 4.9,
    reviewCount: 298,
    stock: 30,
    sellerId: 1,
    tags: ["blessed", "handcrafted"],
    dateAdded: "2024-03-12",
    specifications: {
      material: "Crystal Glass",
      design: "Gold Islamic Calligraphy",
      seal: "Air-tight Seal",
      weight: "350 grams",
      origin: "Blessed design for the Ismaili community"
    }
  },
  {
    id: 8,
    name: "Blue Bandani Saree - Gold & Silver Sequins",
    description: "Exquisite blue bandani saree with gold and silver sequin embroidery. Perfect for special Ismaili celebrations. The intricate patterns and luxury fabric make this a treasured piece for Chandrat and Jamatherana events.",
    price: 275,
    originalPrice: 480,
    image: "/images/products/blue-bandani-sequins.jpg",
    category: "Mijalis Fashion",
    rating: 4.9,
    reviewCount: 345,
    stock: 6,
    sellerId: 2,
    tags: ["bestseller", "premium"],
    dateAdded: "2024-01-25",
    specifications: {
      fabric: "Blue Silk",
      embroidery: "Gold & Silver Sequins",
      pattern: "Intricate Bandani",
      weight: "850 grams",
      origin: "Handcrafted for Ismaili celebrations"
    }
  }
];

export default products;
