'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, LEVELS } from '@/lib/data'
import Nav from '@/components/Nav'

export default function Questions() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [level, setLevel] = useState('national')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [answered, setAnswered] = useState<string[]>([])

  useEffect(() => {
    const p = localStorage.getItem('voxol_profile')
    if (!p) { router.replace('/onboarding'); return }
    setProfile(JSON.parse(p))
    const ans = JSON.parse(localStorage.getItem('voxol_answered') || '[]')
    setAnswered(ans)
  }, [router])

  const filtered = QUESTIONS.filter(q => {
    if (q.level !== level) return false
    if (selectedTheme && q.theme !== selectedTheme) return false
    return true
  })

  const themes = Array.from(new Set(QUESTIONS.filter(q => q.level === level).map(q => q.theme)))

  if (!profile) return null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav profile={profile} current="questions" />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 8 }}>
            Pour vous
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
            Vos <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>questions</em> du moment
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>
            Sélectionnées selon votre profil · {profile.age_range} · {profile.city}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {LEVELS.map(l => (
            <button
              key={l.key}
              onClick={() => { setLevel(l.key); setSelectedTheme(null) }}
              style={{
                padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                border: level === l.key ? '1.5px solid var(--coral)' : '1.5px solid var(--border)',
                background: level === l.key ? 'var(--coral)' : 'var(--white)',
                color: level === l.key ? 'white' : 'var(--muted)',
                cursor: 'pointer', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          <button onClick={() => setSelectedTheme(null)} style={themeBtn(!selectedTheme)}>Tous</button>
          {themes.map(t => (
            <button key={t} onClick={() => setSelectedTheme(t)} style={themeBtn(selectedTheme === t)}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)', fontSize: 14 }}>
              Pas de questions pour ce niveau et thème pour l'instant.
            </div>
          )}
          {filtered.map(q => {
            const isAnswered = answered.includes(q.id)
            return (
              <div
                key={q.id}
                onClick={() => !isAnswered && router.push(`/questions/${q.id}`)}
                style={{
                  background: isAnswered ? 'var(--paper)' : 'var(--white)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 20,
                  padding: '22px 24px',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all .2s',
                  position: 'relative',
                  opacity: isAnswered ? .7 : 1,
                }}
                onMouseEnter={e => { if (!isAnswered) (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: 100,
                    background: 'var(--coral-lt)', color: 'var(--coral)',
                  }}>{q.theme}</span>
                  {isAnswered && (
                    <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓ Répondu</span>
                  )}
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 14 }}>
                  {q.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {q.response_count.toLocaleString('fr-FR')} contributions
                  </span>
                  {!isAnswered && (
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: 'var(--coral)',
                      padding: '6px 16px', border: '1.5px solid var(--coral)',
                      borderRadius: 100,
                    }}>
                      Répondre →
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function themeBtn(active: boolean): React.CSSProperties {
  return {
    padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
    border: active ? '1.5px solid var(--ink)' : '1px solid var(--border)',
    background: active ? 'var(--ink)' : 'var(--paper)',
    color: active ? 'white' : 'var(--muted)',
    cursor: 'pointer', transition: 'all .15s',
    fontFamily: 'DM Sans, sans-serif',
  }
}
