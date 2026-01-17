import "./globals.css";
import FloatingCart from "../../components/FloatingCart";
import WhatsApp from "../../components/WhatsApp";
 
import { CartProvider } from "../../context/CartContext"; 
import CartDrawer from "../../components/CartDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingCart />
          <WhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}