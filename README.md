# Voxol — MVP

Plateforme de contribution citoyenne structurée.

## Stack
- **Next.js 14** (React, TypeScript)
- **Supabase** (base de données PostgreSQL gratuite)
- **Vercel** (déploiement gratuit)

---

## Lancer en local

```bash
npm install
cp .env.local.example .env.local
# → Remplir les clés Supabase dans .env.local
npm run dev
```

Ouvrir http://localhost:3000

---

## Déployer sur Vercel (gratuit)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Installer Vercel CLI : `npm i -g vercel`
3. Dans le dossier du projet : `vercel`
4. Ajouter les variables d'environnement dans le dashboard Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Configurer Supabase (gratuit)

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans **SQL Editor** et coller le contenu de `supabase-schema.sql`
4. Exécuter → la base de données et les questions sont créées
5. Récupérer les clés dans **Settings → API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Flow utilisateur

1. **Onboarding** (`/onboarding`) : âge, profession, ville, centres d'intérêt
2. **Questions** (`/questions`) : flux filtré par niveau géo et thème, vote + réponse texte libre
3. **Dashboard** (`/dashboard`) : analyse collective avec segmentation par âge et profession

---

## Prochaines étapes V2

- [ ] Brancher les réponses sur Supabase (actuellement stockées en localStorage)
- [ ] Calcul dynamique des stats dans le dashboard depuis les vraies réponses
- [ ] Authentification légère (email magic link via Supabase Auth)
- [ ] Admin pour ajouter/modérer des questions
- [ ] Analyse NLP des réponses texte (optionnel, coûteux)
