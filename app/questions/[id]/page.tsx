'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { QUESTIONS } from '@/lib/data'
import Nav from '@/components/Nav'

type Vote = 'oui' | 'non' | 'nuance' | null

export default function QuestionPage() {
  const router = useRouter()
  const params = useParams()
  const qid = params.id as string

  const [profile, setProfile] = useState<any>(null)
  const [vote, setVote] = useState<Vote>(null)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const question = QUESTIONS.find(q => q.id === qid)

  useEffect(() => {
    const p = localStorage.getItem('voxol_profile')
    if (!p) { router.replace('/onboarding'); return }
    setProfile(JSON.parse(p))
  }, [router])

  if (!question) return (
    <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Question introuvable.</div>
  )

  function handleSubmit() {
    if (!vote || text.trim().length < 10) return
    // Save locally (in real app: POST to Supabase)
    const responses = JSON.parse(localStorage.getItem('voxol_responses') || '[]')
    responses.push({ question_id: qid, vote, text, created_at: new Date().toISOString() })
    localStorage.setItem('voxol_responses', JSON.stringify(responses))

    const answered = JSON.parse(localStorage.getItem('voxol_answered') || '[]')
    answered.push(qid)
    localStorage.setItem('voxol_answered', JSON.stringify(answered))

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        <Nav profile={profile} current="questions" />
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Votre voix est <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>enregistrée</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32, lineHeight: 1.7 }}>
            Votre contribution enrichit l'analyse collective. Elle sera visible dans le tableau de bord dès que suffisamment de réponses auront été collectées.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/questions')} style={btnPrimary}>
              Voir d'autres questions
            </button>
            <button onClick={() => router.push('/dashboard')} style={btnGhost}>
              Voir le dashboard →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav profile={profile} current="questions" />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '88px 24px 80px' }}>
        {/* Back */}
        <button onClick={() => router.back()} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, color: 'var(--muted)', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans, sans-serif',
        }}>← Retour aux questions</button>

        {/* Question card */}
        <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 24, padding: '28px 28px 24px', marginBottom: 20, boxShadow: 'var(--shadow)' }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 100, background: 'var(--coral-lt)', color: 'var(--coral)',
            display: 'inline-block', marginBottom: 14,
          }}>{question.theme}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 8 }}>
            {question.text}
          </h2>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>{question.response_count.toLocaleString('fr-FR')} contributions</p>
        </div>

        {/* Vote */}
        <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 24, padding: '24px 28px', marginBottom: 16, boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16 }}>
            Votre position
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {([
              { key: 'oui', label: 'Oui', icon: '👍', color: 'var(--green)', bg: 'var(--green-lt)' },
              { key: 'nuance', label: 'Nuancé', icon: '🤔', color: 'var(--amber)', bg: 'var(--amber-lt)' },
              { key: 'non', label: 'Non', icon: '👎', color: 'var(--coral)', bg: 'var(--coral-lt)' },
            ] as const).map(v => (
              <button
                key={v.key}
                onClick={() => setVote(v.key)}
                style={{
                  flex: 1, padding: '16px 8px', borderRadius: 16,
                  border: vote === v.key ? `2px solid ${v.color}` : '1.5px solid var(--border)',
                  background: vote === v.key ? v.bg : 'var(--paper)',
                  cursor: 'pointer', transition: 'all .18s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                <span style={{ fontSize: 22 }}>{v.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: vote === v.key ? v.color : 'var(--ink2)' }}>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text response */}
        <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 24, padding: '24px 28px', marginBottom: 20, boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>
            Votre point de vue <span style={{ fontSize: 11, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(obligatoire · min. 10 caractères)</span>
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 14 }}>
            💡 Vous pouvez dicter via le micro de votre clavier mobile
          </p>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setCharCount(e.target.value.length) }}
            placeholder="Exprimez-vous librement. Votre réponse sera anonymisée avant d'être analysée collectivement..."
            rows={5}
            maxLength={1000}
            style={{
              width: '100%', padding: '14px 16px',
              border: '1.5px solid var(--border)', borderRadius: 14,
              fontSize: 14, lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif',
              background: 'var(--paper)', color: 'var(--ink)',
              outline: 'none', resize: 'vertical',
            }}
          />
          <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{charCount}/1000</div>

          {/* Anon note */}
          <div style={{
            background: 'var(--navy-lt)', borderRadius: 12, padding: '10px 14px',
            fontSize: 12, color: 'var(--navy)', marginTop: 14, lineHeight: 1.6,
            display: 'flex', gap: 8, alignItems: 'flex-start',
          }}>
            <span>🔒</span>
            <span>Votre réponse est anonyme. Votre profil (âge, profession, ville) sera utilisé uniquement pour les croisements statistiques — jamais pour vous identifier.</span>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!vote || text.trim().length < 10}
          style={{
            ...btnPrimary,
            width: '100%',
            opacity: (!vote || text.trim().length < 10) ? .45 : 1,
            cursor: (!vote || text.trim().length < 10) ? 'not-allowed' : 'pointer',
          }}
        >
          Contribuer à l'analyse collective →
        </button>
      </div>
    </div>
  )
}

const btnPrimary: React.CSSProperties = {
  padding: '15px 28px', borderRadius: 100, border: 'none',
  background: 'var(--ink)', color: 'white', cursor: 'pointer',
  fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700,
  transition: 'all .18s',
}

const btnGhost: React.CSSProperties = {
  padding: '14px 28px', borderRadius: 100,
  border: '1.5px solid var(--border)',
  background: 'transparent', color: 'var(--ink2)', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
  transition: 'all .18s',
}
