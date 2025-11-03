import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kerry Bros Internal Portal',
  description: 'Internal tools and portal for Kerry Brothers Truck Repair employees',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
