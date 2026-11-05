import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import { Home } from './components/product/Home';
import { Products } from './components/product/Products';
import { Cart } from './components/product/Cart';
import { Product } from './types';

function AppRoutes() {
  const { addToCart, cartItems } = useCart();

  return (
    <Layout cartItemCount={cartItems.length}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;