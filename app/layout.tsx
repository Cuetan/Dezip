import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voxol — Au-delà des chiffres',
  description: 'La parole citoyenne structurée, anonyme et exploitable.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
