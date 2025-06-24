import { Mona_Sans } from 'next/font/google';
import './globals.css';

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Input Autocomplete',
  description: 'Smart tag input with dynamic search',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
      </body>
    </html>
  );
}
