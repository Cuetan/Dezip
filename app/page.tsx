'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const profile = localStorage.getItem('voxol_profile')
    if (profile) {
      router.replace('/questions')
    } else {
      router.replace('/onboarding')
    }
  }, [router])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--navy)' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: 'white' }}>
        Vox<em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>ol</em>
      </div>
    </div>
  )
}
