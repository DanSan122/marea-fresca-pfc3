-- Marea Fresca · esquema inicial propuesto para Supabase
-- Aplicar UNA VEZ en SQL Editor del proyecto elegido (requiere revisar el coste).
-- No ejecutar en otras bases de datos.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  role text not null default 'comprador' check (role in ('comprador', 'pescador')),
  created_at timestamptz not null default now()
);

create table if not exists public.catch_listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  boat_name text not null check (char_length(boat_name) between 2 and 80),
  fisher_name text not null check (char_length(fisher_name) between 2 and 80),
  arrival_time timestamptz not null,
  arrival_status text not null default 'programada'
    check (arrival_status in ('programada', 'en_ruta', 'arribo')),
  species_name text not null check (char_length(species_name) between 2 and 80),
  category text not null check (category in ('pescado', 'mariscos')),
  quantity_kg numeric(12,2) not null check (quantity_kg > 0),
  price_pen_per_kg numeric(12,2) not null check (price_pen_per_kg > 0),
  available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catch_listings_arrival_time_idx
  on public.catch_listings (arrival_time desc);
create index if not exists catch_listings_owner_idx
  on public.catch_listings (owner_id);

alter table public.profiles enable row level security;
alter table public.catch_listings enable row level security;

-- Limitar expresamente lo que la Data API puede hacer:
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.catch_listings from anon, authenticated;
grant select, insert, update on table public.profiles to authenticated;
grant select on table public.catch_listings to anon, authenticated;
grant insert, update, delete on table public.catch_listings to authenticated;

drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists listings_public_select on public.catch_listings;
create policy listings_public_select on public.catch_listings
  for select to anon, authenticated using (true);

drop policy if exists listings_fisher_insert on public.catch_listings;
create policy listings_fisher_insert on public.catch_listings
  for insert to authenticated with check (
    owner_id = (select auth.uid()) and
    exists (select 1 from public.profiles p
            where p.id = (select auth.uid()) and p.role = 'pescador')
  );

drop policy if exists listings_fisher_update on public.catch_listings;
create policy listings_fisher_update on public.catch_listings
  for update to authenticated
  using (
    owner_id = (select auth.uid()) and
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'pescador')
  )
  with check (
    owner_id = (select auth.uid()) and
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'pescador')
  );

drop policy if exists listings_fisher_delete on public.catch_listings;
create policy listings_fisher_delete on public.catch_listings
  for delete to authenticated using (
    owner_id = (select auth.uid()) and
    exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'pescador')
  );

comment on table public.catch_listings is
  'Registro de oferta/arribo pesquero. No cargar datos reales sin consentimiento.';

-- Nota: El rol pescador es autodeclarado en este MVP académico.
-- En un sistema real se requeriría verificación de la identidad del pescador y roles asignados por un administrador.
