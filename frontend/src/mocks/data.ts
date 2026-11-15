import type { Product, Category, Brand } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/danh_muc/vot-cau-long-yonex.webp' },
  { id: 'cat-3', name: 'Quả cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/danh_muc/qua-cau-long.webp' },
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
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-yonex-astrox-88d-pro-xanh-duong-chinh-hang-1.webp', stock: 15,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.8,
  },
  {
    id: 'prod-2', name: 'Victor Thruster F Claw', brand: 'Victor', price: 2800000,
    description: 'Sự cân bằng hoàn hảo giữa tấn công và phòng thủ.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-victor-thruster-f-claw-do-den-chinh-hang.webp', stock: 8,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.5,
  },
  {
    id: 'prod-3', name: 'Lining Tectonic 7', brand: 'Lining', price: 3200000,
    description: 'Công nghệ đàn hồi vượt trội.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-lining-tectonic-7-xanh-ngoc-chinh-hang-2.webp', stock: 5,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Stiff' }, rating: 4.7,
  },
  {
    id: 'prod-4', name: 'Victor Auraspeed 90 Pro', brand: 'Victor', price: 2950000,
    description: 'Vợt nhanh chóng cho phong cách cân bằng.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-victor-auraspeed-90k-ii-xanh-ngoc-chinh-hang-1.webp', stock: 10,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium-Stiff' }, rating: 4.6,
  },
  {
    id: 'prod-5', name: 'Yonex Nanoflare 700', brand: 'Yonex', price: 2650000,
    description: 'Vợt phòng thủ nhanh, phù hợp cho người mới.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-yonex-nanoflare-700-xanh-navy-chinh-hang-1.webp', stock: 12,
    attributes: { weight: '4U', balance: 'Head Light', stiffness: 'Medium' }, rating: 4.4,
  },
  {
    id: 'prod-6', name: 'Mizuno Fortius 10 Quick', brand: 'Mizuno', price: 2200000,
    description: 'Vợt linh hoạt, tốc độ cao, phù hợp cho lối chơi nhanh.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-mizuno-fortius-10-quick-xanh-duong-chinh-hang-1.webp', stock: 8,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.3,
  },
  {
    id: 'prod-7', name: 'Kawasaki KBD-8000', brand: 'Kawasaki', price: 1800000,
    description: 'Vợt cân bằng, dễ chơi, lý tưởng cho người mới bắt đầu.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-kawasaki-master-m9-xanh-duong-chinh-hang.webp', stock: 20,
    attributes: { weight: '4U', balance: 'Even Balance', stiffness: 'Flexible' }, rating: 4.0,
  },
  {
    id: 'prod-8', name: 'Lining Aeronaut 9000', brand: 'Lining', price: 3800000,
    description: 'Vợt cao cấp, khí động học tốt, cho những pha đập cầu uy lực.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-lining-aeronaut-9000-hong-den-chinh-hang-1.webp', stock: 7,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Extra Stiff' }, rating: 4.9,
  },
  {
    id: 'prod-9', name: 'Victor Brave Sword 12', brand: 'Victor', price: 2700000,
    description: 'Vợt huyền thoại với khung kiếm, tốc độ vung vợt nhanh.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-victor-bravesword-12-trang-den-chinh-hang-1.webp', stock: 10,
    attributes: { weight: '3U', balance: 'Even Balance', stiffness: 'Medium' }, rating: 4.7,
  },
  {
    id: 'prod-10', name: 'Yonex Voltric Z-Force II', brand: 'Yonex', price: 3900000,
    description: 'Vợt tấn công mạnh mẽ nhất của Yonex, đòi hỏi kỹ thuật cao.',
    category: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-yonex-voltric-z-force-ii-xanh-duong-chinh-hang-1.webp', stock: 5,
    attributes: { weight: '3U', balance: 'Head Heavy', stiffness: 'Extra Stiff' }, rating: 4.9,
  },
  {
    id: 'prod-13', name: 'Quả cầu lông Victor Gold Ace', brand: 'Victor', price: 180000,
    description: 'Cầu lông cao cấp, độ bền cao, bay ổn định.',
    category: 'Quả cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/qua-cau-long-victor-gold-ace-chinh-hang.webp', stock: 50,
    attributes: { type: 'Lông vũ', speed: '77' }, rating: 4.5,
  },
];