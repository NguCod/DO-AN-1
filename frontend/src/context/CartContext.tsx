import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';
import { addToCart, fetchCart, deleteCartItem } from '../services/api';

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalAmount: number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Price string parser: "6 triệu" -> 6000000, "1,2 tỷ" -> 1200000000, "450000" -> 450000, "900 nghìn–1,5 triệu" -> 1500000
  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const map: Record<string, number> = { 'triệu': 1_000_000, 'tỷ': 1_000_000_000, 'nghìn': 1_000 };
    const matches = [...priceStr.matchAll(/([\d,.]+)\s*([a-zà-ỹ]+)/gi)];
    if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const num = parseFloat(lastMatch[1].replace(',', '.'));
      const unit = lastMatch[2].toLowerCase();
      return num * (map[unit] || 1);
    }
    const nums = priceStr.match(/[\d,.]+/g);
    if (nums && nums.length > 0) {
      return parseFloat(nums[nums.length - 1].replace(',', '.'));
    }
    return 0;
  };

  const loadCart = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const cart = await fetchCart(token);
      const items = (cart.items || []).map((item: any) => ({
        id: item.id,
        productId: String(item.productId),
        quantity: item.quantity,
        product: {
          ...item.product,
          price: parsePrice(item.priceAtTime)
        }
      }));
      setCartItems(items);
    } catch (e) {
      console.error('Failed to load cart', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addToCartFn = async (product: Product) => {
    if (!token) return;
    try {
      await addToCart(token, Number(product.id));
      await loadCart();
    } catch (e) {
      console.error('Add to cart failed', e);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) return;
    const item = cartItems.find(i => i.productId === productId);
    if (!item?.id) return;
    try {
      await deleteCartItem(token, item.id);
      setCartItems(prev => prev.filter(i => i.productId !== productId));
    } catch (e) {
      console.error('Remove from cart failed', e);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!token) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    // Re-fetch since no PATCH endpoint
    await loadCart();
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart: addToCartFn, removeFromCart, updateQuantity, clearCart, totalAmount, loadCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}