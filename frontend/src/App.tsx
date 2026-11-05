import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { useCart } from './context/CartContext';
import { Home } from './components/product/Home';
import { Products } from './components/product/Products';
import { Cart } from './components/product/Cart';
import { ProductDetail } from './components/product/ProductDetail';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function AppRoutes() {
  const { cartItems } = useCart();

  return (
    <Layout cartItemCount={cartItems.length}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
