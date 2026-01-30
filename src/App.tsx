import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;