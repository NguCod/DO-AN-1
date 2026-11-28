import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import { Home } from './components/product/Home';
import { Products } from './components/product/Products';
import { CartView } from './components/product/CartView';
import { ProductDetail } from './components/product/ProductDetail';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Checkout } from './components/product/Checkout';
import { OrderHistory } from './components/product/OrderHistory';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProductList } from './components/admin/AdminProductList';
import { AdminBrandList } from './components/admin/AdminBrandList';
import { AdminUsers } from './components/admin/AdminUsers';
import { useEffect } from 'react';

function PublicRoutes() {
  const { user } = useUser();
  return (
    <Layout cartItemCount={0} user={user}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vot" element={<Products />} />
          <Route path="/qua" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}

export default function App() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        window.location.href = '/admin/login';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <UserProvider>
      <AdminProvider>
        <Router>
          <CartProvider>
            <Routes>
              <Route path="/*" element={<PublicRoutes />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <AdminLayout>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProductList />} />
                    <Route path="brands" element={<AdminBrandList />} />
                    <Route path="users" element={<AdminUsers />} />
                  </Routes>
                </AdminLayout>
              } />
            </Routes>
          </CartProvider>
        </Router>
      </AdminProvider>
    </UserProvider>
  );
}
