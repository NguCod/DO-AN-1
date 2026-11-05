import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import { Home } from './components/product/Home';
import { Products } from './components/product/Products';
import { Cart } from './components/product/Cart';

// Placeholder components for routing
const Home = () => (
  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
    <h1>Chào mừng đến với BadmintonAI Shop</h1>
    <p>Trải nghiệm mua sắm dụng cụ cầu lông cùng trợ lý AI chuyên nghiệp.</p>
  </div>
);

const Products = () => (
  <div style={{ padding: '1rem 0' }}>
    <h1>Danh mục sản phẩm</h1>
    <p>Danh sách sản phẩm đang được xây dựng...</p>
  </div>
);

const Cart = () => (
  <div style={{ padding: '1rem 0' }}>
    <h1>Giỏ hàng của bạn</h1>
    <p>Giỏ hàng hiện đang trống.</p>
  </div>
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;