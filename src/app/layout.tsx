import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: {
    default: 'نوژین — روتین شخصی‌سازی‌شده با هوش مصنوعی',
    template: '%s | نوژین',
  },
  description: 'با ۵ سوال ساده، روتین کاملاً اختصاصی برای پوست و سلامتت دریافت کن. مکمل و محصولات پوستی با روتین AI شخصی‌سازی‌شده.',
  keywords: ['روتین پوستی', 'مکمل', 'مراقبت پوست', 'روتین ورزشی', 'هوش مصنوعی', 'نوژین', 'ویتامین', 'سرم پوست'],
  authors: [{ name: 'نوژین' }],
  creator: 'نوژین',
  metadataBase: new URL('https://nozhin.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://nozhin.vercel.app',
    siteName: 'نوژین',
    title: 'نوژین — روتین شخصی‌سازی‌شده با هوش مصنوعی',
    description: 'با ۵ سوال ساده، روتین کاملاً اختصاصی برای پوست و سلامتت دریافت کن.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نوژین — روتین شخصی‌سازی‌شده',
    description: 'روتین پوستی و مکمل با هوش مصنوعی',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body><Providers>{children}</Providers></body>
    </html>
  )
}