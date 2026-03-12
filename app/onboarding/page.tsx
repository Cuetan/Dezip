'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AGE_RANGES, PROFESSIONS, INTERESTS } from '@/lib/data'

type Step = 'age' | 'profession' | 'city' | 'interests' | 'done'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('age')
  const [profile, setProfile] = useState({
    age_range: '',
    profession: '',
    city: '',
    interests: [] as string[],
  })

  const progress = { age: 25, profession: 50, city: 75, interests: 90, done: 100 }[step]

  function selectAge(age: string) {
    setProfile(p => ({ ...p, age_range: age }))
    setStep('profession')
  }

  function selectProfession(prof: string) {
    setProfile(p => ({ ...p, profession: prof }))
    setStep('city')
  }

  function submitCity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setProfile(p => ({ ...p, city: fd.get('city') as string }))
    setStep('interests')
  }

  function toggleInterest(interest: string) {
    setProfile(p => ({
      ...p,
      interests: p.interests.includes(interest)
        ? p.interests.filter(i => i !== interest)
        : [...p.interests, interest]
    }))
  }

  function finish() {
    const id = 'user_' + Math.random().toString(36).slice(2, 10)
    localStorage.setItem('voxol_profile', JSON.stringify({ ...profile, id }))
    router.push('/questions')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: 'white' }}>
          Vox<em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>ol</em>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 6 }}>
          La parole citoyenne
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: 'var(--cream)',
        borderRadius: 24,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 32px 80px rgba(0,0,0,.4)'
      }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: 32, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--coral)', borderRadius: 2, transition: 'width .4s ease' }} />
        </div>

        {step === 'age' && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Bienvenue. <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>Quel est votre âge ?</em>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
              Pour contextualiser votre parole, anonymement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {AGE_RANGES.map(age => (
                <button key={age} onClick={() => selectAge(age)} style={optionBtn(profile.age_range === age)}>
                  {age}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'profession' && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Quelle est votre <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>situation professionnelle ?</em>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Utilisé pour croiser les opinions par catégorie socio-pro.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {PROFESSIONS.map(prof => (
                <button key={prof} onClick={() => selectProfession(prof)} style={optionBtn(profile.profession === prof)}>
                  {prof}
                </button>
              ))}
            </div>
            <BackBtn onClick={() => setStep('age')} />
          </>
        )}

        {step === 'city' && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Vous êtes <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>où ?</em>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Ville ou commune — pour les questions locales et régionales.</p>
            <form onSubmit={submitCity}>
              <input
                name="city"
                defaultValue={profile.city}
                placeholder="Ex : Lyon, Bordeaux, Rennes..."
                required
                style={{
                  width: '100%', padding: '14px 18px',
                  border: '1.5px solid var(--border)', borderRadius: 12,
                  fontSize: 15, fontFamily: 'DM Sans, sans-serif',
                  background: 'var(--white)', color: 'var(--ink)',
                  outline: 'none', marginBottom: 16,
                }}
              />
              <button type="submit" style={primaryBtn}>Continuer →</button>
            </form>
            <BackBtn onClick={() => setStep('profession')} />
          </>
        )}

        {step === 'interests' && (
          <>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Quels sujets vous <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>préoccupent ?</em>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Choisissez 1 à 5 thèmes. Vos questions seront prioritisées en conséquence.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {INTERESTS.map(interest => {
                const selected = profile.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                      border: selected ? '1.5px solid var(--coral)' : '1.5px solid var(--border)',
                      background: selected ? 'var(--coral)' : 'var(--white)',
                      color: selected ? 'white' : 'var(--ink2)',
                      cursor: 'pointer', transition: 'all .18s',
                    }}
                  >
                    {interest}
                  </button>
                )
              })}
            </div>
            <button
              onClick={finish}
              disabled={profile.interests.length === 0}
              style={{ ...primaryBtn, opacity: profile.interests.length === 0 ? .5 : 1 }}
            >
              Voir mes questions →
            </button>
            <BackBtn onClick={() => setStep('city')} />
          </>
        )}
      </div>

      {/* Privacy note */}
      <p style={{ marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,.3)', textAlign: 'center', maxWidth: 380 }}>
        🔒 Vos données sont anonymisées. Aucune information personnelle identifiable n'est stockée.
      </p>
    </div>
  )
}

function optionBtn(selected: boolean): React.CSSProperties {
  return {
    padding: '13px 18px', borderRadius: 12, fontSize: 14, fontWeight: 600,
    border: selected ? '2px solid var(--coral)' : '1.5px solid var(--border)',
    background: selected ? 'var(--coral-lt)' : 'var(--white)',
    color: selected ? 'var(--coral)' : 'var(--ink2)',
    cursor: 'pointer', textAlign: 'left', transition: 'all .15s',
    fontFamily: 'DM Sans, sans-serif',
  }
}

const primaryBtn: React.CSSProperties = {
  width: '100%', padding: '15px', borderRadius: 100,
  background: 'var(--ink)', border: 'none', cursor: 'pointer',
  fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700,
  color: 'white', transition: 'all .18s',
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 13, color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif',
      display: 'block', width: '100%', textAlign: 'center',
    }}>
      ← Retour
    </button>
  )
}
