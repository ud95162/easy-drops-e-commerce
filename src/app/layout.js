import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider } from "../i18n/LanguageProvider";
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
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
