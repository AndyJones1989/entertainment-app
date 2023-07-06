import  './global.css'
import { Inter } from 'next/font/google'
import { AuthProvider, AuthContext } from './context/auth-provider'
import { IsClientCtxProvider } from './context/is-client-ctx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AmuseBox',
  description: 'For when you need something to do with your little angels!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
      <IsClientCtxProvider>
      <body >{children}</body>
      </IsClientCtxProvider>
      </AuthProvider>
    </html>
  )
}
