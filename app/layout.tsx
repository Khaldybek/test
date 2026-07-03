import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Manrope } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-lora',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Той жайлы шақыру — Айдар & Аружан',
  description:
    'Приглашение на свадебные торжества: Бет ашар и Той банкет. Ждём вас!',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5efe2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk" className={`bg-background ${lora.variable} ${manrope.variable}`}>
      <body className="antialiased font-sans">
        <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
