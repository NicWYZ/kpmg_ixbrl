import './globals.css'

export const metadata = {
  title: 'KTAG',
  description: 'Create iXBRL tags for your financial statements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}