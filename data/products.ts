
export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  description: string;
  stock: number;
};

export function getUniqueCategories(): string[] {
  return [...new Set(products.map((product) => product.category))];
}
    
export const products: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    category: "Clothing",
    brand: "Nike",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    description:
      "Lightweight running shoes designed for everyday comfort, training, and outdoor activities.",
    stock: 25,
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 199,
    category: "Electronics",
    brand: "Sony",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    description:
      "Enjoy immersive audio, comfortable ear cushions, and wireless listening for everyday use.",
    stock: 18,
  },
  {
    id: "3",
    title: "Backpack",
    price: 129,
    category: "Home",
    brand: "American Tourister",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    description:
      "A versatile everyday backpack with generous storage for your essentials and accessories.",
    stock: 30,
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    category: "Electronics",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    description:
      "A stylish everyday watch design for tracking your schedule, activities, and personal style.",
    stock: 12,
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    category: "Clothing",
    brand: "Ray-Ban",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    rating: 4.2,
    description:
      "Classic sunglasses with a versatile design that complements casual and formal outfits.",
    stock: 20,
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    category: "Electronics",
    brand: "Canon",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    description:
      "Capture memorable moments with a versatile camera suited to photography enthusiasts.",
    stock: 8,
  },
  {
    id: "7",
    title: "Cotton T-Shirt",
    price: 29,
    category: "Clothing",
    brand: "Adidas",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    rating: 4.1,
    description:
      "A comfortable cotton T-shirt with a simple design for everyday wear.",
    stock: 40,
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    category: "Electronics",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    description:
      "A modern smartphone for communication, entertainment, photography, and everyday productivity.",
    stock: 10,
  },
  {
    id: "9",
    title: "Wireless Earbuds",
    price: 89,
    category: "Electronics",
    brand: "Sony",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    description:
      "Compact wireless earbuds designed for music, calls, and listening on the go.",
    stock: 22,
  },
  {
    id: "10",
    title: "Leather Wallet",
    price: 49,
    category: "Clothing",
    brand: "Urban Style",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    rating: 4.0,
    description:
      "A compact everyday wallet designed to keep cards and cash neatly organized.",
    stock: 35,
  },
  {
    id: "11",
    title: "Desk Lamp",
    price: 59,
    category: "Home",
    brand: "Philips",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    description:
      "A minimalist desk lamp for illuminating your workspace, study area, or bedside table.",
    stock: 16,
  },
  {
    id: "12",
    title: "Travel Bottle",
    price: 25,
    category: "Home",
    brand: "Hydro",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    rating: 4.2,
    description:
      "A reusable bottle for keeping water handy during work, travel, and outdoor activities.",
    stock: 50,
  },
];
