import { Product, Category, Brand } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x400?text=Vot' },
  { id: 'cat-2', name: 'Giay cau long', imageUrl: 'https://placehold.co/400x400?text=Giay' },
  { id: 'cat-3', name: 'Quả cau long', imageUrl: 'https://placehold.co/400x400?text=Cau' },
  { id: 'cat-4', name: 'Phu kien', imageUrl: 'https://placehold.co/400x400?text=Phu-kien' },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'brand-1', name: 'Yonex' },
  { id: 'brand-2', name: 'Victor' },
  { id: 'brand-3', name: 'Lining' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1', name: 'Yonex Astrox 88D Pro', brand: 'Yonex', price: 3500000,
    description: 'Vợt tấn công mạnh mẽ cho nguời chơi trình đô cao.',
    category: 'Vọt cau long', imageUrl: 'https://placehold.co/400x600?text=Yonex+Astrox', stock: 15,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.8,
  },
  {
    id: 'prod-2', name: 'Victor Thruster F Claw', brand: 'Victor', price: 2800000,
    description: 'Su cân bằn hoàn hảo giua tan cong va phong thu.',
    category: 'Vọt cau long', imageUrl: 'https://placehold.co/400x600?text=Victor+Thruster', stock: 8,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.5,
  },
  {
    id: 'prod-3', name: 'Lining Tectonic 7', brand: 'Lining', price: 3200000,
    description: 'Cong nghe dan hôi vay tròi.',
    category: 'Vọt cau long', imageUrl: 'https://placehold.co/400x600?text=Lining+Tectonic', stock: 5,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.7,
  },
  {
    id: 'prod-4', name: 'Victor Auraspeed 90 Pro', brand: 'Victor', price: 2950000,
    description: 'Vọt nhanh chong cho phong cach can bang.',
    category: 'Vọt cau long', imageUrl: 'https://placehold.co/400x600?text=Victor+Auraspeed', stock: 10,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium-Stiff' }, rating: 4.6,
  },
  {
    id: 'prod-5', name: 'Yonex Nanoflare 700', brand: 'Yonex', price: 2650000,
    description: 'Vọt phòng thu nhanh, ph thoi cho nguời moi.',
    category: 'Vọt cau long', imageUrl: 'https://placehold.co/400x600?text=Yonex+Nanoflare', stock: 12,
    attributes: { weight: '4U', balance: 'Head Light', stiffness: 'Medium' }, rating: 4.4,
  },
];