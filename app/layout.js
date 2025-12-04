import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
  variable: '--font-lato',
  display: 'swap',
});

export const metadata = {
  title: 'Elite Polish | Premium Home & Exterior Care',
  description: 'Experience hotel-level cleanliness. Top-rated interior and exterior cleaning services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-[#faf9f6] text-slate-800">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}