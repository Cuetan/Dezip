-- Run this in Supabase SQL Editor to create the schema

-- Profiles table
create table if not exists profiles (
  id text primary key,
  age_range text not null,
  city text not null,
  profession text not null,
  interests text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Questions table
create table if not exists questions (
  id text primary key,
  text text not null,
  theme text not null,
  level text not null check (level in ('monde','europe','national','regional','local')),
  region text,
  response_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Responses table
create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  question_id text references questions(id),
  profile_id text references profiles(id),
  vote text not null check (vote in ('oui','non','nuance')),
  text text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table questions enable row level security;
alter table responses enable row level security;

-- Allow anonymous reads on questions
create policy "Questions are public" on questions for select using (true);

-- Allow anonymous inserts on profiles and responses
create policy "Anyone can create profile" on profiles for insert with check (true);
create policy "Anyone can respond" on responses for insert with check (true);

-- Allow reads on responses (for dashboard stats)
create policy "Responses are readable" on responses for select using (true);
create policy "Profiles stats readable" on profiles for select using (true);

-- Seed questions
insert into questions (id, text, theme, level, response_count) values
  ('q1', 'Les déserts médicaux : l''État a-t-il failli à sa mission ?', '🏥 Santé', 'national', 4200),
  ('q2', 'Les réseaux sociaux sont-ils devenus nuisibles pour la démocratie ?', '📱 Numérique', 'national', 4100),
  ('q3', 'Faut-il encadrer les loyers dans toutes les grandes villes françaises ?', '🏠 Logement', 'national', 6300),
  ('q4', 'La justice française est-elle trop lente ?', '⚖️ Justice', 'national', 4900),
  ('q5', 'Faut-il interdire les smartphones dans tous les établissements scolaires ?', '🎓 Éducation', 'national', 1850),
  ('q6', 'Le télétravail a-t-il définitivement changé les attentes au travail ?', '💼 Travail', 'national', 3200),
  ('q7', 'La taxe carbone est-elle juste ou aveugle socialement ?', '🌱 Écologie', 'national', 2800),
  ('q8', 'La génération des 25-35 ans est-elle condamnée à rester locataire ?', '🏠 Logement', 'national', 2100),
  ('q9', 'Les transports en commun de votre région sont-ils à la hauteur ?', '🚌 Transports', 'regional', 1200),
  ('q10', 'Les services publics de proximité se dégradent-ils dans votre région ?', '🏛 Services', 'regional', 980),
  ('q11', 'Les pistes cyclables de votre ville sont-elles bien dimensionnées ?', '🚴 Mobilité', 'local', 380),
  ('q12', 'Le marché local doit-il être étendu à la journée entière ?', '🛒 Commerce', 'local', 420)
on conflict (id) do nothing;
