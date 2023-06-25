import { StoreProvider } from '@/redux/StoreProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Билетопоиск',
  description: 'Покупай билеты у нас',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
        <Footer />
        <div id="portal"></div>
      </body>
    </html>
  )
}
