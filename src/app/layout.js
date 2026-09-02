import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../i18n/LanguageProvider";
import { CartProvider } from "../store/CartProvider";
import { AuthProvider } from "../store/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "EasyDrops | Fresh Groceries Delivered",
  description: "Shop for the freshest groceries, daily essentials, and discounted items at EasyDrops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
