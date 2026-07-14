-- ============================================================
-- Academic Formatter AI — Esquema inicial (Módulo 1)
-- Pega esto completo en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1. Perfiles (extiende auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: crea el perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Documentos
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Documento sin título',
  content_raw text,
  format_type text, -- apa | ieee | icontec | mla | chicago | harvard
  format_fields jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'ready', 'exported')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.documents enable row level security;

create policy "Los usuarios gestionan sus propios documentos"
  on public.documents for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 3. Historial de versiones (plan premium)
create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  content_snapshot text not null,
  created_at timestamptz not null default now()
);

alter table public.document_versions enable row level security;

create policy "Los usuarios ven versiones de sus propios documentos"
  on public.document_versions for select
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_id and d.user_id = auth.uid()
    )
  );

-- 4. Exportaciones
create table if not exists public.exports (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  format text not null check (format in ('pdf', 'docx', 'markdown', 'latex')),
  watermarked boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.exports enable row level security;

create policy "Los usuarios ven sus propias exportaciones"
  on public.exports for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. Suscripciones (Lemon Squeezy)
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  lemon_squeezy_customer_id text,
  lemon_squeezy_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Los usuarios ven su propia suscripción"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- 6. Uso diario (límite de plan free)
create table if not exists public.usage_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null default current_date,
  exports_count int not null default 0,
  primary key (user_id, usage_date)
);

alter table public.usage_daily enable row level security;

create policy "Los usuarios ven su propio uso"
  on public.usage_daily for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 7. Índices útiles
create index if not exists idx_documents_user_id on public.documents(user_id);
create index if not exists idx_exports_user_id on public.exports(user_id);
