import './globals.css';
import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NavigationWrapper } from '@/components/navigation-wrapper';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SoberSide | Your Recovery Assistant',
  description: 'A supportive companion for your recovery journey',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${quicksand.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen relative">
            <div className="breathing-background" />
            <NavigationWrapper>{children}</NavigationWrapper>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}