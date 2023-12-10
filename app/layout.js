import './globals.css'

export const metadata = {
  title: 'Cloudflare Assignment',
  description: 'Cloudflare Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
