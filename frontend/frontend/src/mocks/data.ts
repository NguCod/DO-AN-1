import { Product, Category, Brand } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x400?text=Vot' },
  { id: 'cat-2', name: 'Giày cầu lông', imageUrl: 'https://placehold.co/400x400?text=Giay' },
  { id: 'cat-3', name: 'Quả cầu lông', imageUrl: 'https://placehold.co/400x400?text=Cau' },
  { id: 'cat-4', name: 'Phụ kiện', imageUrl: 'https://placehold.co/400x400?text=Phu-kien' },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'brand-1', name: 'Yonex' },
  { id: 'brand-2', name: 'Victor' },
  { id: 'brand-3', name: 'Lining' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Yonex Astrox 88D Pro',
    brand: 'Yonex',
    price: 3500000,
    description: 'Vợt tấn công mạnh mẽ cho người chơi trình độ cao.',
    category: 'Vợt cầu lông',
    imageUrl: 'https://placehold.co/400x600?text=Yonex+Astrox',
    stock: 15,
    attributes: {
      weight: '3U',
      balance: 'Head Heavy',
      stiffness: 'Stiff',
    },
    rating: 4.8,
  },
  {
    id: 'prod-2',
    name: 'Victor Thruster F Claw',
    brand: 'Victor',
    price: 2800000,
    description: 'Sự cân bằng hoàn hảo giữa tấn công và phòng thủ.',
    category: 'Vợt cầu lông',
    imageUrl: 'https://placehold.co/400x600?text=Victor+Thruster',
    stock: 8,
    attributes: {
      weight: '4U',
      balance: 'Even Balance',
      stiffness: 'Medium',
    },
    rating: 4.5,
  },
  {
    id: 'prod-3',
    name: 'Lining Tectonic 7',
    brand: 'Lining',
    price: 3200000,
    description: 'Công nghệ đàn hồi vượt trội.',
    category: 'Vợt cầu lông',
    imageUrl: 'https://placehold.co/400x600?text=Lining+Tectonic',
    stock: 5,
    attributes: {
      weight: '3U',
      balance: 'Head Heavy',
      stiffness: 'Stiff',
    },
    rating: 4.7,
  },
];
