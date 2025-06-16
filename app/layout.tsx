import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trainer Platform - Eğitmen Öğrenci Yönetim Sistemi',
  description: 'Eğitmenlerin öğrencilerini kontrol edebildiği modern platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
} 