import { StoreProvider } from '@/redux/StoreProvider'
import './globals.css'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { roboto } from '../../public/fonts'

// const roboto = Roboto({
//   variable
// });

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
      <body className={roboto.className}>
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
