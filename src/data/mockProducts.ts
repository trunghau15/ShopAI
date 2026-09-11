// src/data/mockProducts.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

export const MOCK_PRODUCTS: Product[] = [
  // === ĐIỆN THOẠI ===
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 24990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 21990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80",
  },
  {
    id: "3",
    name: "Google Pixel 9 Pro",
    price: 19990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80",
  },
  {
    id: "4",
    name: "Xiaomi 14 Ultra",
    price: 18990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  },
  {
    id: "5",
    name: "OnePlus 12",
    price: 15990000,
    category: "Điện thoại",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
  },

  // === LAPTOP / MÁY TÍNH ===
  {
    id: "6",
    name: "MacBook Air M3",
    price: 24990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
  },
  {
    id: "7",
    name: "MacBook Pro M4",
    price: 44990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
  },
  {
    id: "8",
    name: "Dell XPS 15",
    price: 38990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80",
  },
  {
    id: "9",
    name: "ASUS ROG Zephyrus G16",
    price: 42990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
  },
  {
    id: "10",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 32990000,
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  },

  // === TAI NGHE ===
  {
    id: "11",
    name: "Apple AirPods Pro 2",
    price: 5990000,
    category: "Tai nghe",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80",
  },
  {
    id: "12",
    name: "Sony WH-1000XM5",
    price: 8490000,
    category: "Tai nghe",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: "13",
    name: "Bose QuietComfort 45",
    price: 7990000,
    category: "Tai nghe",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80",
  },
  {
    id: "14",
    name: "Samsung Galaxy Buds3 Pro",
    price: 4990000,
    category: "Tai nghe",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
  },

  // === ĐỒNG HỒ THÔNG MINH ===
  {
    id: "15",
    name: "Apple Watch Series 10",
    price: 11990000,
    category: "Đồng hồ",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&q=80",
  },
  {
    id: "16",
    name: "Samsung Galaxy Watch 7",
    price: 8490000,
    category: "Đồng hồ",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: "17",
    name: "Garmin Fenix 8",
    price: 18990000,
    category: "Đồng hồ",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
  },

  // === GIÀY DÉP ===
  {
    id: "18",
    name: "Nike Air Force 1 '07",
    price: 2929000,
    category: "Giày dép",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
  {
    id: "19",
    name: "Adidas Stan Smith",
    price: 2400000,
    category: "Giày dép",
    image: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?w=500&q=80",
  },
  {
    id: "20",
    name: "New Balance 574",
    price: 2800000,
    category: "Giày dép",
    image: "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=500&q=80",
  },
  {
    id: "21",
    name: "Nike Air Jordan 1",
    price: 4500000,
    category: "Giày dép",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
  },

  // === PHỤ KIỆN / THIẾT BỊ LƯU TRỮ ===
  {
    id: "22",
    name: "Samsung T7 Portable SSD 1TB",
    price: 2490000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1531492736222-2e9112a4e216?w=500&q=80",
  },
  {
    id: "23",
    name: "Logitech MX Master 3S",
    price: 2990000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
  },
  {
    id: "24",
    name: "Keychron K2 Mechanical Keyboard",
    price: 2190000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
  },
  {
    id: "25",
    name: "Anker 100W GaN Charger",
    price: 890000,
    category: "Phụ kiện",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
  },

  // === GAMING ===
  {
    id: "26",
    name: "DualSense Wireless Controller",
    price: 1890000,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80",
  },
  {
    id: "27",
    name: "Xbox Series X",
    price: 13990000,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&q=80",
  },
  {
    id: "28",
    name: "Nintendo Switch OLED",
    price: 8490000,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80",
  },

  // === MÀN HÌNH ===
  {
    id: "29",
    name: "LG UltraWide 34\" 4K",
    price: 14990000,
    category: "Màn hình",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
  },
  {
    id: "30",
    name: "Samsung Odyssey G9 Neo",
    price: 28990000,
    category: "Màn hình",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&q=80",
  },
];