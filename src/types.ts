export type Subdomain = 'main' | 'halloween';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  installments: {
    quantity: number;
    amount: number;
    interestFree: boolean;
  };
  image: string;
  category: string;
  subdomain: 'all' | 'main' | 'halloween';
  rating: number;
  reviewsCount: number;
  isFullShipping: boolean;
  isFreeShipping: boolean;
  condition: 'Nuevo' | 'Reacondicionado';
  stock: number;
  soldCount: number;
  seller: {
    name: string;
    level: 'Everywhere Líder Platinum' | 'Everywhere Líder Gold' | 'Tienda Oficial';
    rating: number;
    salesCount: number;
  };
  description: string;
  features: string[];
  tags: string[];
  isHalloweenSpecial?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  onlyFreeShipping: boolean;
  onlyFullShipping: boolean;
  onlyHalloween: boolean;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'discount_desc' | 'rating_desc';
  condition?: 'all' | 'Nuevo' | 'Reacondicionado';
}

export interface OrderConfirmation {
  orderId: string;
  trackingNumber: string;
  customerName: string;
  email: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
  estimatedDelivery: string;
  paymentMethod: string;
}
