'use client'
import { useRouter } from 'next/navigation'

type Props = {
  profile: any
  current: 'questions' | 'dashboard'
}

export default function Nav({ profile, current }: Props) {
  const router = useRouter()

  function resetProfile() {
    if (confirm('Réinitialiser votre profil et réponses ?')) {
      localStorage.clear()
      router.push('/onboarding')
    }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      background: 'rgba(253,249,243,.95)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(16px,4vw,36px)',
    }}>
      {/* Logo */}
      <div
        onClick={() => router.push('/questions')}
        style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--ink)', cursor: 'pointer' }}
      >
        Vox<em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>ol</em>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <NavBtn active={current === 'questions'} onClick={() => router.push('/questions')}>
          Questions
        </NavBtn>
        <NavBtn active={current === 'dashboard'} onClick={() => router.push('/dashboard')}>
          Analyse
        </NavBtn>
      </div>

      {/* Profile pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--paper)', border: '1px solid var(--border)',
          borderRadius: 100, padding: '5px 14px',
        }}>
          <span>📍 {profile?.city}</span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span>{profile?.age_range}</span>
        </div>
        <button
          onClick={resetProfile}
          title="Réinitialiser"
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--paper)', border: '1px solid var(--border)',
            cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >⚙</button>
      </div>
    </nav>
  )
}

function NavBtn({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
        border: 'none',
        background: active ? 'var(--ink)' : 'transparent',
        color: active ? 'white' : 'var(--muted)',
        cursor: 'pointer', transition: 'all .15s',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {children}
    </button>
  )
}
