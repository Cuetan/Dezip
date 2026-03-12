'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/data'
import Nav from '@/components/Nav'

// Simulated aggregate data for the dashboard
const MOCK_STATS: Record<string, {
  oui: number, non: number, nuance: number,
  byAge: Record<string, { oui: number, non: number, nuance: number }>,
  byPro: Record<string, { oui: number, non: number, nuance: number }>,
  verbatims: { vote: string, text: string, profile: string }[]
}> = {
  q1: {
    oui: 61, non: 22, nuance: 17,
    byAge: {
      '18-24 ans': { oui: 72, non: 15, nuance: 13 },
      '25-34 ans': { oui: 68, non: 18, nuance: 14 },
      '35-44 ans': { oui: 58, non: 26, nuance: 16 },
      '45-54 ans': { oui: 55, non: 28, nuance: 17 },
      '55-64 ans': { oui: 50, non: 33, nuance: 17 },
    },
    byPro: {
      'Étudiant·e': { oui: 74, non: 12, nuance: 14 },
      'Salarié·e du privé': { oui: 62, non: 22, nuance: 16 },
      'Fonctionnaire': { oui: 55, non: 30, nuance: 15 },
      'Retraité·e': { oui: 48, non: 35, nuance: 17 },
    },
    verbatims: [
      { vote: 'oui', text: "Dans mon village, le médecin le plus proche est à 45 minutes. C'est une réalité que Paris ne mesure pas.", profile: '55-64 ans · Retraité·e' },
      { vote: 'nuance', text: "L'État a failli, mais les collectivités aussi. C'est une responsabilité partagée.", profile: '35-44 ans · Fonctionnaire' },
      { vote: 'non', text: "Les médecins sont des professionnels libres. On ne peut pas forcer leur installation.", profile: '45-54 ans · Salarié·e du privé' },
    ]
  },
  q3: {
    oui: 58, non: 28, nuance: 14,
    byAge: {
      '18-24 ans': { oui: 78, non: 12, nuance: 10 },
      '25-34 ans': { oui: 74, non: 16, nuance: 10 },
      '35-44 ans': { oui: 55, non: 32, nuance: 13 },
      '55-64 ans': { oui: 38, non: 46, nuance: 16 },
    },
    byPro: {
      'Étudiant·e': { oui: 80, non: 10, nuance: 10 },
      'Salarié·e du privé': { oui: 60, non: 26, nuance: 14 },
      'Chef·fe d\'entreprise': { oui: 28, non: 58, nuance: 14 },
    },
    verbatims: [
      { vote: 'oui', text: "À 28 ans, je consacre 48% de mon salaire au loyer. C'est insoutenable.", profile: '25-34 ans · Salarié·e du privé' },
      { vote: 'nuance', text: "L'encadrement sans construction de logements ne résout rien sur le fond.", profile: '45-54 ans · Chef·fe d\'entreprise' },
    ]
  },
}

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [selectedQ, setSelectedQ] = useState('q1')
  const [segFilter, setSegFilter] = useState<'age' | 'pro'>('age')

  useEffect(() => {
    const p = localStorage.getItem('voxol_profile')
    if (!p) { router.replace('/onboarding'); return }
    setProfile(JSON.parse(p))
  }, [router])

  const stats = MOCK_STATS[selectedQ]
  const question = QUESTIONS.find(q => q.id === selectedQ)
  const segData = segFilter === 'age' ? stats?.byAge : stats?.byPro

  if (!profile) return null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav profile={profile} current="dashboard" />

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '88px 24px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 8 }}>Analyse collective</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700 }}>
            Ce que <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>la France</em> pense vraiment
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>
          {/* Sidebar: question list */}
          <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: 16, boxShadow: 'var(--shadow)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>
              Questions analysées
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {QUESTIONS.filter(q => MOCK_STATS[q.id]).map(q => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQ(q.id)}
                  style={{
                    padding: '10px 12px', borderRadius: 12, border: 'none',
                    background: selectedQ === q.id ? 'var(--coral-lt)' : 'transparent',
                    color: selectedQ === q.id ? 'var(--coral)' : 'var(--ink2)',
                    cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: selectedQ === q.id ? 700 : 500,
                    lineHeight: 1.4, transition: 'all .15s',
                    borderLeft: selectedQ === q.id ? '3px solid var(--coral)' : '3px solid transparent',
                  }}
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Main analysis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Question header */}
            {question && (
              <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: '20px 24px', boxShadow: 'var(--shadow)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>{question.theme}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{question.text}</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{question.response_count.toLocaleString('fr-FR')} contributions analysées</p>
              </div>
            )}

            {stats && (
              <>
                {/* Global vote bars */}
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: '24px', boxShadow: 'var(--shadow)' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 20 }}>Résultat global</p>
                  <VoteBar label="Oui" pct={stats.oui} color="var(--green)" />
                  <VoteBar label="Nuancé" pct={stats.nuance} color="var(--amber)" />
                  <VoteBar label="Non" pct={stats.non} color="var(--coral)" />
                </div>

                {/* Segmented analysis */}
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: '24px', boxShadow: 'var(--shadow)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Par segment</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {(['age', 'pro'] as const).map(seg => (
                        <button
                          key={seg}
                          onClick={() => setSegFilter(seg)}
                          style={{
                            padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                            border: segFilter === seg ? '1.5px solid var(--ink)' : '1px solid var(--border)',
                            background: segFilter === seg ? 'var(--ink)' : 'var(--paper)',
                            color: segFilter === seg ? 'white' : 'var(--muted)',
                            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                          }}
                        >
                          {seg === 'age' ? 'Par âge' : 'Par profession'}
                        </button>
                      ))}
                    </div>
                  </div>
                  {segData && Object.entries(segData).map(([seg, d]) => (
                    <div key={seg} style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink2)', marginBottom: 6 }}>{seg}</div>
                      <StackedBar oui={d.oui} non={d.non} nuance={d.nuance} />
                    </div>
                  ))}
                </div>

                {/* Verbatims */}
                {stats.verbatims && stats.verbatims.length > 0 && (
                  <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 20, padding: '24px', boxShadow: 'var(--shadow)' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 20 }}>Voix représentatives</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {stats.verbatims.map((v, i) => (
                        <div key={i} style={{
                          padding: '16px 18px', borderRadius: 14,
                          background: v.vote === 'oui' ? 'var(--green-lt)' : v.vote === 'non' ? 'var(--coral-lt)' : 'var(--amber-lt)',
                          borderLeft: `3px solid ${v.vote === 'oui' ? 'var(--green)' : v.vote === 'non' ? 'var(--coral)' : 'var(--amber)'}`,
                        }}>
                          <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--ink2)', lineHeight: 1.7, marginBottom: 8 }}>"{v.text}"</p>
                          <p style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{v.profile}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!stats && (
              <div style={{ background: 'var(--paper)', border: '1.5px dashed var(--border)', borderRadius: 20, padding: '48px 24px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                <p style={{ fontSize: 14 }}>Pas encore assez de contributions pour cette question.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function VoteBar({ label, pct, color }: { label: string, pct: number, color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
      <div style={{ width: 60, fontSize: 13, fontWeight: 600, color: 'var(--ink2)' }}>{label}</div>
      <div style={{ flex: 1, height: 10, background: 'var(--paper)', borderRadius: 5, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 5, transition: 'width 1s ease' }} />
      </div>
      <div style={{ width: 36, fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)', textAlign: 'right' }}>{pct}%</div>
    </div>
  )
}

function StackedBar({ oui, non, nuance }: { oui: number, non: number, nuance: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: `${oui}%`, background: 'var(--green)', transition: 'width 1s ease' }} />
        <div style={{ width: `${nuance}%`, background: 'var(--amber)', transition: 'width 1s ease' }} />
        <div style={{ width: `${non}%`, background: 'var(--coral)', transition: 'width 1s ease' }} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--green)', fontWeight: 700 }}>{oui}%</span>
        {' / '}
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>{nuance}%</span>
        {' / '}
        <span style={{ color: 'var(--coral)', fontWeight: 700 }}>{non}%</span>
      </div>
    </div>
  )
}
