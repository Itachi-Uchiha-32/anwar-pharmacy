import "./globals.css";
import FloatingCart from "../components/FloatingCart";
import WhatsApp from "../components/WhatsApp";
import { CartProvider } from "../context/CartContext"; 
import CartDrawer from "../components/CartDrawer";


export const metadata = {
  title: "Anwar Pharmacy | Quality Healthcare Products",
  description: "Shop for medicine, healthcare equipment, and wellness products online.",
  openGraph: {
    title: "Anwar Pharmacy",
    description: "Quality healthcare delivered to your door.",
    type: "website",
  },
};

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