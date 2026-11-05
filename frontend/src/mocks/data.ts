import type { Product, Category, Brand } from '../types';

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
    id: 'prod-1', name: 'Yonex Astrox 88D Pro', brand: 'Yonex', price: 3500000,
    description: 'Vợt tấn công mạnh mẽ cho người chơi trình độ cao.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Yonex+Astrox', stock: 15,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.8,
  },
  {
    id: 'prod-2', name: 'Victor Thruster F Claw', brand: 'Victor', price: 2800000,
    description: 'Sự cân bằng hoàn hảo giữa tấn công và phòng thủ.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Victor+Thruster', stock: 8,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.5,
  },
  {
    id: 'prod-3', name: 'Lining Tectonic 7', brand: 'Lining', price: 3200000,
    description: 'Công nghệ đàn hồi vượt trội.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Lining+Tectonic', stock: 5,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.7,
  },
  {
    id: 'prod-4', name: 'Victor Auraspeed 90 Pro', brand: 'Victor', price: 2950000,
    description: 'Vợt nhanh chóng cho phong cách cân bằng.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Victor+Auraspeed', stock: 10,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium-Stiff' }, rating: 4.6,
  },
  {
    id: 'prod-5', name: 'Yonex Nanoflare 700', brand: 'Yonex', price: 2650000,
    description: 'Vợt phòng thủ nhanh, phù hợp cho người mới.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Yonex+Nanoflare', stock: 12,
    attributes: { weight: '4U', balance: 'Head Light', stiffness: 'Medium' }, rating: 4.4,
  },
  {
    id: 'prod-6', name: 'Mizuno Fortius 10 Quick', brand: 'Mizuno', price: 2200000,
    description: 'Vợt linh hoạt, tốc độ cao, phù hợp cho lối chơi nhanh.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Mizuno+Fortius', stock: 8,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.3,
  },
  {
    id: 'prod-7', name: 'Kawasaki KBD-8000', brand: 'Kawasaki', price: 1800000,
    description: 'Vợt cân bằng, dễ chơi, lý tưởng cho người mới bắt đầu.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Kawasaki+KBD', stock: 20,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Flexible' }, rating: 4.0,
  },
  {
    id: 'prod-8', name: 'Lining Aeronaut 9000', brand: 'Lining', price: 3800000,
    description: 'Vợt cao cấp, khí động học tốt, cho những pha đập cầu uy lực.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Lining+Aeronaut', stock: 7,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Extra Stiff' }, rating: 4.9,
  },
  {
    id: 'prod-9', name: 'Victor Brave Sword 12', brand: 'Victor', price: 2700000,
    description: 'Vợt huyền thoại với khung kiếm, tốc độ vung vợt nhanh.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Victor+Brave+Sword', stock: 10,
    attributes: { weight: '3U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.7,
  },
  {
    id: 'prod-10', name: 'Yonex Voltric Z-Force II', brand: 'Yonex', price: 3900000,
    description: 'Vợt tấn công mạnh mẽ nhất của Yonex, đòi hỏi kỹ thuật cao.',
    category: 'Vợt cầu lông', imageUrl: 'https://placehold.co/400x600?text=Yonex+Voltric', stock: 5,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Extra Stiff' }, rating: 4.9,
  },
  {
    id: 'prod-11', name: 'Giày cầu lông Yonex Power Cushion 65Z3', brand: 'Yonex', price: 2100000,
    description: 'Giày cao cấp, êm ái và ổn định, hỗ trợ tối đa di chuyển.',
    category: 'Giày cầu lông', imageUrl: 'https://placehold.co/400x600?text=Yonex+Shoes', stock: 10,
    attributes: { size: '40', color: 'Trắng/Đỏ' }, rating: 4.8,
  },
  {
    id: 'prod-12', name: 'Giày cầu lông Victor A970 Ace', brand: 'Victor', price: 1950000,
    description: 'Giày nhẹ, ôm chân, tăng cường độ bám sân.',
    category: 'Giày cầu lông', imageUrl: 'https://placehold.co/400x600?text=Victor+Shoes', stock: 12,
    attributes: { size: '41', color: 'Xanh Navy' }, rating: 4.7,
  },
  {
    id: 'prod-13', name: 'Quả cầu lông Victor Gold Ace', brand: 'Victor', price: 180000,
    description: 'Cầu lông cao cấp, độ bền cao, bay ổn định.',
    category: 'Quả cầu lông', imageUrl: 'https://placehold.co/400x600?text=Victor+Shuttlecock', stock: 50,
    attributes: { type: 'Lông vũ', speed: '77' }, rating: 4.5,
  },
  {
    id: 'prod-14', name: 'Túi đựng vợt Yonex BA92026', brand: 'Yonex', price: 850000,
    description: 'Túi đựng vợt 6 ngăn, tiện lợi, bảo vệ vợt tốt.',
    category: 'Phụ kiện', imageUrl: 'https://placehold.co/400x600?text=Yonex+Bag', stock: 15,
    attributes: { capacity: '6 vợt', color: 'Đen/Vàng' }, rating: 4.6,
  },
  {
    id: 'prod-15', name: 'Quần áo cầu lông Lining AATP029', brand: 'Lining', price: 450000,
    description: 'Áo thun thể thao thoáng khí, thoải mái khi vận động.',
    category: 'Phụ kiện', imageUrl: 'https://placehold.co/400x600?text=Lining+Apparel', stock: 30,
    attributes: { size: 'L', color: 'Trắng' }, rating: 4.4,
  },
];