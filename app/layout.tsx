import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/supabaseProvider'
import UserProvider from '@/hooks/userProvider'
import ModelProvider from '@/providers/modelProvider'
import ToasterProvider from '@/providers/tosterProvider'
import getSongByUserId from '@/actions/getSongByUserId'
import Player from '@/components/player'


const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Lestening Music!',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSong = await getSongByUserId()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider >
          <UserProvider>
            <ModelProvider />
            <Sidebar songs={userSong}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
