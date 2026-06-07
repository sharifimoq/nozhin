import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'نوژین — روتین شخصی‌سازی‌شده',
  description: 'روتین مکمل و مراقبت پوستی با هوش مصنوعی',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}