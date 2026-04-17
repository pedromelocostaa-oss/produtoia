-- Tabela de cases
create table cases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  author_name text not null,
  author_email text,
  author_role text,
  author_company text,
  show_profile boolean default false,
  title text not null,
  what_built text not null,
  tool_used text not null,
  area text not null,
  description text not null,
  result text,
  image_url text,
  external_link text,
  is_visible boolean default true
);

-- Tabela de comentários
create table comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  case_id uuid references cases(id) on delete cascade,
  author_name text not null,
  author_email text,
  content text not null,
  is_visible boolean default true
);

-- RLS: leitura pública de cases e comentários visíveis
alter table cases enable row level security;
alter table comments enable row level security;

create policy "Cases visíveis são públicos" on cases for select using (is_visible = true);
create policy "Qualquer pessoa pode criar case" on cases for insert with check (true);
create policy "Comentários visíveis são públicos" on comments for select using (is_visible = true);
create policy "Qualquer pessoa pode comentar" on comments for insert with check (true);

-- IMPORTANTE: Acesse Supabase → Storage → New Bucket
-- Nome: case-images
-- Public bucket: SIM (marque como público)
