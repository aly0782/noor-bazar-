const products = [
  {
    id: 1,
    name: "Hazrat Imam Golden Frame - Large",
    description: "Exquisite hand-crafted golden frame featuring the sacred Hazrat Imam mosque. Made with premium quality materials and finished with genuine gold leaf accents. Perfect for home decoration or as a meaningful gift. This stunning piece captures the architectural beauty of the mosque in intricate detail.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=600&fit=crop",
    category: "Religious Art",
    rating: 4.9,
    reviewCount: 412,
    stock: 15,
    sellerId: 1,
    tags: ["bestseller", "handcrafted"],
    dateAdded: "2024-01-15",
    specifications: {
      size: "24 x 36 inches",
      material: "Wood with Gold Leaf",
      weight: "3.5 kg",
      origin: "Handcrafted in Uzbekistan"
    }
  },
  {
    id: 2,
    name: "Hazrat Imam Silver Calligraphy Frame",
    description: "Beautiful silver-finished frame with Arabic calligraphy surrounding the Hazrat Imam mosque illustration. The intricate calligraphy is hand-painted by master artisans. A perfect blend of spiritual significance and artistic excellence.",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&h=600&fit=crop",
    category: "Religious Art",
    rating: 4.8,
    reviewCount: 287,
    stock: 22,
    sellerId: 1,
    tags: ["calligraphy", "handcrafted"],
    dateAdded: "2024-02-10",
    specifications: {
      size: "18 x 24 inches",
      material: "Wood with Silver Finish",
      weight: "2.8 kg",
      origin: "Handcrafted in Uzbekistan"
    }
  },
  {
    id: 3,
    name: "Hazrat Imam Miniature Desktop Frame",
    description: "Compact and elegant desktop frame showcasing the Hazrat Imam mosque. Perfect for office desks or small spaces. Comes with a built-in easel stand for easy display. Made with attention to every architectural detail.",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1590076215667-875c2d3faf29?w=600&h=600&fit=crop",
    category: "Religious Art",
    rating: 4.9,
    reviewCount: 356,
    stock: 40,
    sellerId: 1,
    tags: ["compact", "gift"],
    dateAdded: "2024-03-05",
    specifications: {
      size: "8 x 10 inches",
      material: "Ceramic with Gold Trim",
      weight: "0.8 kg",
      origin: "Handcrafted in Uzbekistan"
    }
  },
  {
    id: 4,
    name: "Pure White Banarasi Silk Saree",
    description: "Luxurious pure white Banarasi silk saree with intricate silver zari work. Handwoven by master weavers using traditional techniques passed down through generations. The delicate motifs and butis create an ethereal look perfect for special occasions.",
    price: 299.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop",
    category: "Fashion",
    rating: 5.0,
    reviewCount: 523,
    stock: 8,
    sellerId: 2,
    tags: ["premium", "handwoven", "bestseller"],
    dateAdded: "2024-01-20",
    specifications: {
      fabric: "Pure Banarasi Silk",
      length: "6.3 meters with blouse piece",
      weight: "850 grams",
      origin: "Handwoven in Varanasi, India"
    }
  },
  {
    id: 5,
    name: "Elegant White Chiffon Saree",
    description: "Graceful white chiffon saree with delicate pearl embroidery along the border. Lightweight and flowing, this saree drapes beautifully and is perfect for both formal events and casual elegance. Includes matching blouse piece.",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=600&fit=crop",
    category: "Fashion",
    rating: 4.8,
    reviewCount: 198,
    stock: 18,
    sellerId: 2,
    tags: ["lightweight", "elegant"],
    dateAdded: "2024-02-28",
    specifications: {
      fabric: "Premium Chiffon",
      length: "5.5 meters with blouse piece",
      weight: "450 grams",
      origin: "Crafted in Surat, India"
    }
  },
  {
    id: 6,
    name: "White Cotton Handloom Saree",
    description: "Traditional white cotton handloom saree with gold temple border. Made from premium organic cotton, this saree is breathable and comfortable for everyday wear. The classic temple border adds a touch of tradition to this timeless piece.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
    category: "Fashion",
    rating: 4.9,
    reviewCount: 445,
    stock: 30,
    sellerId: 2,
    tags: ["organic", "everyday", "bestseller"],
    dateAdded: "2024-03-15",
    specifications: {
      fabric: "Organic Cotton",
      length: "5.5 meters with blouse piece",
      weight: "350 grams",
      origin: "Handwoven in Chennai, India"
    }
  }
];

export default products;
